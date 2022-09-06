import authReducer from './reducers/auth';
import eventReducer from './reducers/event';
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	authReducer,
	eventReducer
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch