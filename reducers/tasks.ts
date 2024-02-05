import { createSlice } from "@reduxjs/toolkit";

interface Tasks {
  id: number;
  name: string;
  category: string;
  createAt: Date;
  dueDate: Date | null;
  important: boolean;
  completed: boolean;
}

interface TasksState {
  value: Tasks[];
}

const initialState: TasksState = {
  value: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    removeTask: (state, action) => {
      state.value = state.value.filter((el) => el.id !== action.payload.id);
    },
    changeStatus: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.id) {
          return { ...el, completed: action.payload.completed };
        } else return el;
      });
    },
    changeImportance: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.id) {
          return { ...el, important: action.payload.important };
        } else return el;
      });
    },
  },
});

export const { addTask, removeTask, changeStatus, changeImportance } =
  taskSlice.actions;
export default taskSlice.reducer;
