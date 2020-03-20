import React from 'react';
import { useObserver } from 'mobx-react';
import { useMainStore } from '../../store';
import cx from 'classnames';

export default function FilterType() {
	const store = useMainStore();

	return useObserver(() => (
		<div className="filterType">
			<div className="filterType__title">Filter by type:</div>

			{store.colorTypes && <div className="filterType__list">
				{Object.keys(store.colorTypes).map(type =>
					<div
						key={type}
						className={cx('filterType__item', {'filterType__item--active': store.filterTypes[type]})}
						style={{backgroundColor: store.colorTypes[type]}}
						onClick={() => {store.setFilterTypes(type)}}
					>{type}</div>
				)}
			</div>}
		</div>
	));
};