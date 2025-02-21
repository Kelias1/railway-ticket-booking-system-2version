import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { IIdName } from '../../models/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { choiceCityFrom, choiceCityTo, sliceChoiceState } from '../../store/sliceChoice';
import { clearCities, getCityThunk, sliceGetCityState } from '../../store/sliceGetCity';
import { SearchInputs } from '../../models/index';
import { sliceHeaderTransformState } from '../../store/sliceHeaderTransform';
import './searchWidget.css';

export const SearchCity = () => {
	const [city, setCity] = useState<SearchInputs>({ from: '', to: '' });
	const [hidden, setHidden] = useState('hide-section');
	const { fromCity, toCity } = useAppSelector(sliceChoiceState);
	const { transform } = useAppSelector(sliceHeaderTransformState);
	const { items } = useAppSelector(sliceGetCityState);
	const dispatch = useAppDispatch();
	const timeRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		clearTimeout(timeRef.current)
		if (city.to.trim() !== '') {
			timeRef.current = setTimeout(() => {
				dispatch(getCityThunk(city.to)).unwrap();
			}, 1000)
		}
		return () => clearTimeout(timeRef.current)
	}, [city.to, dispatch])

	useEffect(() => {
		clearTimeout(timeRef.current)
		if (city.from.trim() !== '') {
			timeRef.current = setTimeout(() => {
				dispatch(getCityThunk(city.from)).unwrap();
			}, 1000)
		}
		return () => clearTimeout(timeRef.current)
	}, [city.from, dispatch])

	function inputFromCity(event: ChangeEvent<HTMLInputElement>) {
		setCity((prev) => ({ ...prev, from: event.target.value }));
		if (hidden === 'hide-section') {
			setHidden('city__from');
		};
	};

	function inputToCity(event: ChangeEvent<HTMLInputElement>) {
		setCity((prev) => ({ ...prev, to: event.target.value }));
		if (hidden === 'hide-section') {
			setHidden('city__to');
		};
	};

	function showListCitiesFrom() {
		dispatch(clearCities());
		if (hidden !== 'city__from') {
			setHidden('city__from');
		} else {
			setHidden('hide-section');
		};

		if (city.from) {
			dispatch(getCityThunk(city.from)).unwrap();
		}
	};

	function showListCitiesTo() {
		dispatch(clearCities());
		if (hidden !== 'city__to') {
			setHidden('city__to');
		} else {
			setHidden('hide-section');
		};

		if (city.to) {
			dispatch(getCityThunk(city.to)).unwrap();
		}
	};

	function getCity(choiceCity: IIdName) {
		if (hidden === 'city__from') {
			dispatch(choiceCityFrom(choiceCity));
			setCity((prev) => ({ ...prev, from: choiceCity.name }));
		};

		if (hidden === 'city__to') {
			dispatch(choiceCityTo(choiceCity));
			setCity((prev) => ({ ...prev, to: choiceCity.name }));
		};
		setHidden('hide-section');
		dispatch(clearCities());
	};

	function swapCity() {
		if (toCity && fromCity) {
			dispatch(choiceCityFrom(toCity));
			dispatch(choiceCityTo(fromCity));
		}
		setCity({ from: city.to, to: city.from });
	};

	return (
		<div className="search__direction">
			<p className="search__direction-text">Направление</p>
			<div className="search__direction-inputs">
				<input
					type="text"
					className="direction__input-from"
					placeholder="Откуда"
					value={city.from}
					onChange={inputFromCity}
					onClick={showListCitiesFrom}
				/>
				<button className="direction__btn" type="button" onClick={swapCity} />
				<input
					type="text"
					className="direction__input-to"
					placeholder="Куда"
					value={city.to}
					onChange={inputToCity}
					onClick={showListCitiesTo}
				/>
				<div className={`${hidden}${transform ? '-transform' : ''}`}>
					<div className="city__list">
						{items.length === 0 ?
							<div className='dots__list'>
								<div className='dots__list-absolute'>
									<div className='loader'></div>
								</div>
							</div> : items.map((elem) => <p onClick={() => getCity(elem)} key={elem._id}>{elem.name}</p>)}
					</div>
				</div>
			</div>
		</div>
	)
};