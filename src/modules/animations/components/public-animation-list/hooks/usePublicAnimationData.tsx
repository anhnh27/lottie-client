import gqlStrings from "@/graphql/documents";
import {
  PublicAnimationResponseType,
  QueryGetPublicAnimationsArgs,
} from "@/graphql/gql/graphql";
import { selectPublicAnimationFetchParams } from "@/modules/animations/slice/public-animations";
import { useSelector } from "react-redux";
import { useQuery } from "urql";

const usePublicAnimationData = () => {
  const { query, page } = useSelector(selectPublicAnimationFetchParams);

  const [{ data, error, fetching }] = useQuery<
    {
      getPublicAnimations: PublicAnimationResponseType;
    },
    QueryGetPublicAnimationsArgs
  >({
    query: gqlStrings.GetPublicAnimationsQuery,
    variables: {
      query: query,
      page: page,
    },
    pause: !query,
  });

  return {
    data: data?.getPublicAnimations?.items ?? [],
    error,
    fetching,
  };
};

export default usePublicAnimationData;
