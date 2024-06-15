import gqlStrings from "@/graphql/documents";
import {
  MutationCreateAnimationArgs,
  PublicAnimationType,
} from "@/graphql/gql/graphql";
import { CreateAnimationApiResponse } from "@/types";
import { useCallback } from "react";
import { useMutation } from "urql";

const useAddAnimationToWs = () => {
  const [, createAnimation] = useMutation<
    CreateAnimationApiResponse,
    MutationCreateAnimationArgs
  >(gqlStrings.CreateAnimationMutation);

  const addAnimationToWorkspace = useCallback(
    (animation: PublicAnimationType) => async () => {
      const confirmed = confirm("Add animation to workspace?");
      if (confirmed) {
        try {
          const response = await fetch(animation.lottieSource);
          const data = await response.blob();
          const file = new File([data], animation.name, {
            type: data.type,
          });

          await createAnimation({
            name: animation.name,
            tags: animation.tags,
            file: file,
          });

          alert("Animation added to workspace!");
        } catch (error) {
          alert(error);
        }
      }
    },
    [createAnimation]
  );

  return {
    addAnimationToWorkspace,
  };
};

export default useAddAnimationToWs;
