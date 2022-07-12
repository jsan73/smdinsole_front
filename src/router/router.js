// 라우터 구성
// 수정 불가

import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store/index"
//import NotFound from "@/components/NotFound.vue"
import http from "@/api/http"
import utils from "@/utils/utils";

Vue.use(VueRouter)

const routes = []; //menu.getRouteView();
//routes.push({ path: "/notfound", name: "NotFound", component: NotFound, props: { msg: "no page" } })


let _storage = window.sessionStorage
let _tokenKey = process.env.VUE_APP_TOKEN_KEY;

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {


	// // 시스템 접속 권한 체크
	let token = _storage.getItem(_tokenKey);

	//http.setMenuId(to?.name);

	if(utils.isEmpty(token) && to?.path != "/login") {
		//window.location.href = "/login";
		// console.log("router")
		// console.log(token)
		return next('/login')

	} else {
		next()
	}
	//스크롤 위치 상단이동
	window.scrollTo(0,0);
})

export default router
