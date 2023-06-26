import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/Catalog/catalogSlice";

// export const congfigureStore = () => {
//   return createStore(counterReducer);
// };

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// a replacement hook for useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// a replacement hook for useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
