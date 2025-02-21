// import { useState } from 'react';
// import { useAppSelector } from '../../store/hooks';
// import { dateFromAndTo, durationTrip, toDate } from '../../utils/trainDate';
// import { sliceChoiceState } from '../../store/sliceChoice';
// import { slicePriceState } from '../../store/slicePrice';
// import './trip-details.css';

// export const TripDetails = () => {
// 	const { route } = useAppSelector(sliceChoiceState);
// 	const {
// 		totalSeatsAge,
// 		totalSeatsChild,
// 		totalPriceAge,
// 		totalPriceChild,
// 		totalPriceAll
// 	} = useAppSelector(slicePriceState);
// 	const [hiddenThere, setHiddenThere] = useState('');
// 	const [hiddenPassengers, setHiddenPassengers] = useState('');

// 	function showThere() {
// 		if (hiddenThere !== 'hide-section') {
// 			setHiddenThere('hide-section');
// 		} else {
// 			setHiddenThere('');
// 		};
// 	};

// 	function showPassengers() {
// 		if (hiddenPassengers !== 'hide-section') {
// 			setHiddenPassengers('hide-section');
// 		} else {
// 			setHiddenPassengers('');
// 		};
// 	}

// 	return (
// 		<div className='sidebar__trip-details'>

// 			<div className='details__title'>
// 				<h2 className='details__title-text'>детали поездки</h2>
// 			</div>

// 			<div className='details__departure'>
// 				<div className='details__departure-head'>
// 					<span className='departure__head-img'></span>
// 					<h3 className='details__head-title'>Туда</h3>
// 					<div className='departure__head-date'>{toDate(route?.departure.from.datetime)}</div>
// 					<span className={hiddenThere === '' ? 'pass__head-open-down' : 'pass__head-open-up'} onClick={showThere}></span>
// 				</div>

// 				<div className={hiddenThere}>
// 					<div className='details__train-number'>
// 						<p className='details__train-title'>№ Поезда</p>
// 						{/* <p className='departure__train-number'>{route?.departure.train._id.slice(0, 3)}</p> */}
// 						<p className='departure__train-number'>{route?.departure.train.name}</p>
// 					</div>

// 					<div className='details__train-name'>
// 						<p className='details__train-title'>Название</p>
// 						{/* <p className='departure__train-text'>{route?.departure.train.name}</p> */}
// 						<p className='departure__train-text'><span>{route?.departure.from.city.name}</span>
//               <br />
//               <span>{route?.departure.to.city.name}</span></p>
// 					</div>

// 					<div className='details__wrap'>
// 						<div className='details__left-column'>
// 							<div className='departure__time'>{dateFromAndTo(route?.departure.from.datetime)}</div>
// 							<div className='departure__date'>{toDate(route?.departure.from.datetime)}</div>
// 							<div className='details__city-wrap'>
// 								<p className='departure__city'>{route?.departure.from.city.name}</p>
// 								<p className='departure__station'>{route?.departure.from.railway_station_name}</p>
// 								<p className='details__station'>вокзал</p>
// 							</div>
// 						</div>
// 						<div className='details__arrow'>
// 							<p className='departure__travel-time'>{durationTrip(route?.departure.duration)}</p>
// 							<span className='departure__direction-arrow'></span>
// 						</div>
// 						<div className='details__right-column'>
// 							<div className='departure__time'>{dateFromAndTo(route?.departure.to.datetime)}</div>
// 							<div className='departure__date'>{toDate(route?.departure.to.datetime)}</div>
// 							<div className='details__city-wrap'>
// 								<p className='departure__city'>{route?.departure.to.city.name}</p>
// 								<p className='departure__station'>{route?.departure.to.railway_station_name}</p>
// 								<p className='details__station'>вокзал</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='details__line'></div>

// 			<div className='details__return'>
// 				<div className='details__return-head'>
// 					<span className='return__head-img'></span>
// 					<h3 className='details__head-title'>Обратно</h3>
// 					<div className='departure__head-date'>09.09.2018</div>
// 					<span className='details__head-open pass__head-open-down** pass__head-open-up**'></span>
// 				</div>

// 				<div>
// 					<div className='details__train-number'>
// 						<p className='details__train-title'>№ Поезда</p>
// 						<p className='departure__train-number'>116С</p>
// 					</div>

// 					<div className='details__train-name'>
// 						<p className='details__train-title'>Название</p>
// 						<p className='departure__train-text'>Адлер <br />
// 							Санкт-Петербург
// 						</p>
// 					</div>

