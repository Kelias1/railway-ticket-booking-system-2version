import { useAppSelector } from '../../store/hooks';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceGetRouteState } from '../../store/sliceGetTrainList';
import { sliceGetSeatsState } from '../../store/sliceGetSeats';
import { slicePostOrderState } from '../../store/slicePostOrder';
import { TripDetails } from '../../components/trip-details/TripDetails';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterTicket } from '../../components/filter-ticket/FilterTicket';
import { LastTickets } from '../../components/last-tickets/LastTickets';
import { SearchLoadingAnimation } from '../../components/search-loading-animation/SearchLoadingAnimation';
import { Outlet } from 'react-router-dom';
import './choose-ticket.css';

export const ChooseTicket = () => {
	const { loading: routeLoading } = useAppSelector(sliceGetRouteState);
	const { loading: seatsLoading } = useAppSelector(sliceGetSeatsState);
	const { route } = useAppSelector(sliceChoiceState);
	const { loading: postLoading } = useAppSelector(slicePostOrderState);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!route && location.pathname === '/ticket/wagon') {
			navigate('/ticket');
		};
	}, [location.pathname, navigate, route]);

	if (routeLoading || seatsLoading || postLoading) {
		return <SearchLoadingAnimation />
	};

	return (
		<div className='container'>
			<div className='main-sidebar container__main__sidebar'>
				<section className='sidebar__section'>
					<h2 className='visually-hidden'>Sidebar</h2>
					{location.pathname === '/ticket/passengers' ||
						location.pathname === '/ticket/payment' ||
						location.pathname === '/ticket/order' ? <TripDetails /> :
						<>
							<FilterTicket />
							<LastTickets />
						</>
					}
				</section>
				<main className='main__choice-train'>
					<Outlet />
				</main>
			</div>
		</div>
	);
};