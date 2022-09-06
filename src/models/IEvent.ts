export interface IEvent {
	id: string,
	author: string;
	guests: [string];
	start: string;
	end: string;
	title: string;
}