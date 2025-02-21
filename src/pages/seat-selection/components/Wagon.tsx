// import { BaseSyntheticEvent, useState } from 'react';
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../store/hooks';
// import { changeAmountTickets, changeNumberSeats, changePriceSeats, changeServiceLinens, changeServiceWifi, slicePriceState } from '../../../store/slicePrice';
// import { changeNotice } from '../../../store/sliceNotice';
// import { amountSeats, seatAvailability } from '../../../utils/amountSeats';
// import { schemeFirstClass, schemeFourthClass, schemeThirdClass } from '../../../utils/schemeCoach';
// import { ISeatClass, ISeats } from '../../../models/interfaces';
// import '../list-wagons.css';

// type Props = {
// 	classStyle: string,
// 	coach: ISeats,
// 	onSeatSelect: () => void // Añade esta línea
// }

// enum VisibleServices {
// 	Air = 'air',
// 	Wifi = 'wifi',
// 	Linens = 'linens',
// 	Cup = 'cup'
// }

// export const Wagon = ({ classStyle, coach }: Props) => {
// 	const [visible, setVisible] = useState({
// 		[VisibleServices.Air]: false,
// 		[VisibleServices.Wifi]: false,
// 		[VisibleServices.Linens]: false,
// 		[VisibleServices.Cup]: false
// 	});
// 	const [wifiBought, setWifiBought] = useState(false);
// 	const [linensBought, setLinensBought] = useState(false);
// 	const {
// 		firstClass,
// 		secondClass,
// 		thirdClass,
// 		fourthClass
// 	} = useAppSelector(slicePriceState);
// 	const [current, setCurrent] = useState<ISeatClass>({
// 		seatsAge: 0,
// 		seatsChild: 0,
// 		totalPrice: 0,
// 		amountTickets: 0
// 	});
// 	const dispatch = useAppDispatch();

// 	useEffect(() => {
// 		if (coach.coach.class_type === 'first') {
// 			setCurrent(firstClass);
// 		};
// 		if (coach.coach.class_type === 'second') {
// 			setCurrent(secondClass);
// 		};
// 		if (coach.coach.class_type === 'third') {
// 			setCurrent(thirdClass);
// 		};
// 		if (coach.coach.class_type === 'fourth') {
// 			setCurrent(fourthClass);
// 		};
// 	}, [firstClass, secondClass, thirdClass, fourthClass, coach.coach.class_type]);

// 	function mouseMoveToAir(event: BaseSyntheticEvent) {
// 		if (event.target.classList.contains('service__air-selected') || event.target.classList.contains('service__air')) {
// 			setVisible({
// 				air: true,
// 				wifi: false,
// 				linens: false,
// 				cup: false
// 			});
// 		};
// 	};

// 	function mouseMoveToWifi(event: BaseSyntheticEvent) {
// 		if (event.target.classList.contains('service__wifi') || event.target.classList.contains('service__wifi-not-include')) {
// 			setVisible({
// 				air: false,
// 				wifi: true,
// 				linens: false,
// 				cup: false
// 			});
// 		};
// 	};

// 	function mouseMoveToLinens(event: BaseSyntheticEvent) {
// 		if (event.target.classList.contains('service__linens-not-include') ||
// 			event.target.classList.contains('service__linens') ||
// 			event.target.classList.contains('service__included')) {
// 			setVisible({
// 				air: false,
// 				wifi: false,
// 				linens: true,
// 				cup: false
// 			});
// 		};
// 	};

// 	function mouseMoveToCup(event: BaseSyntheticEvent) {
// 		if (event.target.classList.contains('service__coffee')) {
// 			setVisible({
// 				air: false,
// 				wifi: false,
// 				linens: false,
// 				cup: true
// 			});
// 		};
// 	};

