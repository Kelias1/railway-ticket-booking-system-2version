import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLastTicketsThunk, sliceGetLastTicketsState } from '../../store/sliceGetLastTickets';
import './last-tickets.css';

// Функция форматирования чисел
const formatNumber = (num: number) => {
	return num.toLocaleString('ru-RU');
}

export const LastTickets = () => {
	const { items } = useAppSelector(sliceGetLastTicketsState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getLastTicketsThunk());
	}, [dispatch]);

	return (
		<aside className="siderbar__last-tickets">
			<h3 className="last-tickets__title">последние билеты</h3>
			<ul className="last-tickets__list">
				{items.map((elem) =>
					<li className="last-tickets__list-item" key={elem.departure._id}>
						<div className="item__from-to">
							<div className="item__from">
								<p className="item__city">{elem.departure.from.city.name}</p>
								<p className="item__station">
									{elem.departure.from.railway_station_name} вокзал
								</p>
							</div>
							<div className="item__to">
								<p className="item__city">{elem.departure.to.city.name}</p>
								<p className="item__station">
									{elem.departure.to.railway_station_name} вокзал
								</p>
							</div>
						</div>
						<div className="item__amenities-price">
							<div className="item__amenities"></div>
							<div className="item__start-price">
								<p className="price__start-text">от</p>
								<p className="price__start-value">{formatNumber(elem.min_price)}</p>
								<span className="currency-symbol"></span>
							</div>
						</div>
					</li>
				)}
			</ul>
		</aside>
	)
};