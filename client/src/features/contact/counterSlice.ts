import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 0,
  title: "YARC (yet another redux counter with redux toolkit)",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});
console.log(counterSlice.actions);

export const { increment, decrement } = counterSlice.actions;
