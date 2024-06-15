import { FC } from "react";
import AnimationPlayer from "../components/animation-player";

const EditorPage: FC = () => {
  return (
    <div className="flex flex-row h-screen justify-center items-center">
      <AnimationPlayer />
    </div>
  );
};

export default EditorPage;
