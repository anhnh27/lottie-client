import { CarouselMethods } from "@/components/carousel";
import gqlStrings from "@/graphql/documents";
import {
  PrivateAnimationResponseType,
  QueryGetAnimationsArgs,
} from "@/graphql/gql/graphql";
import {
  selectFetchParams,
  setNextCursor,
} from "@/modules/animations/slice/filter";
import { useAppDispatch } from "@/store/hooks";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "urql";

export const useAnimationList = () => {
  const dispatch = useAppDispatch();

  const params = useSelector(selectFetchParams);

  const carouselRef = useRef<CarouselMethods>(null);

  const [{ data, fetching, error }, refetchAnimations] = useQuery<
    {
      getAnimations: PrivateAnimationResponseType;
    },
    QueryGetAnimationsArgs
  >({
    query: gqlStrings.GetAnimationsQuery,
    variables: params,
  });

  const hasMore = data?.getAnimations?.pageInfo?.hasNextPage ?? false;

  const fetchMore = useCallback(() => {
    if (!hasMore || !data) return;
    dispatch(setNextCursor(data.getAnimations.pageInfo.nextCursor));
  }, [data, dispatch, hasMore]);

  useEffect(() => {
    if (data && data.getAnimations.items) {
      carouselRef.current?.setData(data.getAnimations.items);
    }
  }, [data]);

  useEffect(() => {
    if (params.nextCursor === "") {
      carouselRef.current?.reset();
      refetchAnimations(params);
    }
  }, [params, refetchAnimations]);

  useEffect(() => {
    carouselRef.current?.reset();
  }, [params.keyword]);

  return {
    carouselRef,
    fetching,
    data: data ? data.getAnimations.items : [],
    error,
    hasMore,
    fetchMore,
  };
};
