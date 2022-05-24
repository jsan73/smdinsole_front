const loadStore={
	namespaced: true,
	state:{
		loading:false
	},
	mutations:{
		SET_LOADING(state, status){
			state.loading = status
		}
	}
}

export default loadStore;