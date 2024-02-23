import { createSlice } from "@reduxjs/toolkit";

export interface Steps {
  completed: boolean;
  createdAt: string;
  id: number;
  name: string;
  parentId: number;
}

export interface Tasks {
  category: string;
  completed: boolean;
  createdAt: number;
  dueDate: string | null;
  important: boolean;
  id: number;
  name: string;
  steps: Steps[];
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
    addTaskOnTop: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    addTaskOnBottom: (state, action) => {
      state.value = [...state.value, action.payload];
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
    changeName: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.id) {
          return { ...el, name: action.payload.name };
        } else return el;
      });
    },
    changeCategory: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.id) {
          return { ...el, category: action.payload.category };
        } else return el;
      });
    },
    changeDueDate: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.id) {
          return { ...el, dueDate: action.payload.dueDate };
        } else return el;
      });
    },
    addStep: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.parentId) {
          return { ...el, steps: [...el.steps, action.payload] };
        } else return el;
      });
    },
    removeStep: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.parentId) {
          return {
            ...el,
            steps: el.steps.filter((e) => e.id !== action.payload.id),
          };
        } else return el;
      });
    },
    changeStepName: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.parentId) {
          return {
            ...el,
            steps: el.steps.map((e: Steps, j: number) => {
              if (e.id === action.payload.id) {
                return { ...e, name: action.payload.name };
              } else return e;
            }),
          };
        } else return el;
      });
    },
    completeStep: (state, action) => {
      state.value = state.value.map((el: Tasks, i: number) => {
        if (el.id === action.payload.parentId) {
          return {
            ...el,
            steps: el.steps.map((e: Steps, j: number) => {
              if (e.id === action.payload.id) {
                return { ...e, completed: action.payload.completed };
              } else return e;
            }),
          };
        } else return el;
      });
    },
  },
});

export const {
  addStep,
  addTaskOnBottom,
  addTaskOnTop,
  changeCategory,
  changeDueDate,
  changeImportance,
  changeName,
  changeStatus,
  changeStepName,
  completeStep,
  removeStep,
  removeTask,
} = taskSlice.actions;
export default taskSlice.reducer;
