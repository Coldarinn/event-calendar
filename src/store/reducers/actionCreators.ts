import { AppDispatch } from './../index';
import { authSlice } from './auth';
import { eventSlice } from './event';
import axios from 'axios';
import { IUser } from '../../models/IUser';
import { IEvent } from '../../models/IEvent';

export const login = (user: IUser) => async (dispatch: AppDispatch) => {
	try {
		dispatch(authSlice.actions.changeIsLoading(true));
		setTimeout(async () => {
			const response = await axios.get<IUser[]>("./users.json");
			const currentUser = response.data.find((item: IUser) => item.username === user.username && item.password === user.password);
			if (currentUser) {
				localStorage.setItem("username", currentUser.username);
				dispatch(authSlice.actions.changeAuth(true));
				dispatch(authSlice.actions.changeUsername(currentUser.username));
				dispatch(authSlice.actions.changeIsLoading(false));
			} else {
				dispatch(authSlice.actions.changeError('Неверный логин или пароль'));
				dispatch(authSlice.actions.changeIsLoading(false));
			};
		}, 1000);
	} catch (e) {
		dispatch(authSlice.actions.changeError('Непредвиденная ошибка'));
		dispatch(authSlice.actions.changeIsLoading(false));
	}
};

export const logout = () => async (dispatch: AppDispatch) => {
	localStorage.removeItem("username");
	dispatch(authSlice.actions.changeAuth(false));
	dispatch(authSlice.actions.changeUsername(''));
};

export const fetchEvents = (username: string) => async (dispatch: AppDispatch) => {
	const events = localStorage.getItem("events") || '[]';
	const json = JSON.parse(events) as IEvent[];
	const currentUserEvents = json.filter(ev => ev.author === username || ev.guests.filter((item) => username === item).length > 0);
	dispatch(eventSlice.actions.changeEvents(currentUserEvents));
};

export const fetchGuests = () => async (dispatch: AppDispatch) => {
	const response = await axios.get<IUser[]>("./users.json");
	dispatch(eventSlice.actions.changeGuests(response.data));
};

export const addEvent = (event: IEvent) => {
	const events = JSON.parse(localStorage.getItem("events") || '[]');
	const newEvents = [...events, event];
	localStorage.setItem("events", JSON.stringify(newEvents));
	window.location.reload();
}