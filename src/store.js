import { observable, action, computed, decorate } from 'mobx';
import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

export function useStores() {
	return useContext(MobXProviderContext);
};

export function useMainStore() {
	const { mainStore } = useStores();
	return mainStore;
};

export class MainStore {
	filterName = '';
	loading = true;
	loadingImage = false;
	colorTypes = {};
	errors = [];
	filterTypes = {};
	data = {};
	limit = 10;
	page = 0;
	modal = false;

	setFilter(value) {
		this.filterName = value;
	}

	setLoading(state) {
		this.loading = state;
	}

	setColorTypes(types) {
		this.colorTypes = types;
	}

	setErrors(errors) {
		this.errors = errors;
	}

	setFilterTypes(type) {
		const newFilterTypes = {...this.filterTypes};

		if (newFilterTypes[type]) {
			delete newFilterTypes[type];
		} else {
			newFilterTypes[type] = true;
		}

		this.filterTypes = newFilterTypes;
	}

	setData(data) {
		this.data = data;
	}

	setLimit(limit) {
		this.limit = limit;
		this.loading = true;
	}
	
	setPage(page) {
		this.page = page;
		this.loading = true;
	}
	
	setModal(data) {
		this.modal = data;
		this.loadingImage = true;
	}

	setLoadingImage(state) {
		this.loadingImage = state;
	}

	get filteredData() {
		let filteredByNameData = [], filteredData = [];

		if (this.filterName && this.data.list) {
			filteredByNameData = this.data.list.filter(item => item.name.toLowerCase().indexOf(this.filterName.toLowerCase()) !== -1);
		} else {
			filteredByNameData = this.data.list ? this.data.list : [];
		}
		
		if (Object.keys(this.filterTypes).length && filteredByNameData.length) {
			filteredByNameData.map(item => {
				let filtered = false;

				item.types.map(type => {
					if (this.filterTypes[type.type.name]) {
						filtered = true;
					}

					return null;
				});

				filtered && filteredData.push(item);
				
				return null;
			});
		} else {
			filteredData = filteredByNameData;
		}

		return filteredData;
	}
};

decorate (MainStore, {
	filterName: observable,
	loading: observable,
	loadingImage: observable,
	colorTypes: observable,
	errors: observable,
	filterTypes: observable,
	data: observable,
	limit: observable,
	page: observable,
	modal: observable,
	filteredData: computed,
	setFilter: action,
	setLoading: action,
	setColorTypes: action,
	setErrors: action,
	setFilterTypes: action,
	setData: action,
	setLimit: action,
	setPage: action,
	setModal: action,
	setLoadingImage: action
});