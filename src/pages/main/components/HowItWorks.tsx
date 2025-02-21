import '../main.css';

export const HowItWorks = () => {
	return (
		<section id="howItWorks" className="main__how-it-works">
			<div className="how-it-works__header">
				<h2 className="how-it-works__title">как это работает</h2>
				<button type="button" className="how-it-works__btn">Узнать больше</button>
			</div>
			<div className="how-it-works__items">
				<div className="how-it-works__item">
					<div className="how-it-works__first-img"></div>
					<p className="how-it-works__desc">Удобный заказ <br /> на сайте</p>
				</div>
				<div className="how-it-works__item">
					<div className="how-it-works__second-img"></div>
					<p className="how-it-works__desc">Нет необходимости ехать в офис</p>
				</div>
				<div className="how-it-works__item">
					<div className="how-it-works__third-img"></div>
					<p className="how-it-works__desc">Огромный выбор направлений</p>
				</div>
			</div>
		</section>
	)
};