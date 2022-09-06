import { useEffect, FC, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchEvents } from '../store/reducers/actionCreators';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInfoModal } from './EventInfoModal';

export const Calendar: FC = () => {
	const dispatch = useAppDispatch();
	const { username } = useAppSelector((state) => state.authReducer);
	const { events } = useAppSelector((state) => state.eventReducer);
	const [currentEvent, setCurrentEvent] = useState({});
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		dispatch(fetchEvents(username));
	}, []);

	const clickHandler = (e: any) => {
		setCurrentEvent(e.event);
		setIsVisible(true);
	};

	return (
		<>
			{events.length > 0 && (
				<>
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin]}
						initialView="dayGridMonth"
						eventClick={(e) => clickHandler(e)}
						locale={"ru"}
						initialEvents={events}
					/>
					<EventInfoModal isVisible={isVisible} onClose={() => setIsVisible(false)} event={currentEvent} />
				</>
			)}
		</>
	);
}