import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { sliceBarProgressState } from '../../store/sliceBarProgress';
import './bar-progress.css';

type Step = {
	one: string,
	two: string,
	three: string,
	four: string
};

export const BarProgress = () => {
	const { stepOne, stepTwo, stepThree, stepFour } = useAppSelector(sliceBarProgressState);
	const [step, setStep] = useState<Step>({
		one: '',
		two: '',
		three: '',
		four: ''
	});

	useEffect(() => {
		setStep({
			one: stepOne ? 'current__step' : '',
			two: stepTwo ? 'current__step' : '',
			three: stepThree ? 'current__step' : '',
			four: stepFour ? 'current__step' : ''
		});
	}, [stepOne, stepTwo, stepThree, stepFour]);

	const calculateArrowWidth = () => {
		if (stepFour) {
			return '115%';
		} else if (stepThree) {
			return '74%';
		} else if (stepTwo) {
			return '49%';
		} else {
			return '24%'; // Исходная ширина для первого шага
		}
	};

	const arrowWidth = calculateArrowWidth();

	return (
		<div className="bar__progress-section">
			<div className="bar__progress-wrap">
				<div className={"start__steps " + step.one}></div>

				<div className="arrow" style={{ width: arrowWidth }}></div>

				<div className={"progress__step-one " + step.one}>
					<div className={"step__number " + step.one}>
						<p>1</p>
					</div>
					<div className={"step__desc " + step.one}>Билеты</div>
					<div className="step__arrow ">
						<div className={"arrow__top " + step.one}></div>
						<div className={"arrow__bottom " + step.one}></div>
					</div>
				</div>

				<div className={"progress__step-two " + step.two}>
					<div className={"step__number " + step.two}>
						<p>2</p>
					</div>
					<div className={"step__desc " + step.two}>Пассажиры</div>
					<div className="step__arrow ">
						<div className={"arrow__top " + step.two}></div>
						<div className={"arrow__bottom " + step.two}></div>
					</div>
				</div>

				<div className={"progress__step-three " + step.three}>
					<div className={"step__number " + step.three}>
						<p>3</p>
					</div>
					<div className={"step__desc " + step.three}>Оплата</div>
					<div className="step__arrow ">
						<div className={"arrow__top " + step.three}></div>
						<div className={"arrow__bottom " + step.three}></div>
					</div>
				</div>

				<div className={"progress__step-four " + step.four}>
					<div className={"step__number " + step.four}>
						<p>4</p>
					</div>
					<div className={"step__desc " + step.four}>Проверка</div>
				</div>
				<div className={"end__steps " + step.four}></div>
			</div>
		</div>
	);
};