import { createSlice } from '@reduxjs/toolkit';

interface BoolState {
	value: Bool
};

const initialState = {
	value: true 
};

export const darkSlice = createSlice({
	name: "darkTheme",
	initialState,
	reducers: {
		changeTheme: (state, action) => {
			state.value = action.payload;
		},
	},
})

export const { changeTheme } = darkSlice.actions;
export default darkSlice.reducer;
