import React from 'react';
import { useObserver } from 'mobx-react';
import { useMainStore } from '../../store';
import { TablePagination } from '@material-ui/core';

export default function Pagination() {
	const
		store = useMainStore(),
		rowsPerPage = [10, 20, 50];
		
	const handleChangePage = (e, newPage) => {
		store.setPage(newPage);
	};
	
	const handleChangeRowsPerPage = ({ target }) => {
		store.setLimit(target.value);
	};

	return useObserver(() => (
		<TablePagination
			rowsPerPageOptions={rowsPerPage}
			component="div"
			count={store.data.count ? store.data.count : 0}
			rowsPerPage={store.limit}
			page={store.page}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			className="pagination"
		/>
	));
};