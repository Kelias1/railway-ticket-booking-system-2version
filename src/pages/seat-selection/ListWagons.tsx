// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { slicePriceState, totalChoiceRoute } from '../../store/slicePrice';
// import { clearStepAll } from '../../store/sliceBarProgress';
// import { wagonClassTypes } from '../../utils/wagonClassTypes';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { ISeats } from '../../models/interfaces';
// import { sliceChoiceState } from '../../store/sliceChoice';
// import { sliceGetSeatsState } from '../../store/sliceGetSeats';
// import { TypeWagon } from './components/TypeWagon';
// import './list-wagons.css';

// type StateButton = {
//   disabled: boolean,
//   className: string
// }

// export const ListWagons = () => {
// 	const { items } = useAppSelector(sliceGetSeatsState);
//   const { route } = useAppSelector(sliceChoiceState);
//   const navigate = useNavigate();
//   const [types, setTypes] = useState<ISeats[][]>([]);
//   const [button, setButton] = useState<StateButton>({ disabled: true, className: '-disable' });
//   const dispatch = useAppDispatch();
//   const { totalSeatsAge, totalSeatsChild, totalAmountTickets } = useAppSelector(slicePriceState);

//   useEffect(() => {
//     dispatch(clearStepAll());
//   }, [dispatch]);

//   useEffect(() => {
//     if (items.length) {
//       setTypes(wagonClassTypes(items));
//     }
//   }, [items]);

//   useEffect(() => {
//     if (totalAmountTickets === 0 && (totalSeatsAge !== 0 || totalSeatsChild !== 0)) {
//       setButton({ disabled: false, className: '' })
//     } else {
//       setButton({ disabled: true, className: '-disable' });
//     };
//   }, [totalAmountTickets, totalSeatsAge, totalSeatsChild]);

//   function toPassengers() {
//     navigate('/ticket/passengers');
//     dispatch(totalChoiceRoute());
//   };

// 	return (
// 		<div className='wagons'>
// 			<h2 className='wagons__title'>выбор мест</h2>

// 			{types.map((elem, i) => <TypeWagon coaches={elem} route={route} classStyle={i % 2 === 0 ? '-departure' : '-return'} key={i} />)}

// 			<button className={`wagon__button${button.className}`} type='button' disabled={button.disabled} onClick={toPassengers}>далее</button>
// 		</div>
// 	)
// };



// ESTA ES LA ULTIMA VERSION DEL LUNES 17 DE FEBRERO 

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { slicePriceState, totalChoiceRoute } from '../../store/slicePrice';
import { clearStepAll } from '../../store/sliceBarProgress';
import { wagonClassTypes } from '../../utils/wagonClassTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ISeats } from '../../models/interfaces';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceGetSeatsState } from '../../store/sliceGetSeats';
import { TypeWagon } from './components/TypeWagon';
import './list-wagons.css';

type StateButton = {
	disabled: boolean,
	className: string
}

export const ListWagons = () => {
	const { items } = useAppSelector(sliceGetSeatsState);
	const { route } = useAppSelector(sliceChoiceState);
	const navigate = useNavigate();
	const [departureWagons, setDepartureWagons] = useState<ISeats[][]>([]);
	const [returnWagons, setReturnWagons] = useState<ISeats[][]>([]);
	const [button, setButton] = useState<StateButton>({ disabled: true, className: '-disable' });
	const [selectedDepartureType, setSelectedDepartureType] = useState<string>('');
	const [selectedReturnType, setSelectedReturnType] = useState<string>('');
	const [departureSeatsChosen, setDepartureSeatsChosen] = useState<boolean>(false);
	const [returnSeatsChosen, setReturnSeatsChosen] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { totalSeatsAge, totalSeatsChild, totalAmountTickets } = useAppSelector(slicePriceState);

	useEffect(() => {
		dispatch(clearStepAll());
	}, [dispatch]);

	useEffect(() => {
		if (items.length) {
			const types = wagonClassTypes(items);
			setDepartureWagons(types.filter((_, i) => i % 2 === 0));
			setReturnWagons(types.filter((_, i) => i % 2 !== 0));
			if (types.length) {
				setSelectedDepartureType(types[0][0].coach.class_type); // выбирает первый доступный тип вагона для отправляющегося поезда.
				setSelectedReturnType(types[1] && types[1][0] ? types[1][0].coach.class_type : types[0][0].coach.class_type); // выбирает первый доступный тип вагона для обратного поезда или тип отправляющегося поезда, если имеется только один тип.
			}
		}
	}, [items]);

	useEffect(() => {
		if (totalAmountTickets === 0 && (totalSeatsAge !== 0 || totalSeatsChild !== 0)) {
			setButton({ disabled: false, className: '' });
		} else {
			setButton({ disabled: true, className: '-disable' });
		}
	}, [totalAmountTickets, totalSeatsAge, totalSeatsChild]);

	useEffect(() => {
		if (departureSeatsChosen && returnSeatsChosen) {
			setButton({ disabled: false, className: '' });
		} else {
			setButton({ disabled: true, className: '-disable' });
		}
	}, [departureSeatsChosen, returnSeatsChosen]);

	function toPassengers() {
		navigate('/ticket/passengers');
		dispatch(totalChoiceRoute());
	};

	return (
		<div className='wagons'>
			<h2 className='wagons__title'>выбор мест</h2>

			<div className='wagon'>
				<TypeWagon
					coaches={departureWagons}
					route={route}
					classStyle='-departure'
					selectedType={selectedDepartureType}
					setSelectedType={setSelectedDepartureType}
					setSeatsChosen={setDepartureSeatsChosen}
				/>
			</div>

			<div className='wagon-return'>
				<TypeWagon
					coaches={returnWagons.length ? returnWagons : departureWagons}
					route={route}
					classStyle='-return'
					selectedType={selectedReturnType}
					setSelectedType={setSelectedReturnType}
					setSeatsChosen={setReturnSeatsChosen}
				/>
			</div>

			<button
				className={`wagon__button${button.className}`}
				type='button'
				disabled={button.disabled}
				onClick={toPassengers}
			>
				далее
			</button>
		</div>
	);
};