// 	function buyWifi() {
// 		if (wifiBought) {
// 			dispatch(changeServiceWifi({
// 				classType: coach.coach.class_type,
// 				price: -Number(coach.coach.wifi_price)
// 			}));
// 			setWifiBought(false);
// 		} else {
// 			if (((current.seatsAge !== 0 || current.seatsChild !== 0) || current.totalPrice !== 0) && coach.coach.have_wifi) {
// 				dispatch(changeServiceWifi({
// 					classType: coach.coach.class_type,
// 					price: Number(coach.coach.wifi_price)
// 				}));
// 				setWifiBought(true);
// 			} else if (coach.coach.have_wifi) {
// 				dispatch(changeNotice({
// 					notice: true,
// 					text: 'Укажите количество билетов и выберите места!'
// 				}));
// 			};
// 		};
// 	};

// 	function buyLinens() {
// 		if (linensBought) {
// 			dispatch(changeServiceWifi({
// 				classType: coach.coach.class_type,
// 				price: -Number(coach.coach.linens_price)
// 			}));
// 			setLinensBought(false);
// 		} else {
// 			if (((current.seatsAge !== 0 || current.seatsChild !== 0) || current.totalPrice !== 0) && coach.coach.class_type !== 'fourth' && !coach.coach.is_linens_included) {
// 				dispatch(changeServiceLinens({
// 					classType: coach.coach.class_type,
// 					price: Number(coach.coach.linens_price)
// 				}));
// 				setLinensBought(true);
// 			} else if (coach.coach.class_type !== 'fourth' && !coach.coach.is_linens_included) {
// 				dispatch(changeNotice({
// 					notice: true,
// 					text: 'Укажите количество билетов и выберите места!'
// 				}));
// 			};
// 		};
// 	};

// 	function choiceSeats(event: BaseSyntheticEvent, price: number, seat: number, have: string) {
// 		if (event.target.classList.contains('seat__selected')) {
// 			dispatch(changePriceSeats({
// 				classType: coach.coach.class_type,
// 				price: -Number(price)
// 			}));
// 			dispatch(changeAmountTickets({
// 				classType: coach.coach.class_type,
// 				amount: 1
// 			}));
// 			dispatch(changeNumberSeats({
// 				classType: coach.coach.class_type,
// 				seat: {
// 					number: Number(seat),
// 					idCoach: coach.coach._id
// 				}
// 			}));
// 			event.target.classList.remove('seat__selected');
// 		} else {
// 			if (have === 'seat__available' && current.amountTickets !== 0) {
// 				dispatch(changePriceSeats({
// 					classType: coach.coach.class_type,
// 					price: Number(price)
// 				}));
// 				dispatch(changeAmountTickets({
// 					classType: coach.coach.class_type,
// 					amount: -1
// 				}));
// 				dispatch(changeNumberSeats({
// 					classType: coach.coach.class_type,
// 					seat: {
// 						number: Number(seat),
// 						idCoach: coach.coach._id
// 					}
// 				}));
// 				event.target.classList.add('seat__selected');
// 			} else if (current.amountTickets === 0) {
// 				dispatch(changeNotice({
// 					notice: true,
// 					text: 'Укажите количество билетов и выберите места!'
// 				}));
// 			};
// 		};
// 	};

// 	useEffect(() => {
// 		for (const i in visible) {
// 			if (visible[i as VisibleServices] === true) {
// 				setTimeout(() => setVisible({ ...visible, [i]: false }), 2 * 1000);
// 			};
// 		};
// 	}, [visible]);

// 	return (
// 		<div className={classStyle}>
// 			<div className="wagon__description-prices">
// 				<div className="wagon__number">
// 					<h4 className="wagon__number-title">{coach.coach.name.replace(/\D/g, '')}</h4>
// 					<p className="wagon__number-text">вагон</p>
// 				</div>

// 				<div className="wagon__seats-amount">
// 					<p className="seats__amount-title">Места
// 						<span className="seats__amount-number"> {amountSeats(coach.seats, coach.coach.class_type).sum}</span>
// 					</p>
// 					{(coach.coach.class_type === 'second' || coach.coach.class_type === 'third') && coach.coach.top_price ? (
// 						<p className='seats__amount-text'>
// 							Верхние <span className='seats__amount-number'> {amountSeats(coach.seats, coach.coach.class_type).top}</span>
// 						</p>
// 					) : null}
// 					{(coach.coach.class_type === 'second' || coach.coach.class_type === 'third') && coach.coach.bottom_price ? (
// 						<p className='seats__amount-text'>
// 							Нижние <span className='seats__amount-number'> {amountSeats(coach.seats, coach.coach.class_type).bottom}</span>
// 						</p>
// 					) : null}
// 					{coach.coach.class_type === 'third' && coach.coach.side_price ? ( // Добавлено условие для проверки класса
// 						<p className='seats__amount-text'>
// 							Боковые <span className='seats__amount-number'>{amountSeats(coach.seats, coach.coach.class_type).side}</span>
// 						</p>
// 					) : null}
// 				</div>

