import { Route, Routes, Navigate } from 'react-router-dom';
import { HeaderAndFooter } from '../pages/HeaderAndFooter';
import Main from '../pages/main/Main';
import { ChooseTicket } from '../pages/choose-ticket/ChooseTicket';
import { TrainList } from '../pages/train-list/TrainList';
import { ListWagons } from '../pages/seat-selection/ListWagons';
import { PassengersList } from '../pages/passengers-list/PassengersList';
import { Payment } from '../pages/payment/Payment';
import { Order } from '../pages/order-confirmation/Order';
import { OrderComplete } from '../pages/order-complete/OrderComplete';

export function Pagination() {
	return (
		<Routes>
			<Route path='' element={<HeaderAndFooter />}>
				<Route index element={<Main />} />
				<Route path='ticket' element={<ChooseTicket />}>
					<Route index element={<TrainList />} />
					<Route path='wagon' element={<ListWagons />} />
					<Route path='passengers' element={<PassengersList />} />
					<Route path='payment' element={<Payment />} />
					<Route path='order' element={<Order />} />
					<Route path='*' element={<Navigate to='/ticket' replace />} />
				</Route>
				<Route path='complete' element={<OrderComplete />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	);
};

