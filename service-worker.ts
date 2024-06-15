/// <reference lib="webworker" />

// import { print } from "./node_modules/graphql/index.mjs";
// import { LikeMutation } from "./src/graphql/queries";
import { MD5 } from "./node_modules/crypto-es/lib/md5.js";
import gqlStrings from "./src/graphql/documents";
import { animationsStore, requestsStore } from "./src/utils/indexeddb";

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

const CACHE_NAME = "static-cache-v1";
const STATIC_RESOURCES = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/svgs/upload-file.svg",
];

const fixedEncodeURIComponent = (str: string) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
};

const getCacheForQuery = async (
  apiUrl: string,
  query: string,
  variables: Record<string, unknown>,
  operationName: string
) => {
  const cache = await caches.open(CACHE_NAME);
  const encodedQuery = fixedEncodeURIComponent(query);
  const encodedVariables = fixedEncodeURIComponent(JSON.stringify(variables));
  const queryString =
    `query=${encodedQuery}&operationName=${operationName}&variables=${encodedVariables}`.replace(
      /%20/g,
      "+"
    );
  const requestUrl = `${apiUrl}?${queryString}`;
  const cacheKey = MD5(requestUrl).toString();
  return await cache.match(cacheKey);
};

sw.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      return cache.addAll(STATIC_RESOURCES);
    })()
  );
});

sw.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(sw.clients.claim());
});

sw.addEventListener("fetch", async (event: FetchEvent) => {
  if (event.request.method === "GET") {
    console.log(`[GET]::Intercepting fetch: ${event.request.url}`);
    const cacheKey = MD5(event.request.url).toString();
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          const cache = await caches.open(CACHE_NAME);
          cache.put(cacheKey, response.clone());
          console.log(`[GET]::Updating cache for: ${event.request.url}`);
          return response;
        })
        .catch(async () => {
          const response = await caches.match(cacheKey);
          if (response) {
            console.log(`[GET]::Serving from cache: ${event.request.url}`);
            return response;
          }
          throw new Error("No response from fetch or cache.");
        })
    );
  }
  if (event.request.method === "POST") {
    event.respondWith(
      fetch(event.request.clone())
        .then((response) => response)
        .catch(async () => {
          const body = await event.request.clone().json();
          const query = body.query;

          if (query === gqlStrings.UpdateAnimationMutation) {
            const { id } = body.variables;

            const cachedResponse = await getCacheForQuery(
              event.request.url,
              gqlStrings.GetAnimationQuery,
              { id },
              "GetAnimation" // OperationName for get animation details query. Refer to: src/graphql/documents.ts
            );

            const json = await cachedResponse?.json();

            const animation = await animationsStore.get(id);
            if (animation) {
              await animationsStore.update(id, {
                ...animation,
                likes: animation.likes + 1,
              });
            } else {
              await animationsStore.add({
                ...json.data.getAnimationById,
                ...body.variables,
              });
            }
          }

          await requestsStore.add({
            id: body.variables.id,
            query: body.query,
            variables: body.variables,
            timestamps: Date.now().toString(),
          });

          return new Response(
            JSON.stringify({
              message: `Offline mutation for query=${body.query}, variables=${body.variables} has been saved,  
              and will be re-executed when the network is back.`,
            }),
            {
              status: 200,
            }
          );
        })
    );
  }
});
