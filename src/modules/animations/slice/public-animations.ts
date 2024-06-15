import { RootState } from "@/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";

interface PublicAnimationState {
  page: number;
  query: string;
}

const initialState: PublicAnimationState = {
  query: "",
  page: 1,
};

const publicAnimationSlice = createSlice({
  name: "publicAnimation",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setQuery, setPage } = publicAnimationSlice.actions;

const selectPublicAnimationState = (state: RootState) => state.publicAnimation;

export const selectPublicAnimationFetchParams = createSelector(
  [selectPublicAnimationState],
  (publicAnimation) => ({
    query: publicAnimation.query,
    page: publicAnimation.page,
  })
);

export default publicAnimationSlice.reducer;
