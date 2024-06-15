import { Box, Button, Modal, TextField, styled } from "@mui/material";
import { FC } from "react";
import { useUploadAnimation } from "./hooks/useUploadAnimation";
import UploadFileIcon from "/assets/svgs/upload-file.svg";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  px: 4,
  pb: 4,
};

const StyledButton = styled(Button)`
  border-radius: 10px;
  box-shadow: none;
  text-transform: none;
`;

const UploadAnimationFile: FC = () => {
  const {
    isOnline,
    open,
    fetching,
    register,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
  } = useUploadAnimation();

  return (
    <>
      <StyledButton
        disabled={!isOnline}
        variant="contained"
        endIcon={
          <img className="h-full w-8" src={UploadFileIcon} alt="Your SVG" />
        }
        onClick={openModal}
      >
        Upload
      </StyledButton>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-label my-4 text-xl font-medium">
            Upload Animation
          </div>
          <form>
            <TextField
              {...register("name")}
              fullWidth
              size="small"
              sx={{ my: 2 }}
              label="Name"
              required
              placeholder="Enter animation name"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("tags")}
              fullWidth
              size="small"
              label="Tags"
              placeholder="Separate tags with commas"
              InputLabelProps={{ shrink: true }}
            />
            <input {...register("file")} type="file" className="my-4" />
            <Button
              disabled={fetching}
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UploadAnimationFile;
