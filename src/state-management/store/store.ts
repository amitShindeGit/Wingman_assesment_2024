import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/products";

export const store = configureStore({
  reducer: {
    productState: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
