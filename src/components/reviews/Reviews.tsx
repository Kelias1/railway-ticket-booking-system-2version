import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { reviews } from '../../utils/reviews';
import './reviews.css';

export const Reviews = () => {
	const length = -718;
	const dotsArray = [...reviews];
	dotsArray.splice(0, 2);
	const element = useRef<HTMLDivElement>(null);
	const [num, setNum] = useState<number>(0);
	const [translate, setTranslate] = useState<number>(0);
	const [view, setView] = useState<number>(window.scrollY);

	function counter(arg: number): void {
		if (element.current) {
			for (const item of element.current.children) {
				item.classList.remove('active__dot');
			};

			if (num === dotsArray.length) {
				element.current.children[0].classList.add('active__dot');
				setTranslate(0);
				setNum(0);
			} else {
				element.current.children[arg + 1].classList.toggle('active__dot');
				setTranslate(length * (arg + 1));
				setNum(arg + 1);
			};
		};
	};

	useEffect(() => {
		const interval = setInterval(() => setView(window.scrollY), 1000);
		return () => clearInterval(interval);
	});

	useEffect(() => {
		const carouselInterval = setTimeout(() => {
			if (view >= 2100 && view <= 2400) {
				counter(num);
			};
		}, 2 * 1000);
		return () => clearTimeout(carouselInterval);
	});

	function changeReview(ev: BaseSyntheticEvent): void {
		if (element.current) {
			const div = ev.target;
			let count = 0;
			for (const item of element.current.children) {
				item.classList.remove('active__dot');
				if (div.classList.contains(`dot__${count}`)) {
					setTranslate(length * (count + 1));
				};
				count += 1;
			};

			div.classList.toggle('active__dot');
			if (div.classList.contains('dot')) {
				setTranslate(0);
			};
		};
	};

	return (
		<section id="reviews" className="main__reviews">
			<h2 className="reviews__title">отзывы</h2>
			<div className="reviews-container">
				<div className="reviews__carousel" style={{ transform: `translateX(${translate}px)` }}>

					{reviews.map((elem, i) => (
						<div className="review" key={elem.name + i}>
							<img className="review__image" src={elem.image} alt={elem.name} />
							<div className="review__wrap">
								<span className="review__name">{elem.name}</span>
								<p className="review__text"
									dangerouslySetInnerHTML={{ __html: elem.content }}
								/>
							</div>
						</div>
					))}

				</div>
			</div>
			<div className="carousel__dots" ref={element}>
				<div className="carousel__dot dot active__dot" onClick={changeReview}></div>
				{dotsArray.map((_elem, i) =>
					<div className={`carousel__dot dot__${i}`} onClick={changeReview} key={`dot__${i}`}></div>
				)}
			</div>
		</section>
	)
};