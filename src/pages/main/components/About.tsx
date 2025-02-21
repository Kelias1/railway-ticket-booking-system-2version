import '../main.css';

export const About = () => {
	return (
		<section id="about" className="main__about">
			<h2 className="about__title">о нас</h2>
			<div className="about__container">
				<div className="about__line"></div>
				<div className="about__desc-wrap">
					<p className="about__desc">Мы&nbsp;рады видеть вас! Мы&nbsp;рботаем для Вас с&nbsp;2003&nbsp;года.&nbsp;14&nbsp;лет мы&nbsp;наблюдаем, как с&nbsp;каждым днем <br /> все больше людей заказывают жд&nbsp;билеты через интернет.</p>
					<p className="about__desc">Сегодня можно заказать железнодорожные билеты онлайн всего в&nbsp;2&nbsp;клика, но&nbsp;стоит&nbsp;ли это делать?
						Мы&nbsp;расскажем о&nbsp;преимуществах заказа через интернет.</p>
					<p className="about__desc"><span>Покупать жд&nbsp;билеты дешево можно за&nbsp;90&nbsp;суток до&nbsp;отправления поезда. <br /> Благодаря динамическому ценообразованию цена на&nbsp;билеты в&nbsp;это время самая низкая.</span></p>
				</div>
			</div>
		</section>
	)
};