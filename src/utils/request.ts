import { DocumentNode, print } from "graphql";

export const graphQLRequest = async <T>({
  url = process.env.VITE_API_BASE_URL,
  query,
  variables,
}: {
  url?: string;
  query: DocumentNode | string;
  variables: Record<string, unknown>;
}): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: typeof query === "string" ? query : print(query),
        variables,
      }),
    });
    return await response.json();
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }
  }
};
