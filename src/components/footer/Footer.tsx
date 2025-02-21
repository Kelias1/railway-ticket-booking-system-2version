import { ChangeEvent, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Notice } from '../notice/Notice';
import { validateEmail } from '../../utils/validators';
import { changeNotice } from '../../store/sliceNotice';
import { clearStatusSubscribe, postSubscribeThunk, slicePostSubscribeState } from '../../store/slicePostSubscribe';
import './footer.css';

export const Footer = () => {
	const [input, setInput] = useState<string>('');
	const { status } = useAppSelector(slicePostSubscribeState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status) {
			dispatch(changeNotice({ notice: true, text: 'Подписка успешно оформлена!' }));
			setInput('');
			setTimeout(() => dispatch(clearStatusSubscribe()), 5 * 1000);
		};
	}, [dispatch, status]);

	function inputSubscribe(event: ChangeEvent<HTMLInputElement>) {
		setInput(event.target.value);
	};

	function submit() {
		if (!validateEmail(input)) {
			dispatch(changeNotice({ notice: true, text: 'Email указана некорректно.\n Пример: mailbox@mail.com' }));
		} else {
			dispatch(postSubscribeThunk(input));
		};
	};

	return (
		<div className="container">
			<footer id="footer" className="footer">
				<Notice status={status} />
				<div className="footer__content">
					<div className="footer__contacts">
						<h2 className="contacts__title">Свяжитесь с нами</h2>
						<address className="contacts__wrap">
							<a href="tel:88000000000" className="contacts__item tel">8 (800) 000 00 00
							</a>
							<a href="mailto:inbox@mail.ru" className="contacts__item email">inbox@mail.ru
							</a>
							<a href="tu.train.tickets" className="contacts__item skype" target="_blank">tu.train.tickets
							</a>
							<a href="google.maps.com" className="contacts__item address" target="_blank">г. Москва <br />ул. Московская 27-35 <br /> 555 555
							</a>
						</address>
					</div>
					<div className="footer__subscribe">
						<h2 className="subscribe__title">Подписка</h2>
						<form className="subscribe__form">
							<p className="subscribe__form-title">Будьте в курсе событий</p>
							<input
								className="subscribe__form-input"
								type="text"
								placeholder="e-mail"
								value={input}
								onChange={inputSubscribe}
							/>
							<button className="subscribe__form-btn" type="button" onClick={submit}>отправить</button>
						</form>
						<div className="subscribe__socials-wrap">
							<span className="subscribe__socials-title">Подписывайтесь на нас</span>
							<ul className="subscribe__socials-list">
								<li>
									<a href="https://www.youtube.com/" className="subscribe__social-item social__youtube" target="_blank">
										<span className="visually-hidden">youtube</span>
									</a>
								</li>
								<li>
									<a href="https://www.linkedin.com/" className="subscribe__social-item social__linkedin" target="_blank">
										<span className="visually-hidden">linkedin</span>
									</a>
								</li>
								<li>
									<a href="https://www.google.com/" className="subscribe__social-item social__google" target="_blank">
										<span className="visually-hidden">google+</span>
									</a>
								</li>
								<li>
									<a href="https://www.facebook.com/" className="subscribe__social-item social__facebook" target="_blank">
										<span className="visually-hidden">facebook</span>
									</a>
								</li>
								<li>
									<a href="https://x.com/" className="subscribe__social-item social__X" target="_blank">
										<span className="visually-hidden">X</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="footer__line">
					<span className="footer__logo">Лого</span>
					<HashLink to="#top" className="footer__btn-up" />
					<p className="footer__copyright">2025 web</p>
				</div>
			</footer>
		</div>
	);
};