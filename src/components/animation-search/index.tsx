import useWorkspace from "@/hooks/useWorkspace";
import { setKeyword } from "@/modules/animations/slice/filter";
import { setQuery } from "@/modules/animations/slice/public-animations";
import { useAppDispatch } from "@/store/hooks";
import { debounce } from "lodash";
import { FC, useEffect, useRef } from "react";
import SearchField from "../search-field";

const AnimationSearch: FC = () => {
  const dispatch = useAppDispatch();

  const { isWorkspace } = useWorkspace();

  const ref = useRef<HTMLInputElement | null>(null);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isWorkspace) {
      dispatch(setKeyword(e.target.value));
    } else {
      dispatch(setQuery(e.target.value));
    }
  }, 500);

  useEffect(() => {
    dispatch(setQuery(""));
    dispatch(setKeyword(""));

    if (ref.current) {
      ref.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.pathname]);

  return <SearchField ref={ref} onChange={handleSearch} />;
};

export default AnimationSearch;
