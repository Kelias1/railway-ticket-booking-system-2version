import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAllCity } from '../../store/sliceChoice';
import { clearAllFiltering } from '../../store/sliceFilter';
import { clearRouteList } from '../../store/sliceGetTrainList';
import { clearOrder, sliceOrderState } from '../../store/sliceOrder';
import { clearAllPrices, clearTotalPrice, slicePriceState } from '../../store/slicePrice';
import { clearStepAll } from '../../store/sliceBarProgress';
import './order-complete.css';

type Stars = {
	one: string,
	two: string,
	three: string,
	four: string,
	five: string
};

export const OrderComplete = () => {
	const [star, setStar] = useState<Stars>({
		one: '',
		two: '',
		three: '',
		four: '',
		five: ''
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { totalPriceAll } = useAppSelector(slicePriceState);
	const { user } = useAppSelector(sliceOrderState);

	const formattedPrice = String(totalPriceAll).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); //Разделение тысяч в числах пробелом

	function checkOne() {
		setStar({
			one: '-check',
			two: '',
			three: '',
			four: '',
			five: ''
		});
	};

	function checkTwo() {
		setStar({
			one: '-check',
			two: '-check',
			three: '',
			four: '',
			five: ''
		});
	};

	function checkThree() {
		setStar({
			one: '-check',
			two: '-check',
			three: '-check',
			four: '',
			five: ''
		});
	};

	function checkFour() {
		setStar({
			one: '-check',
			two: '-check',
			three: '-check',
			four: '-check',
			five: ''
		});
	};

	function checkFive() {
		setStar({
			one: '-check',
			two: '-check',
			three: '-check',
			four: '-check',
			five: '-check'
		});
	};

	function backToMain() {
		navigate('/');
		dispatch(clearAllPrices());
		dispatch(clearTotalPrice());
		dispatch(clearAllFiltering());
		dispatch(clearRouteList());
		dispatch(clearAllCity());
		dispatch(clearStepAll());
		dispatch(clearOrder());
	};

	return (
		<div className='container'>
			<div className='order-complete__container'>
				<h1 className='order-complete__title'>Благодарим Вас за заказ!</h1>

				<div className='order-complete'>
					<div className='order-complete__number-price'>
						<h3 className='order__number'>№Заказа 285АА</h3>
						<div className='order__price'>
							<p className='order__price-text'>сумма</p>
							<div className='order__price-number'>
								<p>{formattedPrice}</p>
								<span className='order__currency-symbol'></span>
							</div>
						</div>
					</div>

					<div className='order__info-wrap'>
						<div className='order__info'>
							<div className='order__info-email'>
								<div className='info__email-img'></div>
								<p className='order__info-text'>билеты будут<br /> отправлены <br />на ваш <b>e-mail</b></p>
							</div>

							<div className='order__info-print'>
								<div className='info__print-img'></div>
								<p className='order__info-text'><b>распечатайте</b><br /> и сохраняйте билеты <br /> до даты поездки</p>
							</div>

							<div className='order__info-present'>
								<div className='info__present-img'></div>
								<p className='order__info-text'><b>предьявите</b><br /> распечатанные <br /> билеты при посадке</p>
							</div>
						</div>
					</div>

					<div className='order__name-wrap'>
						<p className='order__name'>{`${user.first_name} ${user.patronymic}`}</p>
						<p className='order__name-text'>Ваш заказ успешно оформлен.<br /> В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
						<p className='order__thankfulness'>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
					</div>

					<div className='order__rating-wrap'>
						<div className='order__rating'>
							<p className='order__rating-text'>Оценить сервис</p>
							<div className='order__rating-stars'>
								<span className={`star__one${star.one}`} onClick={checkOne}>
									<svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
										<path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
									</svg>
								</span>
								<span className={`star__two${star.two}`} onClick={checkTwo}>
									<svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
										<path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
									</svg>
								</span>
								<span className={`star__three${star.three}`} onClick={checkThree}>
									<svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
										<path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
									</svg>
								</span>
								<span className={`star__four${star.four}`} onClick={checkFour}>
									<svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
										<path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
									</svg>
								</span>
								<span className={`star__five${star.five}`} onClick={checkFive}>
									<svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
										<path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
									</svg>
								</span>
							</div>
						</div>
						<button className='order-complete__btn' type='button' onClick={backToMain}>вернуться на главную</button>
					</div>

				</div>
			</div>
		</div>
	);
};