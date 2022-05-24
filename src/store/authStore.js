// 토큰관련 Store 구성
// 수정 불가

const authStore = {
    namespaced: true,
    state: {
        userInfo: false,
        userToken: "",
        accessFunc: {},
        tabMenu: {},
        menurecords: {},
    },
    getters: {
        GET_USERINFO: state => {
            return state.userInfo
        },
        GET_USERTOKEN: state => {
            return state.userToken
        },
        IS_ACCESS_FUNC: (state) => (funcId) => {
            return state.accessFunc[funcId] === undefined ? false : true
        },
        GET_TABMENU: (state) => (tabMenuId) => {
            let menuId = tabMenuId;
            let menuInfo = state.menurecords[menuId]; 
            if (menuInfo?.tabmenu !== undefined && menuInfo.tabmenu === true) {
                menuId = menuInfo.pid
            }
            return state.tabMenu[menuId] || [];
        }       
    },
    mutations: {
        SET_USERINFO: (state, payload) => {
            state.userInfo=payload.userInfo;
        },
        SET_USERTOKEN: (state, payload) => {
            state.userToken=payload.userToken;
        },
        SET_ACCESS_FUNC: (state, payload) => {
            state.accessFunc=payload;
        },
        SET_TABMENU_FUNC: (state, payload) => {
            state.tabMenu=payload.tabMenu;
            state.menurecords=payload.menurecords;
        },
    },
    actions: {
        COMMIT_USERINFO: ({ commit }, payload) => {
            commit('SET_USERINFO', payload)
        },
        COMMIT_USERTOKEN: ({ commit }, payload) => {
            commit('SET_USERTOKEN', payload)
        },
        COMMIT_ACCESS_FUNC: ({ commit }, payload) => {
            commit('SET_ACCESS_FUNC', payload)
        },
        COMMIT_TABMENU_FUNC: ({ commit }, payload) => {
            commit('SET_TABMENU_FUNC', payload)
        },
    }
}

export default authStore