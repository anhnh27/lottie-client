import { useEffect, useMemo, useState } from "react";

const getOnLineStatus = () => {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
};

export const useNetwork = () => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  const isOnline = useMemo(() => status, [status]);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return isOnline;
};
