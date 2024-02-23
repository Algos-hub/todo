import { createSlice } from "@reduxjs/toolkit";

export interface Settings {
  confirmDeleting: boolean;
  darkTheme: boolean;
  importantOnTop: boolean;
  newOnTop: boolean;
}

const initialState: Settings = {
  confirmDeleting: true,
  darkTheme: false,
  importantOnTop: true,
  newOnTop: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
    changeConfirmDeleting: (state, action) => {
      state.confirmDeleting = action.payload;
    },
    changeNewOnTop: (state, action) => {
      state.newOnTop = action.payload;
    },
    changeImportantOnTop: (state, action) => {
      state.importantOnTop = action.payload;
    },
  },
});

export const {
  changeConfirmDeleting,
  changeImportantOnTop,
  changeNewOnTop,
  changeTheme,
} = settingsSlice.actions;
export default settingsSlice.reducer;
