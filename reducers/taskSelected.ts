import { createSlice } from "@reduxjs/toolkit";
interface TaskState {
  value: number;
}
const initialState: TaskState = {
  value: 0,
};

export const taskSelectedSlice = createSlice({
  name: "taskSelected",
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectTask } = taskSelectedSlice.actions;
export default taskSelectedSlice.reducer;
