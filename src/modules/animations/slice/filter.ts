import { RootState } from "@/store";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const PAGE_SIZE = 5;

interface AnimationFilterState {
  keyword: string;
  limit: number;
  nextCursor?: string;
}

const initialState: AnimationFilterState = {
  keyword: "",
  limit: PAGE_SIZE,
};

const animationFilterSlice = createSlice({
  name: "animationFilter",
  initialState,
  reducers: {
    setKeyword: (
      state: AnimationFilterState,
      action: PayloadAction<string>
    ) => {
      (state.nextCursor = null), (state.keyword = action.payload.toLowerCase());
    },
    setNextCursor: (
      state: AnimationFilterState,
      action: PayloadAction<string>
    ) => {
      state.nextCursor = action.payload;
    },
  },
});

export const { setKeyword, setNextCursor } = animationFilterSlice.actions;

const selectAnimationFilterState = (state: RootState) => state.animationFilter;

export const selectFilterKeyword = createSelector(
  [selectAnimationFilterState],
  (filter) => ({
    keyword: filter.keyword,
  })
);

export const selectFetchParams = createSelector(
  [selectAnimationFilterState],
  (pagination) => ({
    limit: PAGE_SIZE,
    keyword: pagination.keyword,
    nextCursor: pagination.nextCursor,
  })
);

export default animationFilterSlice.reducer;
