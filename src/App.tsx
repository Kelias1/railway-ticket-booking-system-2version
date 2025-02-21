import { Provider } from "react-redux";
import { store } from "./store/index";
import { BrowserRouter } from 'react-router-dom';
import { Pagination } from './pagination/Pagination';
import './App.css';

function App() {

	return (
		<BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
			<Provider store={store}>
				<Pagination />
			</Provider>
		</BrowserRouter>
	)
}

export default App;
