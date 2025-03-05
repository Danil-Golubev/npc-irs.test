import './App.css';
import { Table } from './pages/Table/Table';
import { Menu } from './components/Menu/Menu';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Card } from './pages/Card/Card';
function App() {
	return (
		<div className='App'>
			<Menu />
			<div className='contentBlock'>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/table' element={<Table />} />
					<Route path='/citizen/:id' element={<Card />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
