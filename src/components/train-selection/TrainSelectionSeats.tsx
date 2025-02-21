import { useEffect, useRef, useState } from 'react';
import { TrainSeatsInfo } from '../../models/index';
import './train-selection.css';

type SeatInfo = {
	name: string,
	price?: number,
};

// Функция форматирования чисел
const formatNumber = (num: number) => {
	return num.toLocaleString('ru-RU');
}

export const TrainSelectionSeats = ({ name, seats, price, seatPrice }: TrainSeatsInfo) => {
	const [hidden, setHidden] = useState<string>('hide-section');
	const [seatInfo, setSeatInfo] = useState<SeatInfo[]>([]);
	const timer = useRef<NodeJS.Timeout>();

	function showSeats() {
		if (hidden === 'hide-section') {
			setHidden('seat__up-show');
			timer.current = setTimeout(() => setHidden('hide-section'), 3 * 1000);
		} else {
			setHidden('hide-section');
		};
	};

	useEffect(() => clearTimeout(timer.current));

	useEffect(() => {
		const arrayPrice = [];
		if (Object.prototype.hasOwnProperty.call(seatPrice, 'top_price')) {
			arrayPrice.push({
				name: 'верхние',
				price: seatPrice?.top_price,
			});
		};

		if (Object.prototype.hasOwnProperty.call(seatPrice, 'bottom_price')) {
			arrayPrice.push({
				name: 'нижние',
				price: seatPrice?.bottom_price,
			});
		};

		if (Object.prototype.hasOwnProperty.call(seatPrice, 'side_price')) {
			arrayPrice.push({
				name: 'боковые',
				price: seatPrice?.side_price,
			});
		};

		setSeatInfo(arrayPrice);
	}, [seatPrice]);

	return (
		<div className="train__ticket">
			<p className="ticket__class">{name}</p>
			<span className="amount__seat" onMouseEnter={showSeats}>
				{seats}
				<div className={hidden}>
					{seatInfo.map((elem, i) =>
						<div className="seat__up" key={i}>
							<p className="ticket__class">{elem.name}</p>
							<p className="seat__ticket-price">{elem.price !== undefined ? formatNumber(elem.price) : 'N/A'}</p>
							<span className="currency-symbol"></span>
						</div>
					)}
				</div>
			</span>
			<div className="ticket__start-price">
				<p className="start-price__text">от</p>
				<p className="start-price__number">{formatNumber(price)}</p>
				<span className="currency-symbol"></span>
			</div>
		</div>
	)
};