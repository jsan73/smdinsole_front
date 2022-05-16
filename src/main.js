import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router/router";
import PortalVue from "portal-vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import smoothscroll from "smoothscroll-polyfill";
import ui from "./components";
import uijs from "./utils/ui";
import mixin from "./utils/mixin";
import VeeValidate from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko.js'
import './utils/validateExtend';
import instance from "./assets/js/instance"
import http from "@/api/http";
import commonApi from "@/api/common";
import store from "./store/index"

Vue.use(Vuex);
Vue.use(VueAwesomeSwiper);
Vue.use(PortalVue);
Vue.use(ui);
Vue.use(uijs);
Vue.use(instance);
Vue.mixin(mixin);
Vue.config.productionTip = false;
smoothscroll.polyfill();
Vue.prototype.store = store;
/**
 * npm install vee-validate@2.2.15 --save
 * https://vee-validate.logaretm.com/v2/guide/
 */
Vue.use(VeeValidate, {
    locale: 'ko',
    dictionary: {ko},
});



// token 설정 및 권한설정 > save to sessionStorage
let _storage = window.sessionStorage;
let _tokenKey = process.env.VUE_APP_TOKEN_KEY;
let _authKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_AUTH_KEY;
let _userKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_USER_KEY;


//Skip token Key for UI - 여기 변경해야 모바일 빌드가능
var _skipToken = false;

if(location.pathname === "/auth" || location.pathname === "/termagree" || /\/alrmplan\/[a-z0-9]{5}/g.test(location.pathname)) {
    _skipToken = true;
    Vue.prototype.$skipToken = true;
}

if(!_skipToken) {
    getToken()
        .then(token =>
            getAuth(token).then(() =>
                getUser().then(() => {
                    start();
                }),
            ),
        )
        .catch(() => {
            let protocol = location.protocol;
            let hostName = location.hostname;
            let port = location.port;
            let pathname = location.pathname;

            let ssoUrl = protocol + "//" + hostName;
            if(port !== "" && port !== "443") {
                ssoUrl += ":" + port;
            }
            //특정 URL 로딩시 로그인후 해당 URL로 이동
            if(pathname === "/insuagree") {
                ssoUrl += pathname;
            }

            window.location.href = process.env.VUE_APP_SSO_URL + ssoUrl;
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

function getAuth(token) {
    return new Promise((resolve, reject) => {
        http.setToken(token);
        commonApi
            .getAuth()
            .then(res => {
                let authData = JSON.stringify(res.data.data);
                _storage.setItem(_authKey, authData);

                console.log("getAuth");

                resolve();
            })
            .catch(err => {
                alert(err);
                reject(err);
            });
    });
}

function getUser() {
    return new Promise((resolve, reject) => {
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

