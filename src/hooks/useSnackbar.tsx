import { SyntheticEvent, useCallback, useState } from "react";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);

  const showNetworkStatus = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(
    (_: SyntheticEvent | MouseEvent, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    },
    []
  );

  return {
    open,
    showNetworkStatus,
    close,
  };
};

export default useSnackbar;
