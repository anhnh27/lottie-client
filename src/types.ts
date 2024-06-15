import {
  PrivateAnimationType,
  PublicAnimationType,
} from "./graphql/gql/graphql";

export type PublicAnimationApiResponse = {
  publicAnimations: PublicAnimationType[];
};

export type AnimationApiResponse = {
  animations: PrivateAnimationType[];
};

export type AnimationDetailsApiResponse = {
  animation: PrivateAnimationType;
};

export type CreateAnimationApiResponse = {
  createAnimation: string | null;
};
