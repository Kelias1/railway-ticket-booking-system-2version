import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import { ISeat } from '../../../models/interfaces';
import { StateAgePassenger } from '../../../models/index';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addSeatPassenger, removeSeatPassenger } from '../../../store/sliceOrder';
import { upperCaseBirthNumber, validateBirthNumber, validateDate, validationFormatDate, validateName, validatePassportNumber, validatePassportSeries } from '../../../utils/validators';
import { slicePriceState } from '../../../store/slicePrice';
import '../passengers-list.css';

type Props = {
	addPassenger: () => void,
	num: number,
	agesPassengers: StateAgePassenger
}

export const Passenger = ({ addPassenger, num, agesPassengers }: Props) => {
	const { totalSeatsNumber, seatsChildWithout } = useAppSelector(slicePriceState);
	const [none, setNone] = useState({
		main: true,
		age: 'hide-section',
		docs: 'hide-section',
		valid: false,
		ok: false
	});
	const [select, setSelect] = useState({ age: 'Взрослый', docs: 'Паспорт РФ', typeDoc: '' });
	const [gender, setGender] = useState<boolean>(false);
	const [limited, setLimited] = useState<boolean>(false);
	const [dateValue, setDateValue] = useState<string>('');
	const [nameValue, setNameValue] = useState({ name: '', patronymic: '', surname: '' });
	const [docsValue, setDocsValue] = useState({ passportSeries: '', passportNumber: '', birthNumber: '' });
	const [validText, setValidText] = useState<string>('');
	const [button, setButton] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	function inputPassportSeries(event: ChangeEvent<HTMLInputElement>) {
		setDocsValue({ ...docsValue, passportSeries: event.target.value });
	};

	function blurPassportSeries() {
		if (!validatePassportSeries(docsValue.passportSeries)) {
			setNone({ ...none, valid: true });
			setValidText(`Серия паспорта указана некорректно\n Пример: 1234`);
		};
	};

	function inputPassportNumber(event: ChangeEvent<HTMLInputElement>) {
		setDocsValue({ ...docsValue, passportNumber: event.target.value });
	};

	function blurPassportNumber() {
		if (!validatePassportNumber(docsValue.passportNumber)) {
			setNone({ ...none, valid: true });
			setValidText('Номер паспорта указан некорректно\n Пример: 034678');
		};
	};

	function inputBirthNumber(event: ChangeEvent<HTMLInputElement>) {
		setDocsValue({ ...docsValue, birthNumber: event.target.value });
	};

	function blurBirthNumber() {
		if (!validateBirthNumber(docsValue.birthNumber)) {
			setNone({ ...none, valid: true });
			setValidText('Номер свидетельства о рожденни указан некорректно\n Пример: VIII-ЫП-123456');
		};
	};

	function inputFirstName(event: ChangeEvent<HTMLInputElement>) {
		setNameValue({ ...nameValue, name: event.target.value });
	};

	function blurFirstName() {
		if (!validateName(nameValue.name)) {
			setNone({ ...none, valid: true });
			setValidText('Имя указано некорректно\n Пример: Петр');
		};
	};

	function inputSecondName(event: ChangeEvent<HTMLInputElement>) {
		setNameValue({ ...nameValue, patronymic: event.target.value });
	};

	function blurSecondName() {
		if (!validateName(nameValue.patronymic)) {
			setNone({ ...none, valid: true });
			setValidText('Отчество указано некорректно\n Пример: Петрович');
		};
	};

	function inputSurName(event: ChangeEvent<HTMLInputElement>) {
		setNameValue({ ...nameValue, surname: event.target.value });
	};

	function blurSurName() {
		if (!validateName(nameValue.surname)) {
			setNone({ ...none, valid: true });
			setValidText('Фамилия указана некорректно\n Пример: Петров');
		};
	};

	function inputDate(event: ChangeEvent<HTMLInputElement>) {
		const formattedValue = validationFormatDate(event.target.value);
		setDateValue(formattedValue);
	}

	function blurDate() {
		if (!validateDate(dateValue)) {
			setNone({ ...none, valid: true });
			setValidText('Дата рождения указана некорректно\n Пример: 25.07.1992');
		}
	}

	useEffect(() => {
		if (none.valid) {
			setTimeout(() => setNone({ ...none, valid: false }), 5 * 1000);
		};
	}, [none]);

	function getSortAge() {
		if (none.age === 'hide-section') {
			setNone({ ...none, age: 'list__age-select' });
		} else {
			setNone({ ...none, age: 'hide-section' });
		}
	};

	function getSelectAge(event: SyntheticEvent<HTMLDivElement>) {
		if (agesPassengers.age > 0 && agesPassengers.child > 0) {
			setSelect({ ...select, age: event.currentTarget.outerText });
		};

		if (agesPassengers.age === 0 && agesPassengers.child > 0) {
			setSelect({ ...select, age: 'Детский' });
		};

		if (agesPassengers.age > 0 && agesPassengers.child === 0) {
			setSelect({ ...select, age: 'Взрослый' });
		};

		setNone({ ...none, age: 'hide-section' });
	};

	function getSortDocs() {
		if (none.docs === 'hide-section') {
			if (select.docs === 'Свидетельство о рождении') {
				setNone({ ...none, docs: 'list__docs-select-long' });
			} else {
				setNone({ ...none, docs: 'list__docs-select' });
			};
		} else {
			setNone({ ...none, docs: 'hide-section' });
		}
	};

	function getSelectDocs(event: SyntheticEvent<HTMLDivElement>) {
		setSelect({ ...select, docs: event.currentTarget.outerText });
		setNone({ ...none, docs: 'hide-section' });
	};

	function addPassengerToStore() {
		const seats: ISeat = {
			coach_id: totalSeatsNumber[num - 1].idCoach,
			person_info: {
				is_adult: select.age === 'Взрослый' ? true : false,
				first_name: nameValue.name,
				last_name: nameValue.surname,
				patronymic: nameValue.patronymic,
				gender: gender,
				birthday: dateValue,
				document_type: select.docs,
				document_data: `${select.docs === 'Паспорт РФ' ? `${docsValue.passportSeries} ${docsValue.passportNumber}` : upperCaseBirthNumber(docsValue.birthNumber)}`
			},
			seat_number: totalSeatsNumber[num - 1].number,
			is_child: seatsChildWithout > 0 ? true : false,
			include_children_seat: seatsChildWithout > 0 ? true : false
		}
		dispatch(addSeatPassenger(seats));
		setButton(true);
	};

	function nextPassenger() {
		if (nameValue.name !== '' && nameValue.patronymic !== '' && nameValue.surname !== '') {
			if (dateValue !== '' && ((docsValue.passportNumber !== '' && docsValue.passportSeries !== '') || docsValue.birthNumber !== '')) {
				if (!none.valid) {
					setNone({ ...none, ok: true });
					addPassenger();
					addPassengerToStore();
				} else {
					setNone({ ...none, valid: true });
					setValidText('Заполните все поля!');
				};
			} else {
				setNone({ ...none, valid: true });
				setValidText('Заполните все поля!');
			};
		} else {
			setNone({ ...none, valid: true });
			setValidText('Заполните все поля!');
		};
	};

	function deletePassenger() {
		dispatch(removeSeatPassenger(num.toString()));
		setButton(false);
		setNone({ ...none, ok: false });
		setGender(false);
		setLimited(false);
		setDateValue('');
		setNameValue({ name: '', patronymic: '', surname: '' });
		setDocsValue({ passportSeries: '', passportNumber: '', birthNumber: '' });
	};

	return (
		<div className='passenger'>
			<header className={none.main ? 'passenger__header' : 'passenger__header-plus'}>
				<span className={none.main ? 'passenger__header-up' : 'passenger__header-down'} onClick={() => setNone({ ...none, main: !none.main })}></span>
				<h2 className='passenger__header-title'>Пассажир {num}</h2>
				<span className={none.main ? 'passenger__header-close' : 'hide-section'} onClick={deletePassenger}></span>
			</header>

			<div className={none.main ? 'passenger__main' : 'hide-section'}>
				<div className='passenger__choice-age'>
					<div className='passenger__select'
						onClick={getSortAge}>
						{select.age}</div>
					<div className={none.age}>
						<div className={agesPassengers.age > 0 ? 'select__adult' : 'select__adult-disable'} onClick={getSelectAge}>Взрослый</div>
						<div className={agesPassengers.child > 0 ? 'select__child' : 'select__child-disable'} onClick={getSelectAge}>Детский</div>
					</div>
				</div>

				<div className='passenger__form-names'>
					<label className='passenger__name-label'
						htmlFor="">
						<p>Фамилия</p>
						<input
							className='passenger__name-input'
							type="text"
							required
							value={nameValue.surname}
							onChange={inputSurName}
							onBlur={blurSurName}
						/>
					</label>
					<label className='passenger__name-label'
						htmlFor="">
						<p>Имя</p>
						<input
							className='passenger__name-input'
							type="text"
							required
							value={nameValue.name}
							onChange={inputFirstName}
							onBlur={blurFirstName}
						/>
					</label>
					<label className='passenger__name-label'
						htmlFor="">
						<p>Отчество</p>
						<input
							className='passenger__name-input'
							type="text"
							required
							value={nameValue.patronymic}
							onChange={inputSecondName}
							onBlur={blurSecondName}
						/>
					</label>
				</div>

				<div className='passenger__form-birth'>
					<div className='passenger__choice-gender'>
						<p className='choice__gender-text'>Пол</p>
						<div className='choice__gender'>
							<p className={gender ? 'gender__choice-color' : 'passenger__gender'} onClick={() => setGender(!gender)}>м</p>
							<p className={gender ? 'passenger__gender' : 'gender__choice-color'} onClick={() => setGender(!gender)}>ж</p>
						</div>
					</div>
					<div className='passenger__birth-date'>
						<label className='passenger__birth-label'
							htmlFor="">
							<p>Дата рождения</p>
							<input
								className='passenger__birth-input'
								type="text"
								placeholder='ДД.ММ.ГГ'
								required
								value={dateValue}
								onChange={inputDate}
								onBlur={blurDate}
							/>
						</label>
					</div>
				</div>

				<div className='passenger__form-check'>
					<div className={!limited ? 'passenger__check-input' : 'passenger__check-input-ok'} onClick={() => setLimited(!limited)}></div>
					<p className='passenger__check-text'>ограниченная подвижность</p>
				</div>

				<div className='passenger__form-docs'>
					<div className='passenger__docs-select'>
						<p>Тип документа</p>
						<div className='select__docs' onClick={getSortDocs}>{select.docs}</div>
						<div className={none.docs}>
							<div className='select__doc-passport'
								onClick={getSelectDocs}>Паспорт РФ</div>
							<div className='select__doc-birth' onClick={getSelectDocs}>Свидетельство о рождении</div>
						</div>
					</div>

					{select.docs === 'Паспорт РФ' ?
						<>
							<div className='passenger__docs-series'>
								<label className='docs__series-label'
									htmlFor="">
									<p>Серия</p>
									<input
										className='docs__series-input'
										type="text"
										required
										placeholder='__  __  __  __'
										value={docsValue.passportSeries}
										onChange={inputPassportSeries}
										onBlur={blurPassportSeries}
									/>
								</label>
							</div>
							<div className='passenger__docs-number'>
								<label className='docs__number-label'
									htmlFor="">
									<p>Номер</p>
									<input
										className='docs__number-input'
										type="text"
										required
										placeholder='__  __  __  __  __  __'
										value={docsValue.passportNumber}
										onChange={inputPassportNumber}
										onBlur={blurPassportNumber}
									/>
								</label>
							</div>
						</> :
						<>
							<div className='passenger__docs-birth'>
								<label className='docs__birth-label'
									htmlFor="">
									<p>Номер</p>
									<input
										className='docs__birth-input'
										type="text"
										required
										placeholder='_ _ _ _ _ _ _ _ _ _ _ _'
										value={docsValue.birthNumber}
										onChange={inputBirthNumber}
										onBlur={blurBirthNumber}
									/>
								</label>
							</div>
						</>}
				</div>

				<div className={none.ok ? 'passenger__footer-ok' : 'passenger__footer'}>
					<span className={none.ok ? 'passenger__valid-ok' : 'hide-section'}></span>
					<p className={none.ok ? 'passenger__valid-text-ok' : 'hide-section'}>Готово</p>
					<button className={!none.valid ? 'passenger__button' : 'hide-section'} type='button' disabled={button}
						onClick={nextPassenger}>{!button && num === 1 ? 'Продолжить' : 'Следующий пассажир'}</button>
					<div className={none.valid ? 'passenger__valid' : 'hide-section'}>
						<span className='passenger__valid-close' onClick={() => setNone({ ...none, valid: false })}></span>
						<p className='passenger__valid-text'>{validText}</p>
					</div>
				</div>
			</div>
		</div>
	)
};