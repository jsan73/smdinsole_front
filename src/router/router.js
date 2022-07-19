// 라우터 구성
// 수정 불가

import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store/index"
import utils from "@/utils/utils";
import jwt from "vue-jwt-decode";

Vue.use(VueRouter)

const routes = []; //menu.getRouteView();
//routes.push({ path: "/notfound", name: "NotFound", component: NotFound, props: { msg: "no page" } })


const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {

	if(to?.path == "/login") return next()

	let token = store.getters['guardStore/getToken'];

	if(utils.isEmpty(token) && to?.path != "/login") {
		return next('/login')
	} else {
		console.log("router token : " + token)
		if(utils.isNotEmpty(token)) {
			const {exp} = jwt.decode(token);
			if (exp < (new Date().getTime() + 1) / 1000) {
				store.commit('guardStore/setToken', '')
				return next('/login')
			} else {
				next()
			}
		}
	}
	//스크롤 위치 상단이동
	window.scrollTo(0,0);
})

export default router
