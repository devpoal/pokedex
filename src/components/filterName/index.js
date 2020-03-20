import React from 'react';
import { useObserver } from 'mobx-react';
import { Input } from '@material-ui/core';
import { useMainStore } from '../../store';

export default function FilterName() {
	const store = useMainStore();

	return useObserver(() => (
		<div className="filterName">
			<div className="filterName__title">Filter by name:</div>

			<div>
				<Input
					value={store.filterName}
					onChange={({target}) => {store.setFilter(target.value)}}
					className="filterName__input"
					placeholder="Enter name..."
				/>
			</div>
		</div>
	));
};