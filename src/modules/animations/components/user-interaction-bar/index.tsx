import Spinner from "@/components/spinner";
import { PrivateAnimationType } from "@/graphql/gql/graphql";
import { Button, IconButton, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import useInteractionBar from "./hooks/useInteractionBar";
import DownloadIcon from "/assets/svgs/download-round.svg";
import LikeIcon from "/assets/svgs/like.svg";

type UserInteractionBarProps = {
  data: PrivateAnimationType;
};

const UserInteractionBar: FC<UserInteractionBarProps> = ({ data }) => {
  const { download, like, numberOfLikes, loading } = useInteractionBar(data);

  const likes = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }

    return <span className="w-[54px]">{numberOfLikes ?? 0} like(s)</span>;
  }, [loading, numberOfLikes]);

  return (
    <div className="flex flex-row items-center justify-between drop-shadow-lg">
      <div>
        <IconButton onClick={download}>
          <img src={DownloadIcon} alt={"Download"} className="w-10" />
        </IconButton>
      </div>
      <Button
        onClick={like}
        disabled={loading}
        startIcon={<img src={LikeIcon} alt={"Like"} className="w-10" />}
      >
        <Typography
          fontSize={12}
          fontWeight={700}
          className="w-[54px]"
          sx={{
            color: "#3f4a6e",
            textTransform: "none",
          }}
        >
          {likes}
        </Typography>
      </Button>
    </div>
  );
};

export default UserInteractionBar;
