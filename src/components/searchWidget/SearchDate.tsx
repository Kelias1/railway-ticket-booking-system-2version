import { InputDate } from '../calendar/InputDate';
import './searchWidget.css';

export const SearchDate = () => {
	return (
		<div className="search__date">
			<p className="search__date-text">Дата</p>
			<div className="search__date-inputs">
				<InputDate inputStyle="date__input-from" calendarStyle="calendar__from" />
				<InputDate inputStyle="date__input-to" calendarStyle="calendar__to" />
			</div>
		</div>
	);
};