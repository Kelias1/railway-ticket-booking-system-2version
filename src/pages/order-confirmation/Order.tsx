import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearOrderPassengers, clearOrderPayment, sliceOrderState } from '../../store/sliceOrder';
import { postOrderThunk, slicePostOrderState } from '../../store/slicePostOrder';
import { currentStepFour } from '../../store/sliceBarProgress';
import { sliceChoiceState } from '../../store/sliceChoice';
import { slicePriceState } from '../../store/slicePrice';
import { TrainSelection } from '../../components/train-selection/TrainSelection';
import './order.css';

export const Order = () => {
	const { route } = useAppSelector(sliceChoiceState);
	const { totalPriceAll } = useAppSelector(slicePriceState);
	const { user, departure } = useAppSelector(sliceOrderState);
	const { status } = useAppSelector(slicePostOrderState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(currentStepFour());
	}, [dispatch]);

	useEffect(() => {
		if (status) {
			navigate('/complete');
		};
	}, [navigate, status]);

	function changePassengers() {
		navigate('/ticket/passengers');
		dispatch(clearOrderPassengers());
	};

	function changePayment() {
		navigate('/ticket/payment');
		dispatch(clearOrderPayment());
	};

	function confirmOrder() {
		dispatch(postOrderThunk({ user, departure }));
	};

	const formattedPrice = String(totalPriceAll).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); //Разделение тысяч в числах пробелом

	return (
		<div className='order'>
			<div className='order__route'>
				<h2 className='order__route-title'>Поезд</h2>
				{route && <TrainSelection route={route} btnText={'Изменить'} />}
			</div>

			<div className='order__passengers'>
				<h2 className='order__passenger-title'>Пассажиры</h2>
				<div className='order__passenger-container'>
					<div className='passengers__container-list'>
						{departure.seats.map((elem, i) =>
							<div className={`passengers__container-item${i === departure.seats.length - 1 ? '' : '-border'}`} key={i}>
								<div className='passenger__container-avatar'>
									<span className='passenger__container-img'></span>
									<p className='passenger__container-ages'>{elem.person_info.is_adult ? 'Взрослый' : 'Ребенок'}</p>
								</div>
								<div className='passenger__container-data'>
									<p className='passenger__container-name'>{`${elem.person_info.last_name} ${elem.person_info.first_name} ${elem.person_info.patronymic}`}</p>
									<p className='passenger__container-gender'>{`Пол ${elem.person_info.gender ? 'мужской' : 'женский'}`}</p>
									<p className='passenger__container-birth'>{`Дата рождения ${elem.person_info.birthday}`}</p>
									<p className='passenger__container-docs'>{`${elem.person_info.document_type} ${elem.person_info.document_data}`}</p>
								</div>
							</div>
						)}
					</div>

					<div className='passenger__container-change'>
						<div className='passenger__container-total'>
							<p>Всего</p>
							<div className='passenger__container-price'>
								<p>{formattedPrice}</p>
								<span className='details__total-currency-symbol'></span>
							</div>
						</div>
						<button className='passenger__container-btn' onClick={changePassengers}>Изменить</button>
					</div>
				</div>
			</div>

			<div className='order__payment'>
				<h2 className='order__payment-title'>Способ оплаты</h2>
				<div className='order__payment-method'>
					<p className='order__payment-text'>{user.payment_method}</p>
					<button className='order__payment-btn' type='button' onClick={changePayment}>Изменить</button>
				</div>
			</div>

			<button className='order__btn' type='button' onClick={confirmOrder}>подтвердить</button>
		</div>
	);
};