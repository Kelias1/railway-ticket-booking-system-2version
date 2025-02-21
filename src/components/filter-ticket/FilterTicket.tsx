import { ChangeEvent, useEffect, useState } from 'react';
import { addFilterPrices, addFilterSeats, addFilterTimeFrom, addFilterTimeTo, sliceFilterState } from '../../store/sliceFilter';
import { minMaxPrices } from '../../utils/minMaxPrices';
import { secondsToTime } from '../../utils/secondsToTime';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FilterCheck, FilterNone, FilterState, FuncValue } from '../../models/index';
import { InputDate } from '../calendar/InputDate';
import './filter-ticket.css';

const maxThereDeparture = 86400;
const minThereDeparture = 0;
const maxThereArrival = 86400;
const minThereArrival = 0;
const maxBackDeparture = 86400;
const minBackDeparture = 0;
const maxBackArrival = 86400;
const minBackArrival = 0;

export const FilterTicket = () => {
	const { currentRoutes } = useAppSelector(sliceFilterState);
	const dispatch = useAppDispatch();
	const [check, setCheck] = useState<FilterCheck>({
		coupe: false,
		couchetteCar: false,
		seated: false,
		lux: false,
		wifi: false,
		express: false
	});
	const [price, setPrice] = useState<FilterState>({ start: 0, end: 7000 });
	const [none, setNone] = useState<FilterNone>({ there: true, back: true });
	const [thereDeparture, setThereDeparture] = useState<FilterState>({ start: 0, end: 86400 });
	const [thereArrival, setThereArrival] = useState<FilterState>({ start: 0, end: 86400 });
	const [backDeparture, setBackDeparture] = useState<FilterState>({ start: 0, end: 86400 });
	const [backArrival, setBackArrival] = useState<FilterState>({ start: 0, end: 86400 });
	const { maxPrice, minPrice } = minMaxPrices(currentRoutes);

	useEffect(() => {
		if (currentRoutes && currentRoutes.length > 0) {
			const prices = minMaxPrices(currentRoutes);
			setPrice({ start: prices.minPrice, end: prices.maxPrice });
		};
	}, [currentRoutes]);

	useEffect(() => {
		dispatch(addFilterPrices({ start: price.start, end: price.end }));
	}, [dispatch, price]);

	useEffect(() => {
		dispatch(addFilterSeats(check));
	}, [check, dispatch]);

	useEffect(() => {
		dispatch(addFilterTimeFrom({ thereDeparture, thereArrival }));
	}, [thereDeparture, thereArrival, dispatch]);

	useEffect(() => {
		dispatch(addFilterTimeTo({ backDeparture, backArrival }));
	}, [backDeparture, backArrival, dispatch]);

	function changeStartPrice(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) <= price.end) {
			setPrice({ ...price, start: Number(event.target.value) });
		};
	};

	function changeEndPrice(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) >= price.start) {
			setPrice({ ...price, end: Number(event.target.value) });
		};
	};

	function changeThereDepartureStart(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) <= thereDeparture.end) {
			setThereDeparture({ ...thereDeparture, start: Number(event.target.value) });
		};
	};

	function changeThereDepartureEnd(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) >= thereDeparture.start) {
			setThereDeparture({ ...thereDeparture, end: Number(event.target.value) });
		};
	};

	function changeThereArrivalStart(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) <= thereArrival.end) {
			setThereArrival({ ...thereArrival, start: Number(event.target.value) });
		};
	};

	function changeThereArrivalEnd(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) >= thereArrival.start) {
			setThereArrival({ ...thereArrival, end: Number(event.target.value) });
		};
	};

	function changeBackDepartureStart(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) <= backDeparture.end) {
			setBackDeparture({ ...backDeparture, start: Number(event.target.value) });
		};
	};

	function changeBackDepartureEnd(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) >= backDeparture.start) {
			setBackDeparture({ ...backDeparture, end: Number(event.target.value) });
		};
	};

	function changeBackArrivalStart(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) <= backArrival.end) {
			setBackArrival({ ...backArrival, start: Number(event.target.value) });
		};
	};

	function changeBackArrivalEnd(event: ChangeEvent<HTMLInputElement>) {
		if (Number(event.target.value) >= backArrival.start) {
			setBackArrival({ ...backArrival, end: Number(event.target.value) });
		};
	};

	const leftValue: FuncValue = (max, min, start) => {
		return (100 / (max - min)) * (start - min);
	};

	const rightValue: FuncValue = (max, min, end) => {
		return (100 / (max - min)) * ((max - min) - (end - min));
	};

	const startValue: FuncValue = (max, min, start) => {
		return 260 * (((100 / (max - min)) * (start - min)) / 100);
	};

	const endValue: FuncValue = (max, min, end) => {
		return 260 * (((100 / (max - min)) * ((max - min) - (end - min))) / 100);
	};

	return (
		<aside className="sidebar__filter">
			<div className="filter__date">
				<div className="filter__date-from">
					<p className="filter__date-title">
						Дата поездки
					</p>
					<InputDate
						inputStyle=""
						calendarStyle="filter__calendar-from"
					/>
				</div>
				<div className="filter__date-to">
					<p className="filter__date-title">
						Дата возвращения
					</p>
					<InputDate
						inputStyle=""
						calendarStyle="filter__calendar-to"
					/>
				</div>
			</div>
			<div className="filter__line"></div>

			<div className="filter__checkbox">
				<div className="checkbox__coupe">
					<span className="coupe__img"></span>
					<p className="checkbox__text">Купе</p>
					<div className={`check__element check__${check.coupe ? 'true' : 'false'}`}
						onClick={() => setCheck({ ...check, coupe: !check.coupe })}>
						<input
							className="checkbox__input"
							type="checkbox"
							defaultChecked={check.coupe} />
					</div>
				</div>
				<div className="checkbox__couchette-car">
					<span className="couchette-car__img"></span>
					<p className="checkbox__text">Плацкарт</p>
					<div className={`check__element check__${check.couchetteCar ? 'true' : 'false'}`}
						onClick={() => setCheck({ ...check, couchetteCar: !check.couchetteCar })}>
						<input
							className="checkbox__input" type="checkbox"
							defaultChecked={check.couchetteCar}
						/>
					</div>
				</div>
				<div className="checkbox__seat">
					<span className="seat__img"></span>
					<p className="checkbox__text">Сидячий</p>
					<div className={`check__element check__${check.seated ? 'true' : 'false'}`}
						onClick={() => setCheck({ ...check, seated: !check.seated })}>
						<input
							className="checkbox__input" type="checkbox"
							defaultChecked={check.seated}
						/>
					</div>
				</div>
				<div className="checkbox__lux">
					<span className="lux__img"></span>
					<p className="checkbox__text">Люкс</p>
					<div className={`check__element check__${check.lux ? 'true' : 'false'}`}
						onClick={() => setCheck({ ...check, lux: !check.lux })}>
						<input
							className="checkbox__input"
							type="checkbox"
							defaultChecked={check.lux}
						/>
					</div>
				</div>
				<div className="checkbox__wifi">
					<span className="wifi__img"></span>
					<p className="checkbox__text">Wi-Fi</p>
					<div className={`check__element check__${check.wifi ? 'true' : 'false'}`}
						onClick={() => setCheck({ ...check, wifi: !check.wifi })}>
						<input
							className="checkbox__input"
							type="checkbox"
							defaultChecked={check.wifi}
						/>
					</div>
				</div>
				<div className="checkbox__express">
					<span className="express__img"></span>
					<p className="checkbox__text">Экспресс</p>
					<div className={`check__element check__${check.express ? 'true' : 'false'}`}
						onClick={() => setCheck({ ...check, express: !check.express })}>
						<input
							className="checkbox__input"
							type="checkbox"
							defaultChecked={check.express}
						/>
					</div>
				</div>
			</div>

			<div className="filter__line"></div>

			<div className="filter__price">
				<p className="filter__price-title">Стоимость</p>
				<div className="price__range">
					<div className="price__range-text">
						<p>от</p>
						<p>до</p>
					</div>
					<div className="range__input">
						<input
							type="range"
							min={minPrice}
							max={maxPrice}
							className="range__input-in"
							value={price.start}
							onChange={changeStartPrice}
						/>
						<input
							type="range"
							min={minPrice}
							max={maxPrice}
							className="range__input-out"
							value={price.end}
							onChange={changeEndPrice}
						/>
						<div className="range__line">
							<div className="range__line-body" style={{
								left: `${leftValue(maxPrice, minPrice, price.start)}%`,
								right: `${rightValue(maxPrice, minPrice, price.end)}%`
							}}></div>
						</div>
					</div>
					<div className="price__range-number">
						<p className="price__min">{minPrice}</p>
						<p className="price__start" style={{
							marginLeft: `${startValue(maxPrice, minPrice, price.start)}px`
						}}>{price.start}</p>
						<p className="price__end" style={{
							marginRight: `${endValue(maxPrice, minPrice, price.end)}px`
						}}>{price.end}</p>
						<p className="price__max">{maxPrice}</p>
					</div>
				</div>
			</div>

			<div className="filter__line"></div>

			<div className="filter__departure-date">
				<div className="filter__travel-date-title">
					<span className="filter__departure-date-img"></span>
					<p className="filter__travel-date-text">Туда</p>
					<span className={!none.there ? 'filter__date-close-up' : 'filter__date-close-down'}
						onClick={() => setNone({ ...none, there: !none.there })}></span>
				</div>

				<div className={none.there ? 'hide-section' : `${none.there}`}>
					<div className="travel-date__range-departure">
						<div className="travel-date__range-text">Время отбытия</div>
						<div className="range__input-travel-dates">
							<input
								className="range__input-date-in" type="range"
								min={minThereDeparture}
								max={maxThereDeparture}
								value={thereDeparture.start}
								onChange={changeThereDepartureStart}
							/>
							<input
								className="range__input-date-out" type="range"
								min={minThereDeparture}
								max={maxThereDeparture}
								value={thereDeparture.end}
								onChange={changeThereDepartureEnd}
							/>
							<div className="range__travel-date-line">
								<div className="range__date-line-body" style={{
									left: `${leftValue(maxThereDeparture, minThereDeparture, thereDeparture.start)}%`,
									right: `${rightValue(maxThereDeparture, minThereDeparture, thereDeparture.end)}%`
								}}></div>
							</div>
						</div>
						<div className="travel-date__range-number">
							<p className="travel-date__min">{secondsToTime(minThereDeparture)}</p>
							<p className="travel-date__start" style={{
								marginLeft: `${startValue(maxThereDeparture, minThereDeparture, thereDeparture.start)}px`
							}}>{secondsToTime(thereDeparture.start)}</p>
							<p className="travel-date__end" style={{
								marginRight: `${endValue(maxThereDeparture, minThereDeparture, thereDeparture.end)}px`
							}}>{secondsToTime(thereDeparture.end)}</p>
							<p className="travel-date__max">{secondsToTime(maxThereDeparture)}</p>
						</div>
					</div>

					<div className="travel-date__range-departure">
						<div className="travel-date__range-text">
							<p className="text__arrival">Время прибытия</p>
						</div>
						<div className="range__input-travel-dates">
							<input
								className="range__input-date-in" type="range"
								min={minThereArrival}
								max={maxThereArrival}
								value={thereArrival.start}
								onChange={changeThereArrivalStart}
							/>
							<input
								className="range__input-date-out" type="range"
								min={minThereArrival}
								max={maxThereArrival}
								value={thereArrival.end}
								onChange={changeThereArrivalEnd}
							/>
							<div className="range__travel-date-line">
								<div className="range__date-line-body" style={{
									left: `${leftValue(maxThereArrival, minThereArrival, thereArrival.start)}%`,
									right: `${rightValue(maxThereArrival, minThereArrival, thereArrival.end)}%`
								}}></div>
							</div>
						</div>
						<div className="travel-date__range-number">
							<p className="travel-date__min">{secondsToTime(minThereArrival)}</p>
							<p className="travel-date__start" style={{
								marginLeft: `${startValue(maxThereArrival, minThereArrival, thereArrival.start)}px`
							}}>{secondsToTime(thereArrival.start)}</p>
							<p className="travel-date__end" style={{
								marginRight: `${endValue(maxThereArrival, minThereArrival, thereArrival.end)}px`
							}}>{secondsToTime(thereArrival.end)}</p>
							<p className="travel-date__max">{secondsToTime(maxThereArrival)}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="filter__line"></div>

			<div className="filter__return-date">
				<div className="filter__travel-date-title">
					<span className="filter__return-date-img"></span>
					<p className="filter__travel-date-text">Обратно</p>
					<span className={!none.back ? 'filter__date-close-up' : 'filter__date-close-down'}
						onClick={() => setNone({ ...none, back: !none.back })}></span>
				</div>

				<div className={none.back ? 'hide-section' : `${none.back}`}>
					<div className="travel-date__range-return">
						<div className="travel-date__range-text">Время отбытия</div>
						<div className="range__input-travel-dates">
							<input
								className="range__input-date-in" type="range"
								min={minBackDeparture}
								max={maxBackDeparture}
								value={backDeparture.start}
								onChange={changeBackDepartureStart}
							/>
							<input
								className="range__input-date-out" type="range"
								min={minBackDeparture}
								max={maxBackDeparture}
								value={backDeparture.end}
								onChange={changeBackDepartureEnd}
							/>
							<div className="range__travel-date-line">
								<div className="range__date-line-body" style={{
									left: `${leftValue(maxBackDeparture, minBackDeparture, backDeparture.start)}%`,
									right: `${rightValue(maxBackDeparture, minBackDeparture, backDeparture.end)}%`
								}}></div>
							</div>
						</div>
						<div className="travel-date__range-number">
							<p className="travel-date__min">{secondsToTime(minBackDeparture)}</p>
							<p className="travel-date__start" style={{
								marginLeft: `${startValue(maxBackDeparture, minBackDeparture, backDeparture.start)}px`
							}}>{secondsToTime(backDeparture.start)}</p>
							<p className="travel-date__end" style={{
								marginRight: `${endValue(maxBackDeparture, minBackDeparture, backDeparture.end)}px`
							}}>{secondsToTime(backDeparture.end)}</p>
							<p className="travel-date__max">{secondsToTime(maxBackDeparture)}</p>
						</div>
					</div>

					<div className="travel-date__range-return">
						<div className="travel-date__range-text">
							<p className="text__arrival">Время прибытия</p>
						</div>
						<div className="range__input-travel-dates">
							<input
								className="range__input-date-in" type="range"
								min={minBackArrival}
								max={maxBackArrival}
								value={backArrival.start}
								onChange={changeBackArrivalStart}
							/>
							<input
								className="range__input-date-out" type="range"
								min={minBackArrival}
								max={maxBackArrival}
								value={backArrival.end}
								onChange={changeBackArrivalEnd}
							/>
							<div className="range__travel-date-line">
								<div className="range__date-line-body" style={{
									left: `${leftValue(maxBackArrival, minBackArrival, backArrival.start)}%`,
									right: `${rightValue(maxBackArrival, minBackArrival, backArrival.end)}%`
								}}></div>
							</div>
						</div>
						<div className="travel-date__range-number">
							<p className="travel-date__min">{secondsToTime(minBackArrival)}</p>
							<p className="travel-date__start" style={{
								marginLeft: `${startValue(maxBackArrival, minBackArrival, backArrival.start)}px`
							}}>{secondsToTime(backArrival.start)}</p>
							<p className="travel-date__end" style={{
								marginRight: `${endValue(maxBackArrival, minBackArrival, backArrival.end)}px`
							}}>{secondsToTime(backArrival.end)}</p>
							<p className="travel-date__max">{secondsToTime(maxBackArrival)}</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);

};