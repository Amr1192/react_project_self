// strslice
import { createSlice } from "@reduxjs/toolkit";

const wishCounter = createSlice({
  name: "wishList",
  initialState: [],
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;
      const exist = state.find((i) => i.id === item.id);
      if (!exist) state.push(item);
    },

    removeFromWishList: (state, action) => {
      return state.filter((item) => item.id != action.payload);
    },

    resetWishList: (state) => {
      return [];
    },
  },
});

export const { addToWishList, removeFromWishList, resetWishList } =
  wishCounter.actions;
export default wishCounter.reducer;
