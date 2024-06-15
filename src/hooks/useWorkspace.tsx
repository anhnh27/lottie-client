import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useWorkspace = () => {
  const { pathname } = useLocation();

  const isWorkspace = useMemo(() => pathname === "/workspace", [pathname]);

  return { isWorkspace };
};

export default useWorkspace;
