// 라우터 구성
// 수정 불가

import Vue from "vue"
import VueRouter from "vue-router"
import NotFound from "@/components/NotFound.vue"
import http from "@/api/http"

Vue.use(VueRouter)

const routes = []; //menu.getRouteView();
routes.push({ path: "/notfound", name: "NotFound", component: NotFound, props: { msg: "no page" } })


let _storage = window.sessionStorage
let _authKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_AUTH_KEY

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {

	// 시스템 접속 권한 체크
	let auth = JSON.parse(_storage.getItem(_authKey));
	var isAuth = auth?.funcSstm?.filter(function (o){
		return o.funcId === process.env.VUE_APP_AUTH_KEY+"_10000";
	})

	http.setMenuId(to?.name);

	if(isAuth?.length <= 0 && to?.path != "/notauth" && to?.path != "/insuagree") {

		// next("/notauth");
		window.location.href = "/html/noauth.html";

	} else if(to?.meta?.access !== undefined) {// 이동할 router에 meta(여기선 requiresLogin)가 있을 때
		//let isLogin = true;

		if(to.meta.access === true) {// 인증되어 있으면(여기선 true) 이동
			next();
		} else {// 인증되어 있지 않으면 인증 요구
			next("/notfound")// 첫화면으로
		}
	} else {
		next()
	}
	//스크롤 위치 상단이동
	window.scrollTo(0,0);
})

export default router
