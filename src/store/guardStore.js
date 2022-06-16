// 토큰관련 Store 구성
// 수정 불가

const guardStore = {
    namespaced: true,
    state: {
        guardInfo: false,
        choiceDevice:{
            shoesNo:0,
            shoesNumber:''
        }
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
        setChoiceDevice: (state, payload) => {
            state.choiceDevice.shoesNo = payload.shoesNo;
            state.choiceDevice.shoesNumber = payload.shoesNumber;
        }
    },
    actions: {
        commitGuardInfo: ({ commit }, payload) => {
            commit('setGuardInfo', payload)
        },
        commitChoiceDevice: ({ commit }, payload) => {
            commit('setChoiceDevice', payload)
        }
    }
}

export default guardStore