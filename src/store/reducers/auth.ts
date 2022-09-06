import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	isAuth: boolean;
	isLoading: boolean;
	username: string;
	error: string;
};

const initialState: AuthState = {
	isAuth: false,
	isLoading: false,
	username: '',
	error: ''
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
		changeIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		changeUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		changeError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		}
	}
});

export default authSlice.reducer;