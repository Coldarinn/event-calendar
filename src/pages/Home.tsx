import { FC, useState } from "react";
import { Calendar } from "../components/Calendar";
import { EventModal } from "../components/EventModal";
import { useAppSelector } from '../hooks/redux';

const Home: FC = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { events } = useAppSelector((state) => state.eventReducer);

	return (
		<div className="home">
			<Calendar />
			<button className="home__button" onClick={() => setIsVisible(true)}>{events.length > 0 ? "добавить событие" : "добавить первое событие"}</button>
			<EventModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
		</div>

	)
};

export default Home;