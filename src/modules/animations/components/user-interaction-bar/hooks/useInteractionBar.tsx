import gqlStrings from "@/graphql/documents";
import {
  MutationUpdateAnimationArgs,
  PrivateAnimationType,
} from "@/graphql/gql/graphql";
import { animationsStore } from "@/utils/indexeddb";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useMemo } from "react";
import { useMutation } from "urql";

const useInteractionBar = (data: PrivateAnimationType) => {
  const offlineData = useLiveQuery(() => animationsStore.get(data.id));

  const [{ data: response, fetching }, likeAnimation] = useMutation<
    {
      updateAnimation: PrivateAnimationType;
    },
    MutationUpdateAnimationArgs
  >(gqlStrings.UpdateAnimationMutation);

  const numberOfLikes = useMemo(() => {
    if (!response) {
      if (offlineData) {
        return offlineData.likes;
      }
      return data.likes;
    }

    return response.updateAnimation.likes;
  }, [data.likes, offlineData, response]);

  const download = useCallback(() => {
    if (!data) return;
    const json = JSON.stringify(data.url);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = data.name;
    a.click();
  }, [data]);

  const like = useCallback(() => {
    if (data.id) {
      likeAnimation({
        id: data.id,
        likes: numberOfLikes + 1,
      });
    }
  }, [data.id, likeAnimation, numberOfLikes]);

  return {
    loading: fetching,
    numberOfLikes,
    download,
    like,
  };
};

export default useInteractionBar;
