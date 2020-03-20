import React from 'react';
import { useObserver } from 'mobx-react';
import { useMainStore } from './store';
import './App.scss';
import { AppBar, Toolbar, Typography, CircularProgress } from '@material-ui/core';
import ModalWrap from './components/modal';
import Pagination from './components/pagination';
import TableComponent from './components/table';
import FilterType from './components/filterType';
import FilterName from './components/filterName';

export default function App() {
	const store = useMainStore();
	
	return useObserver(() => (
		<div className="App">
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h4" className="title">Pokedex</Typography>
				</Toolbar>
			</AppBar>

			{store.errors && store.errors.length > 0 ? <div className="error">
				{store.errors.map((error, index) => <div key={index}>{error}</div>)}
			</div> : <div className="main">
				{store.loading && <div className="progress">
					<CircularProgress color="primary"/>
				</div>}

				<FilterName />
				<FilterType />
				<TableComponent />
				<Pagination />
			</div>}

			<ModalWrap />
		</div>
	));
};