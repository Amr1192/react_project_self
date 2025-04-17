// React Redux Toolkit RTK Query Sni  ==> (srts )

import { configureStore } from "@reduxjs/toolkit";
import wishCounter from "./slices/wishListCounter";

const reduxStore = configureStore({
  reducer: {
    wishList: wishCounter,
  },
});

export default reduxStore;
