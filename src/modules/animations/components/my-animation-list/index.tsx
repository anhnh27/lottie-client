import { PrivateAnimationType } from "@/graphql/gql/graphql";
import "@dotlottie/react-player/dist/index.css";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../../../components/carousel";
import { useAnimationList } from "./hooks/useAnimationList";

const MyAnimationList: FC = () => {
  const navigate = useNavigate();

  const { carouselRef, data, hasMore, fetchMore } = useAnimationList();

  const onAnimationClicked = useCallback(
    (animation: PrivateAnimationType) => () => {
      navigate("/workspace/edit/" + animation.id);
    },
    [navigate]
  );

  return (
    <>
      <div className="text-lg font-medium text-start m-2">My Workspace</div>
      {data.length > 0 ? (
        <Carousel
          ref={carouselRef}
          hasMore={hasMore}
          fetchMore={fetchMore}
          onItemClicked={onAnimationClicked}
        />
      ) : (
        <div className="text-error text-lg text-label font-medium text-start m-2">
          No results found!
        </div>
      )}
    </>
  );
};

export default MyAnimationList;
