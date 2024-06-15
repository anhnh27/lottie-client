import animationFilterReducer from "@/modules/animations/slice/filter";
import publicAnimationReducer from "@/modules/animations/slice/public-animations";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    animationFilter: animationFilterReducer,
    publicAnimation: publicAnimationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