// 				{/* <div className="wagon__seats-price">
// 					<p className="seats__price-title">Стоимость</p>
// 					{((coach.coach.class_type === 'first' || coach.coach.class_type === 'fourth') && coach.coach.top_price) ? (
// 						<p className="seats__price-text">{coach.coach.top_price} <span className="currency-symbol"></span></p>
// 					) : null}
// 					{!(coach.coach.class_type === 'first' || coach.coach.class_type === 'fourth') && coach.coach.bottom_price ? (
// 						<p className="seats__price-text">{coach.coach.bottom_price} <span className="currency-symbol"></span></p>
// 					) : null}
// 				</div> */}

// 				<div className="wagon__seats-price">
// 					<p className="seats__price-title">Стоимость</p>
// 					{coach.coach.class_type === 'first' || coach.coach.class_type === 'fourth' ? (
// 						coach.coach.top_price ? (
// 							<p className="seats__price-text">{coach.coach.top_price} <span className="currency-symbol"></span></p>
// 						) : null
// 					) : (
// 						<>
// 							{coach.coach.top_price && (
// 								<p className="seats__price-text">{coach.coach.top_price} <span className="currency-symbol"></span></p>
// 							)}
// 							{coach.coach.bottom_price && (
// 								<p className="seats__price-text">{coach.coach.bottom_price} <span className="currency-symbol"></span></p>
// 							)}
// 						</>
// 					)}
// 				</div>

// 				<div className="wagon__services">
// 					<p className="wagon__services-text">Обслуживание <span>фпк</span></p>
// 					<div className="wagon__services-img">
// 						<div className="service__onboard">
// 							<span className={coach.coach.have_air_conditioning ? 'service__air-selected' : 'service__air'}
// 								onMouseEnter={mouseMoveToAir}></span>
// 							<div className={visible.air ? 'service__description' : 'hide-section'}>{coach.coach.have_air_conditioning ? 'кондиционер' : 'кондиционер'}</div>
// 						</div>

// 						<div className="service__onboard">
// 							<span className={coach.coach.have_wifi ? wifiBought ? 'service__wifi-selected' : 'service__wifi' : 'service__wifi-not-include'}
// 								onMouseEnter={mouseMoveToWifi}></span>
// 							<div className={visible.wifi ? 'service__description' : 'hide-section'}>{coach.coach.have_wifi ? 'WI-FI' : 'WI-FI'}</div>
// 						</div>

// 						{/* <div className="service__onboard">
// 							<span className={coach.coach.class_type === 'fourth' ? 'service__linens-not-include' :
// 								`service__linens ${coach.coach.is_linens_included ? 'service__included' : linensBought ? 'service__linens-selected' : ''}`}
// 								onMouseEnter={mouseMoveToLinens}></span>
// 							<div className={visible.linens ? 'service__description' : 'hide-section'}>{coach.coach.class_type === 'fourth' ? '' :
// 								`белье ${coach.coach.is_linens_included ? 'включено' : `${coach.coach.linens_price} р.`}`}</div>
// 						</div> */}

// 						<div className="service__onboard">
// 							<span className={coach.coach.class_type === 'fourth' ? 'service__linens-not-include' :
// 								`service__linens ${coach.coach.is_linens_included ? 'service__included' : linensBought ? 'service__linens-selected' : ''}`}
// 								onMouseEnter={mouseMoveToLinens}></span>
// 							<div className={visible.linens ? 'service__description' : 'hide-section'}>{coach.coach.class_type === 'fourth' ? 'белье' :
// 								`белье ${coach.coach.is_linens_included ? 'включено' : ''}`}</div>
// 						</div>

