import gqlStrings from "@/graphql/documents";
import { PrivateAnimationType } from "@/graphql/gql/graphql";
import { animationsStore } from "@/utils/indexeddb";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";

export const useAnimationDetails = () => {
  const { id } = useParams();

  const offlineData = useLiveQuery(() => animationsStore.get(id), [id]);

  const [{ data: remoteData, error, fetching }] = useQuery<{
    getAnimationById: PrivateAnimationType;
  }>({
    query: gqlStrings.GetAnimationQuery,
    variables: {
      id,
    },
  });

  const data = useMemo(() => {
    if (offlineData) {
      return offlineData;
    }
    return remoteData?.getAnimationById;
  }, [offlineData, remoteData?.getAnimationById]);

  return { data, error, fetching };
};
