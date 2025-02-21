import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { BarProgress } from '../bar-progress/BarProgress';
import { SearchWidget } from '../searchWidget/SearchWidget';
import { clearAllCity } from '../../store/sliceChoice';
import { clearAllFiltering } from '../../store/sliceFilter';
import { clearRouteList, sliceGetRouteState } from '../../store/sliceGetTrainList';
import { sliceHeaderTransformState, transformHeader, transformHeaderSuccess, transformHeaderToMain } from '../../store/sliceHeaderTransform';
import { clearOrder } from '../../store/sliceOrder';
import { clearAllPrices, clearTotalPrice } from '../../store/slicePrice';
import { clearStepAll } from '../../store/sliceBarProgress';
import './Header.css';

export const Header = () => {
	const {
		classHeader,
		classSearch,
		classTitle,
		classLine,
		success
	} = useAppSelector(sliceHeaderTransformState);
	const { loading } = useAppSelector(sliceGetRouteState);
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);

		if (location.pathname === '/') {
			dispatch(transformHeaderToMain());
		} else if (location.pathname === '/complete') {
			dispatch(transformHeaderSuccess());
		} else {
			dispatch(transformHeader());
		};
	}, [dispatch, location.pathname]);

	function clearStore() {
		dispatch(clearAllPrices());
		dispatch(clearTotalPrice());
		dispatch(clearAllFiltering());
		dispatch(clearRouteList());
		dispatch(clearAllCity());
		dispatch(clearStepAll());
		dispatch(clearOrder());
	};

	return (
		<div className="container">
			<header className={classHeader}>
				<div className="header__logo">
					<HashLink to='/' className="header__logo-icon" onClick={clearStore}>Лого</HashLink>
				</div>

				<nav className="header__nav">
					<ul className="header__nav-items">
						<li className="header__nav-item">
							<HashLink to="/#about">О нас</HashLink>
						</li>
						<li className="header__nav-item">
							<HashLink to="/#howItWorks">Как это работает</HashLink>
						</li>
						<li className="header__nav-item">
							<HashLink to="/#reviews">Отзывы</HashLink>
						</li>
						<li className="header__nav-item">
							<HashLink to="/#footer">Контакты</HashLink>
						</li>
					</ul>
				</nav>

				<div className={classTitle}>
					<h1 className="header__title">Вся жизнь - <span>путешествие!</span></h1>
				</div>

				{success ? null : <SearchWidget classStyle={classSearch} />}

				{success ? null :
					<>
						<div className={classLine}></div>
						{classLine === "hide-section" && !loading ? <BarProgress /> : null}
					</>}
			</header>
		</div>
	)
};