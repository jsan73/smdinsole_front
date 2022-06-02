import Vue from "vue";
import router from "@/router/router";
import menuList from "@/menu";
// import LayerLayout from "@/components/layout/LayerLayout";
//import {mapState, mapMutations, mapActions} from "vuex";
//import mapState from "vuex"

function loadView(path, view) {
	if(view === undefined) return null;
	else return () => import(/* webpackChunkName: "view-[request]" */ `@/${path}/${view}.vue`);
}


export default {
	name: "App",
	data() {
		return {
			menulist: [],
			tabMenu: [],
			firstPage: "",
			isSkipToken: false,
			isDev: false,
			titleMap: null,
		};
	},
	watch:{
		"$route"(){
//			this.classClean();
		}
	},
	computed: {
		//...mapState('loadStore', ['loading']),
		layout() {
			//return ((this.$route.meta.layout === "Main" || this.$route.path === "/main" || this.$route.path === "/") ? "Main" : "Default-Layout");
			return ((this.$route.meta.layout === "Main") ? "Main" : "Default-Layout");
		},
	},
	components: {
	},
	methods: {
		// ...mapActions('authStore', ['COMMIT_USERTOKEN', 'COMMIT_ACCESS_FUNC', 'COMMIT_TABMENU_FUNC']),
		// ...mapActions('activeStore', ['GET_PUSH_MSG_CNT']),
		// ...mapMutations('loadStore', ['SET_LOADING']),
		// makeAccessMenu() {
		// 	let itemLength = this.accessList?.length === undefined ? 0 : this.accessList.length || 0;
		//
		// 	this.accessMenuId = {};
		// 	for(let i = 0; i < itemLength; i++) {
		// 		let menu = this.accessList[i];
		// 		this.accessMenuId[menu.menuId] = true;
		// 	}
		// },
		// makeAccessFunc() {
		// 	let itemLength = this.accessFuncList?.length === undefined ? 0 : this.accessFuncList.length;
		// 	this.accessFunc = {};
		// 	for(let i = 0; i < itemLength; i++) {
		// 		let func = this.accessFuncList[i];
		// 		this.accessFunc[func.funcId] = func;
		// 	}
		// },
		makeRouteView() {
			let data = JSON.parse(JSON.stringify(menuList.list));

			this.menuGlobal = [];
			let records = {};
			let itemLength = data.length;

			for(let i = 0; i < itemLength; i++) {
				let el = data[i];
				let meta = el?.meta === undefined ? {} : el.meta;
				meta.access = !(meta.authority === true && this.accessMenuId[el.menuId] === undefined);
				meta.title = el.menuName;

				data[i] = {
					fullpath: el.url,
					path: el.url,
					name: el.menuId,
					menuid: el.menuId,
					pid: el.parentId,
					hidden: el.modal,
					props: el.props || true,
					meta: meta,
				};

				// if(el.modal) {
				// 	data[i] = {
				// 		...data[i],
				// 		component: LayerLayout,
				// 		props: {
				// 			component: loadView(el.pagePath, el.componentName),
				// 		},
				// 	};
				// } else {
				// 	data[i] = {
				// 		...data[i],
				// 		component: loadView(el.pagePath, el.componentName),
				// 	};
				// }

				data[i] = {
					...data[i],
					component: loadView(el.pagePath, el.componentName),
				};

				// Router Redirect 추가
				if(el.redirect !== undefined) {
					data[i] = {
						...data[i],
						redirect : el.redirect
					};
				}

				records[data[i].menuid] = data[i];
			}

			for(let i = 0; i < itemLength; i++) {
				let currentData = data[i];
				if(currentData.meta.authority === true && currentData.meta.access === false) {
					continue;
				}
				let parentData = records[currentData.pid];
				if(parentData && parentData.component == null) {
					parentData = records[parentData.pid];
				}

				if(!parentData) {
					if(currentData.path == null) continue;
					// if(this.firstPage === "" && !currentData.hidden) {
					// 	this.firstPage = currentData.menuid;
					// 	currentData.path = "/";
					// }
					this.menuGlobal.push(currentData);
					continue;
				}

				//currentData.path = currentData.path.substring(parentData.path.length > 1 ? parentData.path.length + 1 : 0);
				parentData.children = parentData.children || [];
				parentData.children.push(currentData);

			}
			Vue.prototype._routelist = this.menuGlobal;

			router.addRoutes(this.menuGlobal);
		},
		getRouteView() {
			return this.menuGlobal || [];
		},
	},
	created: function () {
		console.debug(this.layout);
		if(this.$skipToken === undefined) {

			var _this = this;
			setTimeout(() => {

				let _storage = window.sessionStorage;
				let _userKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_USER_KEY;
				var userInfo = JSON.parse(_storage.getItem(_userKey));
				var token = _storage.getItem(process.env.VUE_APP_TOKEN_KEY);
				//Start 하기전에 Native 호출.
				// _this._callNative({
				// 	"method": "sendDeviceInfo",
				// 	"loginId": userInfo?.loginId,
				// 	"token": token
				// });
			}, 1);

			// var auth = null;
			// try {
			// 	auth = JSON.parse(this.$getSession(process.env.VUE_APP_AUTH_KEY));
			// } catch(error) {
			// 	auth = null;
			// }
			//
			// if(auth != null) {
			// 	this.accessList = auth.funcMenu;
			// 	this.accessFuncList = auth.funcItem;
			// }
			//
			// this.makeAccessMenu();
			// this.makeAccessFunc();
			//
			// this.GET_PUSH_MSG_CNT();
			// this.COMMIT_ACCESS_FUNC(this.getAccessFunc());

		} else {
			this.isSkipToken = true;
		}

		this.makeRouteView();

		// 개발모드
		if(process.env.VUE_APP_MODE === "dev") {
			this.isDev = true;
		}

	},
};
