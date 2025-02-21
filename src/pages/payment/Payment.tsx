import { ChangeEvent, useState } from 'react'
import { useEffect } from 'react';
import { currentStepThree } from '../../store/sliceBarProgress';
import { validateEmail, validateName, validatePhoneNumber } from '../../utils/validators';
import { changeNotice } from '../../store/sliceNotice';
import { useNavigate } from 'react-router-dom';
import { addUserPayment } from '../../store/sliceOrder';
import { useAppDispatch } from '../../store/hooks';
import './payment.css';

type InputState = {
	name: string,
	patronymic: string,
	surname: string,
	phone: string,
	email: string
};

export const Payment = () => {
	const dispatch = useAppDispatch();
	const [method, setMethod] = useState<boolean>(false);
	const [ok, setOk] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<InputState>({
		name: '',
		patronymic: '',
		surname: '',
		phone: '',
		email: ''
	});
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(currentStepThree());
	}, [dispatch]);

	useEffect(() => {
		if (
			validateName(inputValue.name) &&
			validateName(inputValue.patronymic) &&
			validateName(inputValue.surname) &&
			validatePhoneNumber(inputValue.phone) &&
			validateEmail(inputValue.email)) {
			setOk(true);
		} else {
			setOk(false);
		};
	}, [inputValue]);

	function inputFirstName(event: ChangeEvent<HTMLInputElement>) {
		setInputValue({ ...inputValue, name: event.target.value });
	};

	function blurFirstName() {
		if (!validateName(inputValue.name)) {
			dispatch(changeNotice({
				notice: true,
				text: 'Имя указано некорректно.\n Пример: Алексей'
			}));
		};
	};

	function inputSecondName(event: ChangeEvent<HTMLInputElement>) {
		setInputValue({ ...inputValue, patronymic: event.target.value });
	};

	function blurSecondName() {
		if (!validateName(inputValue.patronymic)) {
			dispatch(changeNotice({
				notice: true,
				text: 'Отчество указано некорректно.\n Пример: Алексевич'
			}));
		};
	};

	function inputSurName(event: ChangeEvent<HTMLInputElement>) {
		setInputValue({ ...inputValue, surname: event.target.value });
	};

	function blurSurName() {
		if (!validateName(inputValue.surname)) {
			dispatch(changeNotice({
				notice: true,
				text: 'Фамилия указана некорректно.\n Пример: Алексеев'
			}));
		};
	};

	function inputPhone(event: ChangeEvent<HTMLInputElement>) {
		setInputValue({ ...inputValue, phone: event.target.value });
	};

	function blurPhone() {
		if (!validatePhoneNumber(inputValue.phone)) {
			dispatch(changeNotice({
				notice: true,
				text: 'Номер телефона указан некорректно.\n Пример: 89061230987'
			}));
		} else {
			setInputValue({ ...inputValue, phone: validatePhoneNumber(inputValue.phone) });
		};
	};

	function inputEmail(event: ChangeEvent<HTMLInputElement>) {
		setInputValue({ ...inputValue, email: event.target.value });
	};

	function blurEmail() {
		if (!validateEmail(inputValue.email)) {
			dispatch(changeNotice({
				notice: true,
				text: 'Email указана некорректно.\n Пример: mailbox@mail.com'
			}));
		};
	};

	function nextStep() {
		navigate('/ticket/order');
		dispatch(addUserPayment({
			first_name: inputValue.name,
			last_name: inputValue.surname,
			patronymic: inputValue.patronymic,
			phone: inputValue.phone,
			email: inputValue.email,
			payment_method: method ? 'Онлайн' : 'Наличными'
		}));
	};

	return (
		<form className='form__payment'>
			<div className='payment'>
				<div className='payment__data'>
					<div className='data__head'>
						<h2 className='data__title'>Персональные данные</h2>
					</div>

					<div className='data__inputs-names'>
						<label className='data__name-label'>
							<p>Фамилия</p>
							<input
								className='data__name-input'
								type="text"
								required
								value={inputValue.surname}
								onChange={inputSurName}
								onBlur={blurSurName}
							/>
						</label>
						<label className='data__name-label'>
							<p>Имя</p>
							<input
								className='data__name-input'
								type="text"
								required
								value={inputValue.name}
								onChange={inputFirstName}
								onBlur={blurFirstName}
							/>
						</label>
						<label className='data__name-label'>
							<p>Отчество</p>
							<input
								className='data__name-input'
								type="text"
								required
								value={inputValue.patronymic}
								onChange={inputSecondName}
								onBlur={blurSecondName}
							/>
						</label>
					</div>

					<div className='data__inputs-phone'>
						<label className='data__phone-label'>
							<p>Контактный телефон</p>
							<input
								className='data__phone-input'
								type="tel"
								required
								placeholder='+7 ___ ___ __ __'
								value={inputValue.phone}
								onChange={inputPhone}
								onBlur={blurPhone}
							/>
						</label>
					</div>

					<div className='data__inputs-mail'>
						<label className='data__mail-label'>
							<p>E-mail</p>
							<input
								className='data__mail-input'
								type="email"
								required
								value={inputValue.email}
								onChange={inputEmail}
								onBlur={blurEmail}
							/>
						</label>
					</div>
				</div>

				<div className='payment__method'>
					<div className='method__head'>
						<h2 className='method__title'>Способ оплаты</h2>
					</div>

					<div className='method__check-online'>
						<div className={!method ? 'method__check-input' : 'method__check-input-ok'} onClick={() => setMethod(!method)}></div>
						<p className={!method ? 'method__check-text' : 'method__check-text-ok'}>Онлайн</p>
					</div>

					<div className='methods__payment'>
						<div className='methods__payment-text'>
							<p>Банковской <br /> картой</p>
							<p className='paypal'>PayPal</p>
							<p className='visa-qiwi'>Visa QIWI Wallet</p>
						</div>
					</div>

					<div className='method__check-cash'>
						<div className={method ? 'method__check-input' : 'method__check-input-ok'} onClick={() => setMethod(!method)}></div>
						<p className={method ? 'method__check-text' : 'method__check-text-ok'}>Наличными</p>
					</div>
				</div>

			</div>
			<button className={ok ? 'payment__button-ok' : 'payment__button'} disabled={!ok} type='button' onClick={nextStep}>купить билеты</button>
		</form>
	)
};