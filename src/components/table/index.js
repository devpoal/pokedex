import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useMainStore } from '../../store';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Chip, Card, LinearProgress } from '@material-ui/core';
import { getColorByType } from '../../utils/utils';

function TableComponent() {
	const
		apiUrl = 'https://pokeapi.co/api/v2',
		wrapTable = useRef(null),
		store = useMainStore();
	
	useEffect(() => {
		const getTypes = () => {
			fetch(`${apiUrl}/type/`)
				.then(resp => resp.json())
				.then(resp => {
					if (resp && resp.results) {
						const colorTypes = {};
						resp.results.map(item => { colorTypes[item.name] = getColorByType(item.name); return null; });
						store.setColorTypes(colorTypes);
					}
				}).catch(error => {
					store.setLoading(false);
					store.setErrors([error.message]);
				});
		};

		getTypes();
	}, []);

	useEffect(() => {
		const getMainData = (limit, offset) => {
			fetch(`${apiUrl}/pokemon/?limit=${limit}&offset=${offset}`)
				.then(resp => resp.json())
				.then(async resp => {
					if (resp && resp.results) {
						const newList = [];
	
						for (let item of resp.results) {
							newList.push(await getItemData(item.url));
						}
						
						store.setData({ count: resp.count, list: newList });
						store.setLoading(false);
					}
				}).catch(error => {
					store.setLoading(false);
					store.setErrors([error.message]);
				});
		};
		
		getMainData(store.limit, store.page * store.limit);
	}, [store.limit, store.page]);

	const getItemData = (url) => {
		return fetch(url)
			.then(respItem => respItem.json())
			.then(respItem => {
				respItem.types && respItem.types.map(typeItem => {
					typeItem.color = store.colorTypes[typeItem.type.name];
					return null;
				});
				return respItem;
			}).catch(error => console.log(error.message));
	};

	useEffect(() => {
		wrapTable.current.scrollTop = 0;
	}, [store.data]);

	const handleClickItem = (item) => {
		store.setModal(item);
	};
	
	const normalise = value => (value - 0) * 100 / (200 - 0);
	
	return (
		<TableContainer className="wrap-table" ref={wrapTable}>
			<Table stickyHeader aria-label="sticky table" className="table" color="secondary">
				<TableHead>
					<TableRow>
						<TableCell align="center" className="table__head-cell">Image</TableCell>
						<TableCell align="center" className="table__head-cell">Name</TableCell>
						<TableCell align="center" className="table__head-cell">Types</TableCell>
						<TableCell align="center" className="table__head-cell">Stats</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{store.filteredData.map(item => <TableRow key={item.name} className="table__row" onClick={() => handleClickItem(item)}>
						<TableCell align="center" className="table__cell table__cell--pic">
							{item.sprites && <div className="picture">
								<img src={item.sprites['front_default']} alt={item.name}/>
							</div>}
						</TableCell>

						<TableCell align="center" className="table__cell table__cell--name">
							<div className="name">{item.name}</div>
						</TableCell>

						<TableCell align="center" className="table__cell">
							<div className="table__types"> 
								{item.types && item.types.map(type =>
									<Chip
										key={type.type.name}
										className="type"
										style={{backgroundColor: type.color}}
										label={type.type.name}
									/>
								)}
							</div>
						</TableCell>

						<TableCell align="center" className="table__cell">
							{item.stats && <Card className="list">
								{item.stats.map(stat =>
									<div key={stat.stat.name} className="stat">
										<div className="stat__title">
											{stat.stat.name}
										</div>

										<div className="stat__wrap">
											<span className="stat__label">{stat.base_stat}</span>
											
											<LinearProgress
												value={normalise(stat.base_stat)}
												variant="determinate"
												className="stat__progress"
											/>
										</div>
									</div>
								)}
							</Card>}
						</TableCell>
					</TableRow> )}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default observer(TableComponent);