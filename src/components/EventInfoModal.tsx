import { FC } from "react";
import { ModalLayout } from "./ModalLayout";

interface EventModalProps {
	isVisible: boolean,
	onClose: () => any,
	event: any
}

export const EventInfoModal: FC<EventModalProps> = ({ isVisible, onClose, event }) => {
	return (
		<ModalLayout isVisible={isVisible} onClose={onClose}>
			<div style={{ textAlign: 'center', fontSize: '16px' }}>
				<div>Автор события: {event.extendedProps?.author},</div>
				<div>Гости события: {event.extendedProps?.guests.map((item: string) => <span key={item}>{item} {", "}</span>)}</div>
				<div>Начало события: {event.start?.toLocaleString()},</div>
				<div>Конец события: {event.end?.toLocaleString()}.</div>
			</div>
		</ModalLayout>
	)
}