import { useEffect, useState, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearStepAll, currentStepOne } from '../../store/sliceBarProgress';
import { addRoutes, filtering, sliceFilterState } from '../../store/sliceFilter';
import { filteringPricesRange } from '../../utils/minMaxPrices';
import { sortingDuration, sortingPrices, sortingTime } from '../../utils/sortingTrain';
import { dateForComparison, timeForSort } from '../../utils/trainDate';
import { IItem } from '../../models/interfaces';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceGetRouteState } from '../../store/sliceGetTrainList';
import { TrainSelection } from '../../components/train-selection/TrainSelection';
import './train-list.css';

export const TrainList = () => {
	const { loading, items } = useAppSelector(sliceGetRouteState);
	const { fromDate } = useAppSelector(sliceChoiceState);
	const {
		filteredRoutes,
		filterSeats,
		filterPrices,
		filterTimeFrom,
		filterTimeTo
	} = useAppSelector(sliceFilterState);
	const dispatch = useAppDispatch();
	const [list, setList] = useState<IItem[]>([]);
	const [none, setNone] = useState('hide-section');
	const [select, setSelect] = useState('времени');
	const [pages, setPages] = useState<number[]>([]);
	const [showOnPages, setShowOnPages] = useState(5);
	const [startSlice, setStartSlice] = useState(0);
	const [endSlice, setEndSlice] = useState(5);
	const [lengthPage, setLengthPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(clearStepAll());
	}, [dispatch]);

	useEffect(() => {
		dispatch(filtering({
			start: filterPrices.start,
			end: filterPrices.end,
			date: fromDate,
			filteringPricesRange,
			timeForSort,
			dateForComparison
		}));
	}, [filterSeats, filterPrices, filterTimeFrom, filterTimeTo, fromDate, dispatch]);

	useEffect(() => {
		const timer = setTimeout(() => setList(filteredRoutes), 500);
		return () => clearTimeout(timer);
	}, [filteredRoutes]);

	useEffect(() => {
		if (items && items.items.length > 0) {
			// console.log("Items from API:", items.items);
			dispatch(addRoutes(items.items));
			setList(items.items);
		};
	}, [loading, items, dispatch]);

	useEffect(() => {
		if (!loading) {
			dispatch(currentStepOne());
		};

		if (list) {
			setPages([]);
			const arr = []
			for (let i = 0; i < (list.length / showOnPages); i += 1) {
				arr.push(i);
			};
			setPages(arr);
		};
	}, [dispatch, list, loading, showOnPages]);

	useEffect(() => {
		if (list.length > 0) {
			swapClassStyle(currentPage);
		};
	}, [currentPage, list.length]);

	function getSort() {
		if (none === 'hide-section') {
			setNone('list__train-sort-select');
		} else {
			setNone('hide-section');
		}
	};

	function getSelect(event: SyntheticEvent<HTMLElement>) {
		if (event.currentTarget.textContent) {
			setSelect(event.currentTarget.textContent);
			setNone('hide-section');
			if (event.currentTarget.textContent === 'времени') {
				setList(sortingTime(list));
			};
			if (event.currentTarget.textContent === 'стоимости') {
				setList(sortingPrices(list));
			};
			if (event.currentTarget.textContent === 'длительности') {
				setList(sortingDuration(list));
			};
		};
	};

	function getShowOnPages(event: SyntheticEvent<HTMLElement>) {
		setShowOnPages(Number(event.currentTarget.textContent));
		setStartSlice(0);
		setLengthPage(Number(event.currentTarget.textContent));
		setEndSlice(Number(event.currentTarget.textContent));
	};

	function choicePage(event: SyntheticEvent<HTMLElement>) {
		setCurrentPage(Number(event.currentTarget.textContent));
		setStartSlice(lengthPage * (Number(event.currentTarget.textContent) - 1));
		setEndSlice(lengthPage * Number(event.currentTarget.textContent));
	};

	function prevPage() {
		if (startSlice >= lengthPage) {
			setStartSlice(startSlice - lengthPage);
		};

		if (endSlice >= lengthPage * 2) {
			setEndSlice(endSlice - lengthPage);
		};

		if ((currentPage - 1) > 0 && pages.length > 1) {
			setCurrentPage((prev) => prev -= 1);
		};

	};

	function nextPage() {
		if (startSlice < (lengthPage * (pages.length - 1))) {
			setStartSlice(startSlice + lengthPage);
		};

		if (endSlice < lengthPage * pages.length) {
			setEndSlice(endSlice + lengthPage);
		};

		if (currentPage < pages.length) {
			setCurrentPage((prev) => prev += 1);
		};

	};

	function swapClassStyle(page: number) {
		const elements = document.querySelectorAll('.footer-pages');

		if (elements.length > 0) {
			for (const i of elements) {
				if (i.classList.contains('choice__page')) {
					i.classList.remove('choice__page');
				};
			};
			elements[page - 1].classList.add('choice__page');
		}

	};

	if (!list.length) {
		return <div className="none__routes">Нет маршрутов! Выберете другую дату</div>
	};

	return (
		<div className="choice-train__list">
			<header className="header__list-trains">
				<div className="list__train-found">
					<p>найдено</p>
					<span>{list ? list.length : ''}</span>
				</div>
				<div className="list__train-sort">
					<p>сортировать по: <span className="sort__select" onClick={getSort}>{select}</span>
					</p>
					<div className={none}>
						<div className="select__time" onClick={getSelect}>времени</div>
						<div className="select__price" onClick={getSelect}>стоимости</div>
						<div className="select__duration" onClick={getSelect}>длительности</div>
					</div>
				</div>
				<div className="list__train-show">
					<p>показывать по:</p>
					<span onClick={getShowOnPages}>5</span>
					<span onClick={getShowOnPages}>10</span>
					<span onClick={getShowOnPages}>20</span>
				</div>
			</header>

			<div className="list-trains">
				{list.slice(startSlice, endSlice).map((elem) => {
					// console.log("Element being rendered:", elem);
					return <TrainSelection route={elem} key={elem.departure._id} />;
				})}
			</div>

			<section className="list-trains__footer">
				<h2 className="visually-hidden">List trains footer</h2>
				<div className="footer-pages">
					<div className="footer-page__previous" onClick={prevPage}></div>
					{pages.map((i) =>
						<div className='footer-page' onClick={choicePage} key={10 + i}>{i + 1}</div>
					)}
					<div className="footer-page__next" onClick={nextPage}></div>
				</div>
			</section>
		</div>
	);
};