// 					<div className='details__wrap'>
// 						<div className='details__left-column'>
// 							<div className='departure__time'>00:10</div>
// 							<div className='departure__date'>30.08.2018</div>
// 							<div className='details__city-wrap'>
// 								<p className='departure__city'>Москва</p>
// 								<p className='departure__station'>Курский</p>
// 								<p className='details__station'>вокзал</p>
// 							</div>
// 						</div>
// 						<div className='details__arrow'>
// 							<p className='departure__travel-time'>9 : 42</p>
// 							<span className='return__direction-arrow'></span>
// 						</div>
// 						<div className='details__right-column'>
// 							<div className='departure__time'>09:52</div>
// 							<div className='departure__date'>31.08.2018</div>
// 							<div className='details__city-wrap'>
// 								<p className='departure__city'>Санкт-Петербург</p>
// 								<p className='departure__station'>Ладожский</p>
// 								<p className='details__station'>вокзал</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='details__line'></div>

// 			<div className='details__passengers'>
// 				<div className='details__passengers-head'>
// 					<span className='passenger__head-img'></span>
// 					<h3 className='passenger__head-title'>Пассажиры</h3>
// 					<span className={hiddenPassengers === '' ? 'passenger__head-open-down' : 'passenger__head-open-up'} onClick={showPassengers}></span>
// 				</div>

// 				<div className={hiddenPassengers}>
// 					<div className='passenger__amount-price'>
// 						<div className='passenger__amount'>
// 							<p className='amount'>{totalSeatsAge}</p>
// 							<p className='passenger__age'>Взрослых</p>
// 						</div>
// 						<div className='passenger__price'>
// 							<p className='passenger__price-text'>{totalPriceAge}</p>
// 							<span className='passenger__currency-symbol'></span>
// 						</div>
// 					</div>
// 					<div className='passenger__amount-price'>
// 						<div className='passenger__amount'>
// 							<p className='amount'>{totalSeatsChild}</p>
// 							<p className='passenger__age'>Ребенок</p>
// 						</div>
// 						<div className='passenger__price'>
// 							<p className='passenger__price-text'>{totalPriceChild}</p>
// 							<span className='passenger__currency-symbol'></span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='details__line'></div>

// 			<div className='details__total'>
// 				<div className='details__total-line'>
// 					<p className='details__total-text'>итог</p>
// 					<p className='total__price-text'>{totalPriceAll}</p>
// 					<span className='details__total-currency-symbol'></span>
// 				</div>
// 			</div>
// 		</div>
// 	)
// };



import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { dateFromAndTo, durationTrip, toDate } from '../../utils/trainDate';
import { sliceChoiceState } from '../../store/sliceChoice';
import { slicePriceState } from '../../store/slicePrice';
import './trip-details.css';

