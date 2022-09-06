import { FC, useState, useEffect } from "react";
import { ModalLayout } from "./ModalLayout";
import { Select } from "@mobiscroll/react";
import { fetchGuests, addEvent } from "../store/reducers/actionCreators";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

interface EventModalProps {
	isVisible: boolean,
	onClose: () => any,
}

export const EventModal: FC<EventModalProps> = ({ isVisible, onClose }) => {
	const dt = (new Date(Date.now())).toISOString().split('.')[0].split(":").slice(0, 2).join(":");

	const [startTime, setStartTime] = useState(dt);
	const [endTime, setEndTime] = useState(dt);
	const [title, setTitle] = useState('');
	const [eventGuests, setEventGuests] = useState<[string]>(['']);
	const { guests } = useAppSelector((state) => state.eventReducer);
	const { username } = useAppSelector((state) => state.authReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchGuests());
	}, []);

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (Date.parse(startTime) <= Date.now()) {
			alert("Время начала меньше текущего");
		} else if (!title) {
			alert("Введите название события");
		} else {
			addEvent({
				id: JSON.stringify(Date.now()), author: username, guests: eventGuests, start: (new Date(startTime)).toISOString(),
				end: (new Date(endTime)).toISOString(), title
			});
		}
	};

	return (
		<ModalLayout isVisible={isVisible} onClose={onClose}>
			<form className="event-form" onSubmit={(e) => submitHandler(e)}>
				<div className="event-form__item">
					<label htmlFor="startTime" className="event-form__label">Укажите Начало:</label>
					<input type="datetime-local" id="startTime" className="event-form__input" min={startTime} value={startTime} onChange={(e) => { setStartTime(e.target.value) }} />
				</div>
				<div className="event-form__item">
					<label htmlFor="endTime" className="event-form__label">Укажите Конец:</label>
					<input type="datetime-local" id="endTime" className="event-form__input" min={startTime} value={endTime} onChange={(e) => { setEndTime(e.target.value) }} />
				</div>
				<div className="event-form__item">
					<label htmlFor="" className="event-form__label">Выберите гостей:</label>
					<Select
						data={guests.map((item) => ({ value: item.username, text: item.username }))}
						selectMultiple={true}
						touchUi={false}
						onChange={(e) => setEventGuests(e.value)}
					/>
				</div>
				<div className="event-form__item">
					<label htmlFor="title" className="event-form__label">Название:</label>
					<input type="text" id="title" className="event-form__input" value={title} onChange={(e) => { setTitle(e.target.value) }} />
				</div>
				<button type="submit" className="home__button">добавить событие</button>
			</form>
		</ModalLayout>
	)
}