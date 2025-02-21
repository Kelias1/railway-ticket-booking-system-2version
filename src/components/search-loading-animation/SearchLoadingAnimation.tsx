import { MutableRefObject, useEffect, useRef, useState } from 'react';
import './search-loading-animation.css';
import loadingGif from '../../assets/images/loading.gif';

export const SearchLoadingAnimation = () => {
	const [line, setLine] = useState<number>(0);
	const ref: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

	useEffect(() => {
		ref.current = setTimeout(() => {
			if (line <= 99) {
				setLine((prev) => prev + 1);
			}
		}, 20);

		if (ref.current) {
			return clearTimeout(ref.current);
		}
	}, [line]);

	return (
		<div className='search__loading'>
			<h2 className='search__loading-text'>
				идет поиск
			</h2>
			<div className='search__loading-line' style={{ width: `${line}%` }}></div>
			<img className='search__loading-gif' src={loadingGif} alt="Loading" />
		</div>
	);
};