export const TripDetails = () => {
	const { route } = useAppSelector(sliceChoiceState);
	const {
		totalSeatsAge,
		totalSeatsChild,
		totalPriceAge,
		totalPriceChild,
		totalPriceAll
	} = useAppSelector(slicePriceState);
	const [hiddenThere, setHiddenThere] = useState('');
	const [hiddenPassengers, setHiddenPassengers] = useState('');

	function showThere() {
		if (hiddenThere !== 'hide-section') {
			setHiddenThere('hide-section');
		} else {
			setHiddenThere('');
		};
	};

	const formattedPrice = String(totalPriceAll).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); //Разделение тысяч в числах пробелом
	const formattedPriceAdult = String(totalPriceAge).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); //Разделение тысяч в числах пробелом
	const formattedPriceChild = String(totalPriceChild).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); //Разделение тысяч в числах пробелом

	function showPassengers() {
		if (hiddenPassengers !== 'hide-section') {
			setHiddenPassengers('hide-section');
		} else {
			setHiddenPassengers('');
		};
	}

	return (
		<div className='sidebar__trip-details'>
			<div className='details__title'>
				<h2 className='details__title-text'>детали поездки</h2>
			</div>

			<div className='details__departure'>
				<div className='details__departure-head'>
					<span className='departure__head-img'></span>
					<h3 className='details__head-title'>Туда</h3>
					<div className='departure__head-date'>{toDate(route?.departure.from.datetime)}</div>
					<span className={hiddenThere === '' ? 'pass__head-open-down' : 'pass__head-open-up'} onClick={showThere}></span>
				</div>

				<div className={hiddenThere}>
					<div className='details__train-number'>
						<p className='details__train-title'>№ Поезда</p>
						<p className='departure__train-number'>{route?.departure.train.name}</p>
					</div>

					<div className='details__train-name'>
						<p className='details__train-title'>Название</p>
						<p className='departure__train-text'><span>{route?.departure.from.city.name}</span>
							<br />
							<span>{route?.departure.to.city.name}</span></p>
					</div>

					<div className='details__wrap'>
						<div className='details__left-column'>
							<div className='departure__time'>{dateFromAndTo(route?.departure.from.datetime)}</div>
							<div className='departure__date'>{toDate(route?.departure.from.datetime)}</div>
							<div className='details__city-wrap'>
								<p className='departure__city'>{route?.departure.from.city.name}</p>
								<p className='departure__station'>{route?.departure.from.railway_station_name}</p>
								<p className='details__station'>вокзал</p>
							</div>
						</div>
						<div className='details__arrow'>
							<p className='departure__travel-time'>{durationTrip(route?.departure.duration)}</p>
							<span className='departure__direction-arrow'></span>
						</div>
						<div className='details__right-column'>
							<div className='departure__time'>{dateFromAndTo(route?.departure.to.datetime)}</div>
							<div className='departure__date'>{toDate(route?.departure.to.datetime)}</div>
							<div className='details__city-wrap'>
								<p className='departure__city'>{route?.departure.to.city.name}</p>
								<p className='departure__station'>{route?.departure.to.railway_station_name}</p>
								<p className='details__station'>вокзал</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='details__line'></div>

			<div className='details__return'>
				<div className='details__return-head'>
					<span className='return__head-img'></span>
					<h3 className='details__head-title'>Обратно</h3>
					<div className='departure__head-date'>{toDate(route?.arrival?.from.datetime)}</div>
					<span className={hiddenThere === '' ? 'pass__head-open-down' : 'pass__head-open-up'} onClick={showThere}></span>
				</div>

				<div className={hiddenThere}>
					<div className='details__train-number'>
						<p className='details__train-title'>№ Поезда</p>
						<p className='departure__train-number'>{route?.arrival?.train.name}</p>
					</div>

					<div className='details__train-name'>
						<p className='details__train-title'>Название</p>
						<p className='departure__train-text'><span>{route?.arrival?.from.city.name}</span>
							<br />
							<span>{route?.arrival?.to.city.name}</span></p>
					</div>

					<div className='details__wrap'>
						<div className='details__left-column'>
							<div className='departure__time'>{dateFromAndTo(route?.arrival?.from.datetime)}</div>
							<div className='departure__date'>{toDate(route?.arrival?.from.datetime)}</div>
							<div className='details__city-wrap'>
								<p className='departure__city'>{route?.arrival?.from.city.name}</p>
								<p className='departure__station'>{route?.arrival?.from.railway_station_name}</p>
								<p className='details__station'>вокзал</p>
							</div>
						</div>
						<div className='details__arrow'>
							<p className='departure__travel-time'>{durationTrip(route?.arrival?.duration)}</p>
							<span className='return__direction-arrow'></span>
						</div>
						<div className='details__right-column'>
							<div className='departure__time'>{dateFromAndTo(route?.arrival?.to.datetime)}</div>
							<div className='departure__date'>{toDate(route?.arrival?.to.datetime)}</div>
							<div className='details__city-wrap'>
								<p className='departure__city'>{route?.arrival?.to.city.name}</p>
								<p className='departure__station'>{route?.arrival?.to.railway_station_name}</p>
								<p className='details__station'>вокзал</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='details__line'></div>

			<div className='details__passengers'>
				<div className='details__passengers-head'>
					<span className='passenger__head-img'></span>
					<h3 className='passenger__head-title'>Пассажиры</h3>
					<span className={hiddenPassengers === '' ? 'passenger__head-open-down' : 'passenger__head-open-up'} onClick={showPassengers}></span>
				</div>

				<div className={hiddenPassengers}>
					<div className='passenger__amount-price'>
						<div className='passenger__amount'>
							<p className='amount'>{totalSeatsAge}</p>
							<p className='passenger__age'>Взрослых</p>
						</div>
						<div className='passenger__price'>
							<p className='passenger__price-text'>{formattedPriceAdult}</p>
							<span className='passenger__currency-symbol'></span>
						</div>
					</div>
					<div className='passenger__amount-price'>
						<div className='passenger__amount'>
							<p className='amount'>{totalSeatsChild}</p>
							<p className='passenger__age'>Ребенок</p>
						</div>
						<div className='passenger__price'>
							<p className='passenger__price-text'>{formattedPriceChild}</p>
							<span className='passenger__currency-symbol'></span>
						</div>
					</div>
				</div>
			</div>

			<div className='details__line'></div>

			<div className='details__total'>
				<div className='details__total-line'>
					<p className='details__total-text'>итог</p>
					<p className='total__price-text'>{formattedPrice}</p>
					<span className='details__total-currency-symbol'></span>
				</div>
			</div>
		</div>
	)
};
