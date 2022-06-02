// 토큰관련 Store 구성
// 수정 불가

const authStore = {
    namespaced: true,
    state: {
        guardInfo: false,
        shoesNo:0
    },
    getters: {
        getGuardInfo: state => {
            return state.guardInfo
        },
        getShoesNo: state => {
            return state.shoesNo
        },
    },
    mutations: {
        setGuardInfo: (state, payload) => {
            state.guardInfo=payload.guardInfo;
        },
        setShoesNo: (state, payload) => {
            state.shoesNo=payload.shoesNo;
        }
    },
    actions: {
        commitGuardInfo: ({ commit }, payload) => {
            commit('setGuardInfo', payload)
        },
        commitShoesNo: ({ commit }, payload) => {
            commit('setShoesNo', payload)
        }
    }
}

export default authStore