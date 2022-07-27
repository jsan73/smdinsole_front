import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index"
import mixin from "./utils/mixin"
import ui from "./components";
import jwt from "vue-jwt-decode";
import * as VueGoogleMaps from "vue2-google-maps";
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast, {
    type: 'center',
    duration: 2000,
    wordWrap: true,
    //width: '300px'
});

Vue.use(Vuex);
Vue.use(ui);
Vue.mixin(mixin);



Vue.config.productionTip = false;
Vue.prototype.store = store;

let _gKey = process.env.VUE_APP_GOOGLE_MAP_KEY;



Vue.use(VueGoogleMaps, {
    load: {
        key: _gKey,
        library: "places",
        region: "KR"
    }
});

//Skip token Key for UI - 여기 변경해야 모바일 빌드가능
var _skipToken = false;

if(location.pathname === "/login" || location.pathname === "/termprivacy") {
    _skipToken = true;
    Vue.prototype.$skipToken = true;
}
console.log(store.getters['guardStore/getGuardInfo'])
start();

// if(!_skipToken) {
//     const token =_storage.getItem(_tokenKey);
//    //start();
//     try {
//         if (token) {
//             let decodeToken = jwt.decode(token);
//             if (decodeToken) {
//                 let userData = JSON.stringify(decodeToken);
//                 _storage.setItem(_userKey, userData);
//
//                 start();
//             }
//         }else{
//             //window.location.href = "/login";
//             start();
//         }
//     }catch (err){
//         //window.location.href = "/login";
//     }
// } else {
//
//     start();
//
//
// }

function start() {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount("#app");
}

