import { Day } from '../../models/index';
import './calendar.css';

type Props = {
	array: Day[],
	date: number,
	currentMonth: number,
	otherMonth: number,
	onChoiceDate: (day: number, month: number) => void
};

export const DaysOfWeek = ({ array, date, currentMonth, otherMonth, onChoiceDate }: Props) => {
	return (
		<>
			{array.map((elem, i) => {
				if (elem.curDay !== 'this') {
					return <div
						className="date__other-month"
						key={elem.numDay + i}>
						{elem.numDay}
					</div>
				} else if (elem.curDay === 'this' && elem.numDay < date && currentMonth === otherMonth) {
					return <div
						className="date__other-month"
						key={elem.numDay + i}>
						{elem.numDay}
					</div>
				} else if (elem.curDay === 'this' && elem.numDay === date && currentMonth === otherMonth) {
					return <div
						className="date__today"
						onClick={() => onChoiceDate(elem.numDay, otherMonth)}
						key={elem.numDay + i}>
						{elem.numDay}
					</div>
				} else if (elem.curDay === 'this') {
					return <div
						className="date__current-month"
						onClick={() => onChoiceDate(elem.numDay, otherMonth)}
						key={elem.numDay + i}>
						{elem.numDay}
					</div>
				}
				return null;
			})}
		</>
	);
};