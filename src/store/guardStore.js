// 토큰관련 Store 구성
// 수정 불가

const guardStore = {
    namespaced: true,
    state: {
        guardInfo: {
            guardPhone: '',
            autoLogin:'',
            token:'',
            refreshToken:''
        },
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
        getToken: state=> {
            return state.guardInfo.token
        },
        getDevice: state => {
            return state.choiceDevice
        },
    },
    mutations: {
        setGuardInfo: (state, payload) => {
            state.guardInfo.guardPhone = payload.guardPhone;
            state.guardInfo.autoLogin = payload.autoLogin;
            state.guardInfo.refreshToken = payload.refreshToken;
        },
        setToken: (state, token) => {
            state.guardInfo.token = token;
        },
        setAutoLogin: (state, login) => {
            state.guardInfo.token = login;
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
        commitToken: ({commit}, token) => {
            commit('setToken', token)
        },
        commitAutoLogin: ({commit}, login) => {
            commit('setAutoLogin', login)
        },
        commitChoiceDevice: ({ commit }, payload) => {
            commit('setChoiceDevice', payload)
        }
    }
}

export default guardStore