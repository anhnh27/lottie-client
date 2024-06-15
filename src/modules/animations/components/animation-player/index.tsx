import { Controls, DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { FC } from "react";
import UserInteractionBar from "../user-interaction-bar";
import { useAnimationDetails } from "./hooks/useAnimationDetails";

const AnimationPlayer: FC = () => {
  const { data } = useAnimationDetails();

  if (!data) return null;

  return (
    <div className="w-1/3 h-1/3 rounded-sm -translate-y-2/3">
      <UserInteractionBar data={data} />
      <div className="w-full aspect-square">
        <DotLottiePlayer autoplay loop className="rounded-sm" src={data.url}>
          <Controls />
        </DotLottiePlayer>
      </div>
    </div>
  );
};

export default AnimationPlayer;
