import { useSyncData } from "@/hooks/useSyncData";
import useWorkspace from "@/hooks/useWorkspace";
import { Button, Snackbar, Typography, styled } from "@mui/material";
import { FC, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AnimationSearch from "../animation-search";
import UploadAnimationFile from "../upload-animation";
import Logo from "/assets/svgs/logo.svg";

const StyledButton = styled(Button)`
  border-radius: 10px;
  box-shadow: none;
  text-transform: none;
`;

const TopNavigation: FC = () => {
  const navigate = useNavigate();

  const { open, message, close } = useSyncData();

  const { isWorkspace } = useWorkspace();

  const toWorkspace = useCallback(() => {
    navigate("/workspace");
  }, [navigate]);

  return (
    <nav className="p-4 bg-white drop-shadow-sm">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <NavLink to={"/"}>
            <img
              src={Logo}
              alt="Offline LottieFiles"
              className="w-12 aspect-square"
            />
          </NavLink>
          <Typography
            fontSize={22}
            fontWeight={900}
            sx={{
              ml: 1,
              color: "#000000",
            }}
          >
            Offline LottieFiles
          </Typography>
        </div>
        <div className="flex flex-row gap-2">
          <AnimationSearch />
          {isWorkspace ? (
            <UploadAnimationFile />
          ) : (
            <StyledButton
              variant="contained"
              color="primary"
              onClick={toWorkspace}
            >
              Workspace
            </StyledButton>
          )}
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={close}
        message={message}
      />
    </nav>
  );
};

export default TopNavigation;
