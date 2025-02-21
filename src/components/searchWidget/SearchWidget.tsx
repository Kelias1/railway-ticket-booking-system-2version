import { SearchCity } from './SearchCity';
import { SearchDate } from './SearchDate';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAllFiltering } from '../../store/sliceFilter';
import { clearRouteList, getRouteThunk } from '../../store/sliceGetTrainList';
import { clearStepAll, currentStepOne } from '../../store/sliceBarProgress';
import { Error } from '../error/Error';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceHeaderTransformState } from '../../store/sliceHeaderTransform';
import { convertDate } from '../../utils/date';
import './searchWidget.css';

type Props = {
	classStyle: string
};

export const SearchWidget = ({ classStyle }: Props) => {
	const [error, setError] = useState(false);
	const { fromDate, toDate, fromCity, toCity } = useAppSelector(sliceChoiceState);
	const { transform } = useAppSelector(sliceHeaderTransformState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/') {
			dispatch(clearStepAll());
		};
	}, [dispatch, location.pathname]);

	function submit() {
		dispatch(clearRouteList());
		dispatch(clearAllFiltering());
		const convertedFromDate = fromDate ? convertDate(fromDate) : '';
		const convertedToDate = toDate ? convertDate(toDate) : '';

		if (fromCity && toCity) {
			if (!transform && location.pathname === '/') {
				navigate('/ticket');
				dispatch(getRouteThunk({
					fromDate: convertedFromDate,
					toDate: convertedToDate,
					fromCity,
					toCity
				}));
				dispatch(currentStepOne());
			} else if (transform && location.pathname === '/ticket') {
				dispatch(getRouteThunk({
					fromDate: convertedFromDate,
					toDate: convertedToDate,
					fromCity,
					toCity
				}));
			}
		} else {
			setError(true);
		}
	}

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => setError(false), 2 * 1000);
			return () => clearTimeout(timer)
		};
	}, [error]);

	return (
		<div className={classStyle}>
			<Error classStyle={error ? (transform ? 'error__transform' : 'error') : 'hide-section'} />
			<div className='search__inputs'>
				<SearchCity />
				<SearchDate />
			</div>
			<button className='search__btn' onClick={submit} type='button'>найти билеты</button>
		</div>
	);
};