import { About } from './components/About';
import { HowItWorks } from './components/HowItWorks';
import { Reviews } from '../../components/reviews/Reviews';
import './main.css';

function Main() {
	return (
		<div className='container'>
			<main className="main">
				<About />
				<HowItWorks />
				<Reviews />
			</main>
		</div>
	)
}

export default Main;