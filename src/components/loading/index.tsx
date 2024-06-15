import { DotLottiePlayer } from "@dotlottie/react-player";
import { FC } from "react";
import LoadingAnimation from "./loading.json";

const Loading: FC = () => {
  return (
    <DotLottiePlayer
      className="w-48 h-48"
      src={LoadingAnimation}
      autoplay
      loop
    />
  );
};

export default Loading;
