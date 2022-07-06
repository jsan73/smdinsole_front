// 토큰관련 Store 구성
// 수정 불가

const guardStore = {
    namespaced: true,
    state: {
        guardInfo: false,
        choiceDevice:{
            deviceNo:0,
            deviceNumber:'',
            deviceIMEI:''
        }
    },
    getters: {
        getGuardInfo: state => {
            return state.guardInfo
        },
        getDeviceNo: state => {
            return state.choiceDevice
        },
    },
    mutations: {
        setGuardInfo: (state, payload) => {
            state.guardInfo=payload.guardInfo;
        },
        setChoiceDevice: (state, payload) => {
            state.choiceDevice.deviceNo = payload.deviceNo;
            state.choiceDevice.deviceNumber = payload.deviceNumber;
            state.choiceDevice.deviceIMEI = payload.deviceIMEI;
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