// 						<div className="service__onboard">
// 							<span className="service__coffee" onMouseEnter={mouseMoveToCup}></span>
// 							<div className={visible.cup ? 'service__description' : 'hide-section'}>питание</div>
// 						</div>
// 					</div>
// 					<div className="wagon__seats-selected">
// 						<p>{amountSeats(coach.seats, coach.coach.class_type).other} человек выбирают места в этом поезде</p>
// 					</div>
// 				</div>
// 			</div>
// 			{/* VAGON LUX */}
// 			<div className="wagon__seats-info">
// 				{coach.coach.class_type === 'first' ?
// 					<div className="seats__info-lux">
// 						{schemeFirstClass.map((elem, i) =>
// 							<div className="scheme__seats-lux" style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
// 								<span className={`seat__class seat__left ${seatAvailability(elem.left, coach)}`}
// 									onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.left, seatAvailability(elem.left, coach))}>{elem.left}</span>
// 								<span className={`seat__class seat__right ${seatAvailability(elem.right, coach)}`}
// 									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.right, seatAvailability(elem.right, coach))}>{elem.right}</span>
// 							</div>
// 						)}
// 						{/* VAGON COUPE */}
// 					</div> :
// 					coach.coach.class_type === 'second' ?
// 						<div className='seats__info-coupe'>
// 							{schemeThirdClass.map((elem, i) =>
// 								<div className='scheme__seats-coupe' style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
// 									<span className={`seat__class seat__top-left ${seatAvailability(elem.top[0], coach)}`}
// 										onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[0], seatAvailability(elem.top[0], coach))}>{elem.top[0]}</span>
// 									<span className={`seat__class seat__bottom-left ${seatAvailability(elem.bottom[0], coach)}`}
// 										onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[0], seatAvailability(elem.bottom[0], coach))}>{elem.bottom[0]}</span>
// 									<span className={`seat__class seat__top-right ${seatAvailability(elem.top[1], coach)}`}
// 										onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[1], seatAvailability(elem.top[1], coach))}>{elem.top[1]}</span>
// 									<span className={`seat__class seat__bottom-right ${seatAvailability(elem.bottom[1], coach)}`}
// 										onClick={(ev) => choiceSeats(ev, coach.coach.bottom_price, elem.bottom[1], seatAvailability(elem.bottom[1], coach))}>{elem.bottom[1]}</span>
// 								</div>
// 							)}
// 							{/* VAGON PLATZKART */}
// 						</div> :
// 						coach.coach.class_type === 'third' ?
// 							<div className='seats__info-platzkart'>
// 								{schemeThirdClass.map((elem, i) =>
// 									<div className='scheme__seats-platzkart' style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
// 										<span className={`seat__class seat__top-left ${seatAvailability(elem.top[0], coach)}`}
// 											onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[0], seatAvailability(elem.top[0], coach))}>{elem.top[0]}</span>
// 										<span className={`seat__class seat__bottom-left ${seatAvailability(elem.bottom[0], coach)}`}
// 											onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[0], seatAvailability(elem.bottom[0], coach))}>{elem.bottom[0]}</span>
// 										<span className={`seat__class seat__side-left ${seatAvailability(elem.side[0], coach)}`}
// 											onClick={(event) => choiceSeats(event, coach.coach.side_price, elem.side[0], seatAvailability(elem.side[0], coach))}>{elem.side[0]}</span>
// 										<span className={`seat__class seat__top-right ${seatAvailability(elem.top[1], coach)}`}
// 											onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[1], seatAvailability(elem.top[1], coach))}>{elem.top[1]}</span>
// 										<span className={`seat__class seat__bottom-right ${seatAvailability(elem.bottom[1], coach)}`}
// 											onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[1], seatAvailability(elem.bottom[1], coach))}>{elem.bottom[1]}</span>
// 										<span className={`seat__class seat__side-right ${seatAvailability(elem.side[1], coach)}`}
// 											onClick={(event) => choiceSeats(event, coach.coach.side_price, elem.side[1], seatAvailability(elem.side[1], coach))}>{elem.side[1]}</span>
// 									</div>
// 								)}
// 								{/* ECONOMY VAGON */}
// 							</div> :
// 							coach.coach.class_type === 'fourth' ?
// 								<div className='seats__info-economy'>
// 									<div className='scheme__seats-economy'>
// 										{schemeFourthClass.topWindow.map((elem, i) =>
// 											<span className={`seat__class seat__window-top ${seatAvailability(elem, coach)}`}
// 												style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
// 												onClick={(event) => choiceSeats(event, coach.coach.top_price, elem, seatAvailability(elem, coach))}>{elem}</span>
// 										)}
// 										{schemeFourthClass.topAisle.map((elem, i) =>
// 											<span className={`seat__class seat__aisle-top ${seatAvailability(elem, coach)}`}
// 												style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
// 												onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem, seatAvailability(elem, coach))}>{elem}</span>
// 										)}
// 										{schemeFourthClass.botAisle.map((elem, i) =>
// 											<span className={`seat__class seat__aisle-bottom ${seatAvailability(elem, coach)}`}
// 												style={{ left: `${55.3 + 44.2 * (i)}px` }} key={i}
// 												onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem, seatAvailability(elem, coach))}>{elem}</span>
// 										)}
// 										{schemeFourthClass.botWindow.map((elem, i) =>
// 											<span className={`seat__class seat__window-bottom ${seatAvailability(elem, coach)}`}
// 												style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
// 												onClick={(event) => choiceSeats(event, coach.coach.top_price, elem, seatAvailability(elem, coach))}>{elem}</span>
// 										)}
// 									</div>
// 								</div> : null}
// 			</div>
// 		</div>
// 	)
// };



import { BaseSyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeAmountTickets, changeNumberSeats, changePriceSeats, changeServiceLinens, changeServiceWifi, slicePriceState } from '../../../store/slicePrice';
import { changeNotice } from '../../../store/sliceNotice';
import { amountSeats, seatAvailability } from '../../../utils/amountSeats';
import { schemeFirstClass, schemeFourthClass, schemeThirdClass } from '../../../utils/schemeCoach';
import { ISeatClass, ISeats } from '../../../models/interfaces';
import '../list-wagons.css';

type Props = {
	classStyle: string,
	coach: ISeats,
	onSeatSelect: () => void
}

enum VisibleServices {
	Air = 'air',
	Wifi = 'wifi',
	Linens = 'linens',
	Cup = 'cup'
}

// Функция форматирования чисел
const formatNumber = (num: number) => {
	return num.toLocaleString('ru-RU');
}

export const Wagon = ({ classStyle, coach, onSeatSelect }: Props) => {
	const [visible, setVisible] = useState({
		[VisibleServices.Air]: false,
		[VisibleServices.Wifi]: false,
		[VisibleServices.Linens]: false,
		[VisibleServices.Cup]: false
	});
	const [wifiBought, setWifiBought] = useState(false);
	const [linensBought, setLinensBought] = useState(false);
	const {
		firstClass,
		secondClass,
		thirdClass,
		fourthClass
	} = useAppSelector(slicePriceState);
	const [current, setCurrent] = useState<ISeatClass>({
		seatsAge: 0,
		seatsChild: 0,
		totalPrice: 0,
		amountTickets: 0
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (coach.coach.class_type === 'first') {
			setCurrent(firstClass);
		};
		if (coach.coach.class_type === 'second') {
			setCurrent(secondClass);
		};
		if (coach.coach.class_type === 'third') {
			setCurrent(thirdClass);
		};
		if (coach.coach.class_type === 'fourth') {
			setCurrent(fourthClass);
		};
	}, [firstClass, secondClass, thirdClass, fourthClass, coach.coach.class_type]);

	function mouseMoveToAir(event: BaseSyntheticEvent) {
		if (event.target.classList.contains('service__air-selected') || event.target.classList.contains('service__air')) {
			setVisible({
				air: true,
				wifi: false,
				linens: false,
				cup: false
			});
		};
	};

	function mouseMoveToWifi(event: BaseSyntheticEvent) {
		if (event.target.classList.contains('service__wifi') || event.target.classList.contains('service__wifi-not-include')) {
			setVisible({
				air: false,
				wifi: true,
				linens: false,
				cup: false
			});
		};
	};

	function mouseMoveToLinens(event: BaseSyntheticEvent) {
		if (event.target.classList.contains('service__linens-not-include') ||
			event.target.classList.contains('service__linens') ||
			event.target.classList.contains('service__included')) {
			setVisible({
				air: false,
				wifi: false,
				linens: true,
				cup: false
			});
		};
	};

	function mouseMoveToCup(event: BaseSyntheticEvent) {
		if (event.target.classList.contains('service__coffee')) {
			setVisible({
				air: false,
				wifi: false,
				linens: false,
				cup: true
			});
		};
	};

	function buyWifi() {
		if (wifiBought) {
			dispatch(changeServiceWifi({
				classType: coach.coach.class_type,
				price: -Number(coach.coach.wifi_price)
			}));
			setWifiBought(false);
		} else {
			if (((current.seatsAge !== 0 || current.seatsChild !== 0) || current.totalPrice !== 0) && coach.coach.have_wifi) {
				dispatch(changeServiceWifi({
					classType: coach.coach.class_type,
					price: Number(coach.coach.wifi_price)
				}));
				setWifiBought(true);
			} else if (coach.coach.have_wifi) {
				dispatch(changeNotice({
					notice: true,
					text: 'Укажите количество билетов и выберите места!'
				}));
			};
		};
	};

	function buyLinens() {
		if (linensBought) {
			dispatch(changeServiceWifi({
				classType: coach.coach.class_type,
				price: -Number(coach.coach.linens_price)
			}));
			setLinensBought(false);
		} else {
			if (((current.seatsAge !== 0 || current.seatsChild !== 0) || current.totalPrice !== 0) && coach.coach.class_type !== 'fourth' && !coach.coach.is_linens_included) {
				dispatch(changeServiceLinens({
					classType: coach.coach.class_type,
					price: Number(coach.coach.linens_price)
				}));
				setLinensBought(true);
			} else if (coach.coach.class_type !== 'fourth' && !coach.coach.is_linens_included) {
				dispatch(changeNotice({
					notice: true,
					text: 'Укажите количество билетов и выберите места!'
				}));
			};
		};
	};

	function choiceSeats(event: BaseSyntheticEvent, price: number, seat: number, have: string) {
		if (event.target.classList.contains('seat__selected')) {
			dispatch(changePriceSeats({
				classType: coach.coach.class_type,
				price: -Number(price)
			}));
			dispatch(changeAmountTickets({
				classType: coach.coach.class_type,
				amount: 1
			}));
			dispatch(changeNumberSeats({
				classType: coach.coach.class_type,
				seat: {
					number: Number(seat),
					idCoach: coach.coach._id
				}
			}));
			event.target.classList.remove('seat__selected');
		} else {
			if (have === 'seat__available' && current.amountTickets !== 0) {
				dispatch(changePriceSeats({
					classType: coach.coach.class_type,
					price: Number(price)
				}));
				dispatch(changeAmountTickets({
					classType: coach.coach.class_type,
					amount: -1
				}));
				dispatch(changeNumberSeats({
					classType: coach.coach.class_type,
					seat: {
						number: Number(seat),
						idCoach: coach.coach._id
					}
				}));
				event.target.classList.add('seat__selected');
				onSeatSelect(); // Llama a la función cuando se seleccione un asiento
			} else if (current.amountTickets === 0) {
				dispatch(changeNotice({
					notice: true,
					text: 'Укажите количество билетов и выберите места!'
				}));
			};
		};
	};

	useEffect(() => {
		for (const i in visible) {
			if (visible[i as VisibleServices] === true) {
				setTimeout(() => setVisible({ ...visible, [i]: false }), 2 * 1000);
			};
		};
	}, [visible]);

	return (
		<div className={classStyle}>
			<div className="wagon__description-prices">
				<div className="wagon__number">
					<h4 className="wagon__number-title">{coach.coach.name.replace(/\D/g, '')}</h4>
					<p className="wagon__number-text">вагон</p>
				</div>

				<div className="wagon__seats-amount">
					<p className="seats__amount-title">Места
						<span className="seats__amount-number"> {amountSeats(coach.seats, coach.coach.class_type).sum}</span>
					</p>
					{(coach.coach.class_type === 'second' || coach.coach.class_type === 'third') && coach.coach.top_price ? (
						<p className='seats__amount-text'>
							Верхние <span className='seats__amount-number'> {amountSeats(coach.seats, coach.coach.class_type).top}</span>
						</p>
					) : null}
					{(coach.coach.class_type === 'second' || coach.coach.class_type === 'third') && coach.coach.bottom_price ? (
						<p className='seats__amount-text'>
							Нижние <span className='seats__amount-number'> {amountSeats(coach.seats, coach.coach.class_type).bottom}</span>
						</p>
					) : null}
					{coach.coach.class_type === 'third' && coach.coach.side_price ? (
						<p className='seats__amount-text'>
							Боковые <span className='seats__amount-number'>{amountSeats(coach.seats, coach.coach.class_type).side}</span>
						</p>
					) : null}
				</div>

				<div className="wagon__seats-price">
					<p className="seats__price-title">Стоимость</p>
					{coach.coach.class_type === 'first' || coach.coach.class_type === 'fourth' ? (
						coach.coach.top_price ? (
							<p className="seats__price-text">{formatNumber(coach.coach.top_price)} <span className="currency-symbol"></span></p>
						) : null
					) : (
						<>
							{coach.coach.bottom_price ? (
								<p className="seats__price-text">{formatNumber(coach.coach.bottom_price)} <span className="currency-symbol"></span></p>
							) : null}
							{coach.coach.class_type === 'third' && coach.coach.side_price ? (
								<p className="seats__price-text">{formatNumber(coach.coach.side_price)} <span className="currency-symbol"></span></p>
							) : null}
							{coach.coach.top_price ? (
								<p className="seats__price-text">{formatNumber(coach.coach.top_price)} <span className="currency-symbol"></span></p>
							) : null}
						</>
					)}
				</div>

				<div className="wagon__services">
					<p className="wagon__services-text">Обслуживание <span>фпк</span></p>
					<div className="wagon__services-img">

						<div className="service__onboard">
							<span className={coach.coach.have_air_conditioning ? 'service__air-selected' : 'service__air'}
								onMouseEnter={mouseMoveToAir}></span>
							<div className={visible.air ? 'service__description' : 'hide-section'}>{coach.coach.have_air_conditioning ? 'кондиционер есть' : 'кондиционер'}</div>
						</div>

						<div className="service__onboard">
							<span className={coach.coach.have_wifi ? wifiBought ? 'service__wifi-selected' : 'service__wifi' : 'service__wifi-not-include'}
								onMouseEnter={mouseMoveToWifi} onClick={buyWifi}></span>
							<div className={visible.wifi ? 'service__description' : 'hide-section'}>{coach.coach.have_wifi ? 'WI-FI' : 'WI-FI'}</div>
						</div>

						<div className="service__onboard">
							<span className={coach.coach.class_type === 'fourth' ? 'service__linens-not-include' :
								`service__linens ${coach.coach.is_linens_included ? 'service__included' : linensBought ? 'service__linens-selected' : ''}`}
								onMouseEnter={mouseMoveToLinens} onClick={buyLinens}></span>
							<div className={visible.linens ? 'service__description' : 'hide-section'}>{coach.coach.class_type === 'fourth' ? 'белье' :
								`белье ${coach.coach.is_linens_included ? 'включено' : ''}`}</div>
						</div>

						<div className="service__onboard">
							<span className="service__coffee" onMouseEnter={mouseMoveToCup}></span>
							<div className={visible.cup ? 'service__description' : 'hide-section'}>кофе</div>
						</div>
					</div>

					<div className="wagon__seats-selected">
						<p>{amountSeats(coach.seats, coach.coach.class_type).other} человек выбирают места в этом поезде</p>
					</div>
				</div>
			</div>

			<div className="wagon__seats-info">
				{coach.coach.class_type === 'first' ? (
					<div className="seats__info-lux">
						{schemeFirstClass.map((elem, i) =>
							<div className="scheme__seats-lux" style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
								<span className={`seat__class seat__left ${seatAvailability(elem.left, coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.left, seatAvailability(elem.left, coach))}>{elem.left}</span>
								<span className={`seat__class seat__right ${seatAvailability(elem.right, coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.right, seatAvailability(elem.right, coach))}>{elem.right}</span>
							</div>
						)}
					</div>
				) : coach.coach.class_type === 'second' ? (
					<div className='seats__info-coupe'>
						{schemeThirdClass.map((elem, i) =>
							<div className='scheme__seats-coupe' style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
								<span className={`seat__class seat__top-left ${seatAvailability(elem.top[0], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[0], seatAvailability(elem.top[0], coach))}>{elem.top[0]}</span>
								<span className={`seat__class seat__bottom-left ${seatAvailability(elem.bottom[0], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[0], seatAvailability(elem.bottom[0], coach))}>{elem.bottom[0]}</span>
								<span className={`seat__class seat__top-right ${seatAvailability(elem.top[1], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[1], seatAvailability(elem.top[1], coach))}>{elem.top[1]}</span>
								<span className={`seat__class seat__bottom-right ${seatAvailability(elem.bottom[1], coach)}`}
									onClick={(ev) => choiceSeats(ev, coach.coach.bottom_price, elem.bottom[1], seatAvailability(elem.bottom[1], coach))}>{elem.bottom[1]}</span>
							</div>
						)}
					</div>
				) : coach.coach.class_type === 'third' ? (
					<div className='seats__info-platzkart'>
						{schemeThirdClass.map((elem, i) =>
							<div className='scheme__seats-platzkart' style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
								<span className={`seat__class seat__top-left ${seatAvailability(elem.top[0], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[0], seatAvailability(elem.top[0], coach))}>{elem.top[0]}</span>
								<span className={`seat__class seat__bottom-left ${seatAvailability(elem.bottom[0], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[0], seatAvailability(elem.bottom[0], coach))}>{elem.bottom[0]}</span>
								<span className={`seat__class seat__side-left ${seatAvailability(elem.side[0], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.side_price, elem.side[0], seatAvailability(elem.side[0], coach))}>{elem.side[0]}</span>
								<span className={`seat__class seat__top-right ${seatAvailability(elem.top[1], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[1], seatAvailability(elem.top[1], coach))}>{elem.top[1]}</span>
								<span className={`seat__class seat__bottom-right ${seatAvailability(elem.bottom[1], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[1], seatAvailability(elem.bottom[1], coach))}>{elem.bottom[1]}</span>
								<span className={`seat__class seat__side-right ${seatAvailability(elem.side[1], coach)}`}
									onClick={(event) => choiceSeats(event, coach.coach.side_price, elem.side[1], seatAvailability(elem.side[1], coach))}>{elem.side[1]}</span>
							</div>
						)}
					</div>
				) : coach.coach.class_type === 'fourth' ? (
					<div className='seats__info-economy'>
						<div className='scheme__seats-economy'>
							{schemeFourthClass.topWindow.map((elem, i) =>
								<span className={`seat__class seat__window-top ${seatAvailability(elem, coach)}`}
									style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem, seatAvailability(elem, coach))}>{elem}</span>
							)}
							{schemeFourthClass.topAisle.map((elem, i) =>
								<span className={`seat__class seat__aisle-top ${seatAvailability(elem, coach)}`}
									style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
									onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem, seatAvailability(elem, coach))}>{elem}</span>
							)}
							{schemeFourthClass.botAisle.map((elem, i) =>
								<span className={`seat__class seat__aisle-bottom ${seatAvailability(elem, coach)}`}
									style={{ left: `${55.3 + 44.2 * (i)}px` }} key={i}
									onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem, seatAvailability(elem, coach))}>{elem}</span>
							)}
							{schemeFourthClass.botWindow.map((elem, i) =>
								<span className={`seat__class seat__window-bottom ${seatAvailability(elem, coach)}`}
									style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
									onClick={(event) => choiceSeats(event, coach.coach.top_price, elem, seatAvailability(elem, coach))}>{elem}</span>
							)}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};
