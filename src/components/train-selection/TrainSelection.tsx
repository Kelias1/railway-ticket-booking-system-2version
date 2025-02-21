// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IItem } from '../../models/interfaces';
// import { TrainSeatsInfo } from '../../models/index';
// import { useAppDispatch } from '../../store/hooks';
// import { choiceRoute } from '../../store/sliceChoice';
// import { getSeatsThunk } from '../../store/sliceGetSeats';
// import { addRouteId, clearOrder } from '../../store/sliceOrder';
// import { createArray } from '../../utils/createTrainSeatsArray';
// import { dateFromAndTo, durationTrip } from '../../utils/trainDate';
// import { TrainSelectionSeats } from './TrainSelectionSeats';
// import './train-selection.css';

// type Props = {
// 	route: IItem,
// 	btnText?: string
// };

// export const TrainSelection = ({ route, btnText = 'Выбрать места' }: Props) => {
// 	const [train, setTrain] = useState<TrainSeatsInfo[]>([]);
// 	const dispatch = useAppDispatch();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const arrayInfo: TrainSeatsInfo[] = [];

// 		if (route) {
// 			if (route.departure.have_first_class) {
// 				createArray(route, arrayInfo, 'first', 'Люкс');
// 			};

// 			if (route.departure.have_second_class) {
// 				createArray(route, arrayInfo, 'second', 'Купе');
// 			};

// 			if (route.departure.have_third_class) {
// 				createArray(route, arrayInfo, 'third', 'Плацкарт');
// 			};

// 			if (route.departure.have_fourth_class) {
// 				createArray(route, arrayInfo, 'fourth', 'Сидячий');
// 			};

// 			setTrain(arrayInfo);
// 		};
// 	}, [route]);

// 	function getCoaches() {
// 		if (route) {
// 			dispatch(choiceRoute(route));
// 			dispatch(getSeatsThunk(route.departure._id));
// 			dispatch(addRouteId(route.departure._id));
// 			navigate('/ticket/wagon');
// 		};
// 	};

// 	function backOrder() {
// 		dispatch(clearOrder());
// 		navigate('/ticket');
// 	};

// 	return (
// 		<article className="train__option">
// 			<div className="train__name">
// 				<span className="train__name-img"></span>
// 				<h4 className="train__name-number">{route.departure.train.name}</h4>
// 				<div className="train__name-destination">
// 					<p className="train__name-city">{route.departure.from.city.name}&#8594;</p>
// 					<p className="train__name-city">{route.departure.to.city.name}</p>
// 					{/* <p className="train__name-city">{route.departure.to.city.name}</p> */}
// 				</div>
// 			</div>

// 			<div className="train__destination">
// 				<div className="train__destination-route">
// 					<div className="train__destination-from">
// 						<p className="destination__time">{dateFromAndTo(route.departure.from.datetime)}</p>
// 						<div className="destination__from">
// 							<p className="destination__city">{route.departure.from.city.name}</p>
// 							<p className="destintion__station">{route.departure.from.railway_station_name} вокзал</p>
// 						</div>
// 					</div>
// 					<div className="train__destination-time">
// 						<p className="travel__time">{durationTrip(route.departure.duration)}</p>
// 						<span className="destination__arrow"></span>
// 					</div>
// 					<div className="train__destination-to">
// 						<p className="destination__time">{dateFromAndTo(route?.departure.to.datetime)}</p>
// 						<div className="destination__to">
// 							<p className="destination__city">{route.departure.to.city.name}</p>
// 							<p className="destintion__station">{route?.departure.to.railway_station_name} вокзал</p>
// 						</div>
// 					</div>
// 				</div>

// 			</div>

// 			<div className="train__ticket-price">
// 				<div className="train__ticket-options">
// 					{train.map((elem) =>
// 						<TrainSelectionSeats
// 							name={elem.name}
// 							seats={elem.seats}
// 							price={elem.price}
// 							seatPrice={elem.seatPrice}
// 							key={elem.name} />
// 					)}
// 				</div>

// 				<div className="train__amenities">
// 					<span className={`${route.departure.have_wifi ? 'amenities-wifi__includes' : 'train__amenities-wifi'}`}></span>
// 					<span className={`${route.departure.is_express ? 'amenities-express__includes' : 'train__amenities-express'}`}></span>
// 					<span className={`${route.departure.have_air_conditioning ? 'amenities-coffee__includes' : 'train__amenities-coffee'}`}></span>
// 				</div>

// 				{btnText !== 'Изменить' ?
// 					<button type='button' className='choice-train__btn' onClick={getCoaches}>{btnText}</button> :
// 					<button type='button' className='order__route-btn' onClick={backOrder}>{btnText}</button>}
// 			</div>
// 		</article>
// 	);
// };


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IItem, IDeparture, IPriceClass } from '../../models/interfaces';
import { TrainSeatsInfo } from '../../models/index';
import { useAppDispatch } from '../../store/hooks';
import { choiceRoute } from '../../store/sliceChoice';
import { getSeatsThunk } from '../../store/sliceGetSeats';
import { addRouteId, clearOrder } from '../../store/sliceOrder';
import { dateFromAndTo, durationTrip } from '../../utils/trainDate';
import { TrainSelectionSeats } from './TrainSelectionSeats';
import './train-selection.css';

