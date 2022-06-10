// 토큰관련 Store 구성
// 수정 불가

const guardStore = {
    namespaced: true,
    state: {
        guardInfo: false,
        choiceDevice:0
    },
    getters: {
        getGuardInfo: state => {
            return state.guardInfo
        },
        getShoesNo: state => {
            return state.choiceDevice
        },
    },
    mutations: {
        setGuardInfo: (state, payload) => {
            state.guardInfo=payload.guardInfo;
        },
        setShoesNo: (state, shoesNo) => {
            state.choiceDevice=shoesNo;
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

export default guardStore