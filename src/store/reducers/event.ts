import { IEvent } from './../../models/IEvent';
import { IUser } from './../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EventState {
	guests: IUser[];
	events: IEvent[];
};

const initialState: EventState = {
	guests: [],
	events: []
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		changeGuests: (state, action: PayloadAction<IUser[]>) => {
			state.guests = action.payload;
		},
		changeEvents: (state, action: PayloadAction<IEvent[]>) => {
			state.events = action.payload;
		}
	}
});

export default eventSlice.reducer;