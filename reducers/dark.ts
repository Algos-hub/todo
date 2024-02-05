import { createSlice } from "@reduxjs/toolkit";

interface BoolState {
  value: boolean;
}

const initialState: BoolState = {
  value: true,
};

export const darkSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeTheme } = darkSlice.actions;
export default darkSlice.reducer;
