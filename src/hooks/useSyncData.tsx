import gqlStrings from "@/graphql/documents";
import { animationsStore, requestsStore } from "@/utils/indexeddb";
import { graphQLRequest } from "@/utils/request";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useAsync from "react-use/lib/useAsync";
import { useQuery } from "urql";
import { useNetwork } from "./useNetwork";
import useSnackbar from "./useSnackbar";
import { RequestToMake, useThrottleRequests } from "./useThrottleRequests";

export const useSyncData = () => {
  const { id } = useParams();

  const isOnline = useNetwork();

  const { updateThrottle } = useThrottleRequests();

  const [, getAnimation] = useQuery({
    query: gqlStrings.GetAnimationQuery,
    variables: { id },
    pause: !isOnline || !id,
  });

  const requests = useLiveQuery(() => requestsStore.toArray(), [isOnline]);

  const { open, showNetworkStatus, close } = useSnackbar();

  const requestsMemorized = useMemo(() => requests ?? [], [requests]);

  useAsync(async () => {
    if (isOnline && requestsMemorized.length > 0) {
      showNetworkStatus();

      const requestsToMake: RequestToMake[] = requestsMemorized.map(
        (request) => async () => {
          try {
            const response = await graphQLRequest({
              query: request.query,
              variables: request.variables,
            });

            await requestsStore.delete(request.id);
            await animationsStore.delete(request.id);

            updateThrottle.requestSucceededWithData(response);
          } catch (error) {
            console.error("failed to sync request", error);
            updateThrottle.requestFailedWithError(error);
          }
        }
      );
      await updateThrottle.queueRequests(requestsToMake, 1);
    }
  }, [isOnline, updateThrottle, requestsMemorized]);

  useEffect(() => {
    if (!isOnline) {
      showNetworkStatus();
    }
  }, [isOnline, showNetworkStatus]);

  useEffect(() => {
    if (isOnline && id) {
      getAnimation();
    }
  }, [getAnimation, id, isOnline]);

  return {
    open,
    message: isOnline
      ? "Syncing your offline data with the server. Please wait..."
      : "You are offline. Offline mode is enabled.",
    close,
  };
};
