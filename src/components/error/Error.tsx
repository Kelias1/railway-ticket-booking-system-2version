import './error.css';

type Props = {
	classStyle: string
};

export const Error = ({ classStyle }: Props) => {
	return (
		<div className={classStyle}>
			<p>Введите пункты направления!</p>
		</div>
	);
};