type Props = {
	route: IItem,
	btnText?: string
};

export const TrainSelection = ({ route, btnText = 'Выбрать места' }: Props) => {
	const [train, setTrain] = useState<TrainSeatsInfo[]>([]);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const createArray = (
		departure: IDeparture,
		array: TrainSeatsInfo[],
		classType: string,
		className: string
	) => {
		const seatPrice: IPriceClass | undefined = departure.price_info[classType as keyof typeof departure.price_info] as IPriceClass | undefined;
		const price = seatPrice?.top_price ?? seatPrice?.bottom_price ?? departure.min_price;

		array.push({
			name: className,
			seats: departure.available_seats_info[classType as keyof typeof departure.available_seats_info] ?? 0,
			price: price,
			seatPrice: seatPrice || { top_price: 0, bottom_price: 0 }
		});
	};

	useEffect(() => {
		const arrayInfo: TrainSeatsInfo[] = [];

		if (route) {
			// console.log("Route data in TrainSelection:", route);

			const populateTrainInfo = (departure: IDeparture, array: TrainSeatsInfo[]) => {
				if (departure.have_first_class) {
					createArray(departure, array, 'first', 'Люкс');
				}
				if (departure.have_second_class) {
					createArray(departure, array, 'second', 'Купе');
				}
				if (departure.have_third_class) {
					createArray(departure, array, 'third', 'Плацкарт');
				}
				if (departure.have_fourth_class) {
					createArray(departure, array, 'fourth', 'Сидячий');
				}
			};

			populateTrainInfo(route.departure, arrayInfo);
			setTrain(arrayInfo);
		}
	}, [route]);

	const getCoaches = () => {
		if (route) {
			// console.log("Despachando ruta con datos:", route);
			dispatch(choiceRoute(route));
			dispatch(getSeatsThunk(route.departure._id));
			dispatch(addRouteId(route.departure._id));
			navigate('/ticket/wagon');
		}
	}

	const backOrder = () => {
		dispatch(clearOrder());
		navigate('/ticket');
	}

	return (
		<article className="train__option">

			<div className="train__name">
				<span className="train__name-img"></span>
				<h4 className="train__name-number">{route.departure.train.name}</h4>
				<div className="train__name-destination">
					<p className="train__name-city">{route.departure.from.city.name}&#8594;</p>
					<p className="train__name-city">{route.departure.to.city.name}</p>
				</div>
			</div>

			<div className="train__destination">
				{/* Раздел для поездки туда */}
				<div className="train__destination-route">
					<div className="train__destination-from">
						<p className="destination__time">{dateFromAndTo(route.departure.from.datetime)}</p>
						<div className="destination__from">
							<p className="destination__city">{route.departure.from.city.name}</p>
							<p className="destination__station">{route.departure.from.railway_station_name} вокзал</p>
						</div>
					</div>
					<div className="train__destination-time">
						<p className="travel__time">{durationTrip(route.departure.duration)}</p>
						<span className="destination__arrow"></span>
					</div>
					<div className="train__destination-to">
						<p className="destination__time">{dateFromAndTo(route.departure.to.datetime)}</p>
						<div className="destination__to">
							<p className="destination__city">{route.departure.to.city.name}</p>
							<p className="destination__station">{route.departure.to.railway_station_name} вокзал</p>
						</div>
					</div>
				</div>

				{/* Раздел для поездки обратно */}

				{route.arrival && (
					<div className="train__destination-return">
						<div className="train__destination-to">
							<p className="destination__time">{dateFromAndTo(route.arrival.to.datetime)}</p>
							<div className="destination__to">
								<p className="destination__city">{route.arrival.to.city.name}</p>
								<p className="destination__station">{route.arrival.to.railway_station_name} вокзал</p>
							</div>
						</div>

						<div className="train__destination-time">
							<p className="travel__time">{durationTrip(route.arrival.duration)}</p>
							<span className="destination__arrow-return"></span>
						</div>
						<div className="train__destination-from">
							<p className="destination__time">{dateFromAndTo(route.arrival.from.datetime)}</p>
							<div className="destination__from">
								<p className="destination__city">{route.arrival.from.city.name}</p>
								<p className="destination__station">{route.arrival.from.railway_station_name} вокзал</p>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="train__ticket-price">
				<div className="train__ticket-options">
					{train.map((elem, index) =>
						<TrainSelectionSeats
							name={elem.name}
							seats={elem.seats}
							price={elem.price}
							seatPrice={elem.seatPrice}
							key={`departure-${elem.name}-${index}`} />
					)}
				</div>

				<div className="train__amenities">
					<span className={`${route.departure.have_wifi ? 'amenities-wifi__includes' : 'train__amenities-wifi'}`}></span>
					<span className={`${route.departure.is_express ? 'amenities-express__includes' : 'train__amenities-express'}`}></span>
					<span className={`${route.departure.have_air_conditioning ? 'amenities-coffee__includes' : 'train__amenities-coffee'}`}></span>
				</div>

				{btnText !== 'Изменить' ?
					<button type='button' className='choice-train__btn' onClick={getCoaches}>{btnText}</button> :
					<button type='button' className='order__route-btn' onClick={backOrder}>{btnText}</button>}
			</div>
		</article>
	);
};
