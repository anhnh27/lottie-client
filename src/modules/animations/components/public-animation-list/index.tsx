import { DotLottiePlayer } from "@dotlottie/react-player";
import { Stack } from "@mui/material";
import numeral from "numeral";
import { FC } from "react";
import useAddAnimationToWs from "./hooks/useAddAnimationToWs";
import usePublicAnimationData from "./hooks/usePublicAnimationData";
import DownloadIcon from "/assets/svgs/download.svg";

const PublicAnimationList: FC = () => {
  const { data, error, fetching } = usePublicAnimationData();

  const { addAnimationToWorkspace } = useAddAnimationToWs();

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error... {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-5 my-4 gap-4">
      {data.map((animation) => (
        <div
          key={animation.id}
          onClick={addAnimationToWorkspace(animation)}
          className="p-2 rounded-md overflow-hidden bg-white drop-shadow cursor-pointer hover:opacity-80 transform transition-transform duration-300 ease-in-out"
        >
          <div className="w-[90%] aspect-square mx-auto">
            <DotLottiePlayer autoplay loop src={animation.lottieSource} />
          </div>
          <div className="px-3 text-left text-label text-sm">
            <Stack direction="row" justifyContent={"space-between"}>
              <Stack direction="row" alignItems={"center"}>
                <img
                  src={animation.user.avatarUrl}
                  alt={animation.user.name}
                  className="w-6 h-6 rounded-full inline-block mr-2"
                />
                {animation.user.name}
              </Stack>
              <Stack direction="row" alignItems={"center"}>
                {numeral(animation.downloadCount).format("0a")}
                <img className="w-6" src={DownloadIcon} alt={animation.name} />
              </Stack>
            </Stack>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicAnimationList;
