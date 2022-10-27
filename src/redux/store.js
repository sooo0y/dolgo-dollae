import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./modules/comment";
import coseSlice from "./modules/coses";
import postSlice from "./modules/post";

const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    cose: coseSlice.reducer
  },
});

export default store;