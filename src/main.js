import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router/router";
import http from "@/api/http";
import commonApi from "@/api/common";
import store from "./store/index"

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.prototype.store = store;

// token 설정 및 권한설정 > save to sessionStorage
let _storage = window.sessionStorage;
let _tokenKey = process.env.VUE_APP_TOKEN_KEY;
let _userKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_USER_KEY;


//Skip token Key for UI - 여기 변경해야 모바일 빌드가능
var _skipToken = false;

if(location.pathname === "/login" || location.pathname === "/termagree" || /\/alrmplan\/[a-z0-9]{5}/g.test(location.pathname)) {
    _skipToken = true;
    Vue.prototype.$skipToken = true;
}

if(!_skipToken) {
    getToken()
        .then(token =>
            getUser(token).then(() => {
                start();
            }),
        )
        .catch(() => {
            // 로그인 화면으로 이동
            window.location.href = "/login";
        });
} else {
    start();
}

function getToken() {
    return new Promise((resolve, reject) => {
        commonApi.getToken().then(res => {
            let tokenData = res.data.data.token
            _storage.setItem(_tokenKey, tokenData)
            resolve(tokenData)
        }).catch(err => {
            reject(err)
        })
    })
}


function getUser(token) {
    return new Promise((resolve, reject) => {
        http.setToken(token);
        commonApi
            .getUser()
            .then(res => {
                http.setIp(res.data.data?.clntIp)

                let userData = JSON.stringify(res.data.data);
                _storage.setItem(_userKey, userData);

                console.log("getUser");

                resolve();
            })
            .catch(err => {
                alert(err);
                reject(err);
            });
    });
}


function start() {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount("#app");
}

