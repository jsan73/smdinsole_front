import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router/router";
import http from "@/api/http";
import commonApi from "@/api/api";
import store from "./store/index"
import ui from "./components";
import jwt from "vue-jwt-decode";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(Vuex);
Vue.use(ui);



Vue.config.productionTip = false;
Vue.prototype.store = store;

// token 설정 및 권한설정 > save to sessionStorage
let _storage = window.sessionStorage;
let _tokenKey = process.env.VUE_APP_TOKEN_KEY;
let _userKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_USER_KEY;
let _gKey = process.env.VUE_APP_GOOGLE_MAP_KEY;
console.log("===============");
console.log(_gKey);
console.log(_tokenKey);

Vue.use(VueGoogleMaps, {
    load: {
        key: _gKey,
        library: "places",
        region: "KR"
    }
});

//Skip token Key for UI - 여기 변경해야 모바일 빌드가능
var _skipToken = false;

if(location.pathname === "/login" || location.pathname === "/termagree" || /\/alrmplan\/[a-z0-9]{5}/g.test(location.pathname)) {
    _skipToken = true;
    Vue.prototype.$skipToken = true;
}

if(!_skipToken) {
    const token =_storage.getItem(_tokenKey);
    try {
        if (token) {
            let decodeToken = jwt.decode(token);
            if (decodeToken) {
                let userData = JSON.stringify(decodeToken);
                _storage.setItem(_userKey, userData);

                start();
            }
        }else{
            window.location.href = "/login";
        }
    }catch (err){
        window.location.href = "/login";
    }
} else {
    start();
}

function start() {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount("#app");
}

