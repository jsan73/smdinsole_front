// 스토어 index
// 수정가능(PL)

// import Vue from "vue"
// import Vuex from "vuex"
// import state from "./state"
// import getters from "./getters"
// import mutations from "./mutations"
// import actions from "./actions"

// Vue.use(Vuex)

// export default new Vuex.Store({
// 	state, // data
// 	getters,// state를 바로 반환(computed 같은거)
// 	mutations,// state를 변경/관리. 순차적. 동기 처리 로직.
// 	actions// 비순차적, 비동기 처리 로직. state변경은 mutations에서.
// })

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import createMutationsSharer from "vuex-shared-mutations";

// 작성한 모듈을 가져옵니다.
import authStore from '@/store/authStore.js'
import rionStore from "@/store/rionStore";
import loadStore from "@/store/loadStore";

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		plugins: [createPersistedState()],
		// 키: 값 형태로 저장됩니다.
		authStore: authStore,
		rionStore: rionStore,
		loadStore: loadStore,
	},
	plugins: [
		createPersistedState({
			//주목! : 여기에 쓴 모듈만 저장됩니다.
			paths: ["authStore"],
		}),
		createMutationsSharer({
			predicate: []
		})
	],

})

export default store