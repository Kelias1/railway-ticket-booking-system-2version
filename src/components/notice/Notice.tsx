import { MutableRefObject, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeNotice, sliceNoticeState } from '../../store/sliceNotice';
import './notice.css';

type Props = {
	status: boolean
};

export const Notice = ({ status }: Props) => {
	const dispatch = useAppDispatch();
	const { notice, text } = useAppSelector(sliceNoticeState);
	const ref: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

	useEffect(() => {
		if (notice) {
			ref.current = setTimeout(() => dispatch(changeNotice({
				notice: false,
				text: ''
			})), 5 * 1000);
		};
		if (ref.current) {
			return clearTimeout(ref.current)
		};
	}, [dispatch, notice]);

	return (
		<div className={notice ? 'modal__tickets' : 'hide-section'}>
			<div className={status ? 'modal__img-ok' : 'modal-img'}></div>
			<p className='modal__text'>{text}</p>
			<button className='modal__btn' onClick={() => dispatch(changeNotice({
				notice: false,
				text: ''
			}))} type='button'>Понятно</button>
		</div>
	);
};