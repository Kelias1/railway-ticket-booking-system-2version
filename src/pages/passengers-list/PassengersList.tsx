import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { currentStepTwo } from '../../store/sliceBarProgress';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StateAgePassenger } from '../../models/index';
import { sliceOrderState } from '../../store/sliceOrder';
import { slicePriceState } from '../../store/slicePrice';
import { Passenger } from './components/Passenger';
import './passengers-list.css';

export const PassengersList = () => {
	const { totalSeatsAge, totalSeatsChild } = useAppSelector(slicePriceState);
	const { departure: { seats } } = useAppSelector(sliceOrderState)
	const [amountPassengers, setAmountPassengers] = useState<number>(totalSeatsAge + totalSeatsChild - 1);
	const [addComponents, setAddComponents] = useState<number[]>([1]);
	const [agesPassengers, setAgesPassengers] = useState<StateAgePassenger>({
		age: totalSeatsAge,
		child: totalSeatsChild
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(currentStepTwo());
	}, [dispatch]);

	useEffect(() => {
		let age = 0;
		let child = 0;
		seats.map((elem) => {
			if (elem.person_info.is_adult) {
				age += 1;
			};

			if (!elem.person_info.is_adult) {
				child += 1;
			};

			return elem;
		});

		setAgesPassengers({
			age: totalSeatsAge - age,
			child: totalSeatsChild - child
		});
	}, [seats, totalSeatsAge, totalSeatsChild]);


	function addPassenger() {
		if (amountPassengers >= 1) {
			setAmountPassengers((prev) => prev -= 1);
			setAddComponents([...addComponents, 1]);
		};
	};

	function nextStepToOrder() {
		if (agesPassengers.age === 0 && agesPassengers.child === 0) {
			navigate('/ticket/payment');
		};
	};

	return (
		<div className='list__passengers'>
			{addComponents.map((elem, i) => <Passenger
				addPassenger={addPassenger}
				agesPassengers={agesPassengers}
				num={elem + i}
				key={elem + i} />)}
			<div className='add__passengers' onClick={addPassenger}>
				<h2 className='add__passenger-title'>Добавить пассажира</h2>
				<span className='add__passenger-img'></span>
			</div>
			<button className={
				agesPassengers.age === 0 && agesPassengers.child === 0 ?
					'list__passenger-btn-ok' : 'list__passenger-btn'}
				type='button'
				onClick={nextStepToOrder}>Далее</button>
		</div>
	)
};