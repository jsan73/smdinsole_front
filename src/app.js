import Vue from "vue";
import router from "@/router/router";
import menuList from "@/menu";
import LayerLayout from "@/components/layout/LayerLayout";
import {mapState, mapMutations, mapActions} from "vuex";


function loadView(path, view) {
	if(view === undefined) return null;
	else return () => import(/* webpackChunkName: "view-[request]" */ `@/${path}/${view}.vue`);
}


export default {
	name: "App",
	data() {
		return {
			accessList: null,
			accessFuncList: null,
			menuGlobal: [],
			accessMenuId: {},
			accessFunc: {},
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
			this.classClean();
		}
	},
	computed: {
		...mapState('loadStore', ['loading']),
		layout() {
			return ((this.$route.meta.layout === "Main" || this.$route.path === "/main" || this.$route.path === "/") ? "Main" : "Default-Layout");
		},
	},
	components: {
	},
	methods: {
		...mapActions('authStore', ['COMMIT_USERTOKEN', 'COMMIT_ACCESS_FUNC', 'COMMIT_TABMENU_FUNC']),
		...mapActions('activeStore', ['GET_PUSH_MSG_CNT']),
		...mapMutations('loadStore', ['SET_LOADING']),
		makeAccessMenu() {
			let itemLength = this.accessList?.length === undefined ? 0 : this.accessList.length || 0;

			this.accessMenuId = {};
			for(let i = 0; i < itemLength; i++) {
				let menu = this.accessList[i];
				this.accessMenuId[menu.menuId] = true;
			}
		},
		makeAccessFunc() {
			let itemLength = this.accessFuncList?.length === undefined ? 0 : this.accessFuncList.length;
			this.accessFunc = {};
			for(let i = 0; i < itemLength; i++) {
				let func = this.accessFuncList[i];
				this.accessFunc[func.funcId] = func;
			}
		},
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

				if(el.modal) {
					data[i] = {
						...data[i],
						component: LayerLayout,
						props: {
							component: loadView(el.pagePath, el.componentName),
						},
					};
				} else {
					data[i] = {
						...data[i],
						component: loadView(el.pagePath, el.componentName),
					};
				}

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
		makePageView() {
			let data = JSON.parse(JSON.stringify(menuList.list));
			//if (!data || !data.length) return [];
			this.titleMap = new Map();

			this.pageGlobal = [];
			let records = {};
			let itemLength = data.length;
			for(let i = 0; i < itemLength; i++) {
				let el = data[i];
				let hidden = el.popup;
				let tabmenu = el.tabmenu;
				let meta = el?.meta === undefined ? {} : el.meta;
				// if (hidden !== true && el.tabmenu === true) {
				//     hidden = true;
				// }
				if(hidden !== true && meta.authority === true && this.accessMenuId[el.menuId] === undefined) {
					hidden = true;
				}
				data[i] = {
					menuid: el.menuId,
					header: el.menuName,
					path: el.url,
					icon: el.icon,
					pid: el.parentId,
					tabmenu: tabmenu,
					hidden: hidden,
					active: false,
					bg: el.icon,
					temp: el.tempmenu,
					category: el.category || "",
				};
				records[data[i].menuid] = data[i];

			}
			this.menurecords = JSON.parse(JSON.stringify(records));

			for(let i = 0; i < itemLength; i++) {
				let currentData = data[i];
				// if(currentData.hidden) {
				// 	continue;
				// }

				if(currentData.tabmenu) {
					// 페이지별 탭메뉴 설정

					let parentData = records[currentData.pid];

					let parentTabMenu = this.tabMenu[currentData.pid] || [];
					// if(parentTabMenu.length == 0) {
					// 	currentData.path = parentData.path;
					// }
					parentTabMenu.push(currentData);
					this.tabMenu[currentData.pid] = parentTabMenu;

					parentData.children = parentData.children || [];
					parentData.children.push(currentData);

					//TITLE
					if(currentData.path?.toString().indexOf("/ui") !== 0) {
						this.titleMap.set(currentData.path, parentData.header);
					}

				} else {
					// 일반 메뉴 정보 (상단 메뉴)
					let parentData = records[currentData.pid];
					// if(this.firstPage === currentData.menuid && !currentData.hidden) {
					// 	currentData.path = "/";
					// }
					if(!parentData) {
						//TITLE
						if(currentData.path?.toString().indexOf("/ui") !== 0) {
							this.titleMap.set(currentData.path, currentData.header);
						}

						this.pageGlobal.push(currentData);
						continue;
					}

					if(currentData.hidden) {
						continue;
					}

					//TITLE
					if(currentData.path?.toString().indexOf("/ui") !== 0) {
						let ppData = records[parentData.pid];
						if(ppData) {
							this.titleMap.set(currentData.path, parentData.header);
						} else {
							this.titleMap.set(currentData.path, currentData.header);
						}
					}

					parentData.items = parentData.items || [];
					// if(parentData.items.length === 0) {
					// 	if(parentData.path === undefined) {
					// 		parentData.path = currentData.path;
					// 		parentData.name = currentData.menuid;
					// 	}
					// 	//else currentData.path = parentData.path;
					// }
					parentData.items.push(currentData);
				}
			}
			//Navigation Menu
			this.menulist = this.pageGlobal.filter(val => {
				return val?.temp === undefined && !val.hidden && val.category !== "";
			});

			Vue.prototype._menulist = this.menulist;
			Vue.prototype._pagelist = this.pageGlobal;
			Vue.prototype._title = this.titleMap;

			this.COMMIT_TABMENU_FUNC({
				"tabMenu": this.tabMenu, "menurecords": this.menurecords
			});
		},

		//UI확인용
		openGnb() {
			this.$refs.ui_gnb.$el.style.display = "block";
		},

		getAccessFunc() {
			return this.accessFunc;
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
				_this._callNative({
					"method": "sendDeviceInfo",
					"loginId": userInfo?.loginId,
					"token": token
				});
			}, 1);

			var auth = null;
			try {
				auth = JSON.parse(this.$getSession(process.env.VUE_APP_AUTH_KEY));
			} catch(error) {
				auth = null;
			}

			if(auth != null) {
				this.accessList = auth.funcMenu;
				this.accessFuncList = auth.funcItem;
			}

			this.makeAccessMenu();
			this.makeAccessFunc();

			this.GET_PUSH_MSG_CNT();
			this.COMMIT_ACCESS_FUNC(this.getAccessFunc());

		} else {
			this.isSkipToken = true;
		}

		this.makeRouteView();
		this.makePageView();

		// 개발모드
		if(process.env.VUE_APP_MODE === "dev") {
			this.isDev = true;
		}

	},
};
