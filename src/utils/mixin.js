import utils from "@/utils/utils";

const mixin = {
	data() {
		return {}
	},
	computed: {
		isApp: function () {
			const userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
			if(/kokasin-aos/i.test(userAgent)) {
				return "and";
			} else if(/kokasin-ios/i.test(userAgent)) {
				return "ios";
			} else {
				return false;
			}
		}
	},
	methods: {
		// Native 호출
		_callNative(data) {

			//Extend Interface가 존재할때
			var callBackInterface = "window.Interface";
			if(data.interface !== undefined) {
				callBackInterface = callBackInterface + data.interface;
			}
			callBackInterface = callBackInterface + ".";

			// //Download Url이 full 이 아닐때
			// if(data.method === "downloadFile" && data.url.toString().indexOf("https") < 0) {
			// 	data.url = process.env.VUE_APP_SERVER_URL + data.url;
			// }

			if(this.isApp === "and") {
				if(data.callback !== undefined) {
					data.callback = data.callback.replace(callBackInterface,'');
					data.callback = callBackInterface + data.callback;
				}
				if(data.callbackCancel !== undefined) {
					data.callbackCancel = data.callbackCancel.replace(callBackInterface,'');
					data.callbackCancel = callBackInterface + data.callbackCancel;
				}

				window.AppInterface.postMessage(JSON.stringify(data));
			} else if(this.isApp === "ios") {
				if(data.callback !== undefined) {
					data.callback = data.callback.replace(callBackInterface,'');
					data.callback = callBackInterface + data.callback;
				}
				if(data.callbackCancel !== undefined) {
					data.callbackCancel = data.callbackCancel.replace(callBackInterface,'');
					data.callbackCancel = callBackInterface + data.callbackCancel;
				}
				// eslint-disable-next-line no-undef
				webkit.messageHandlers.AppInterface.postMessage(data);
			} else {
				// PC 테스트 대응.
				if(data.method === "showToast") {
					alert("toast message : "+data.message);
				}
				// PC 테스트 대응.
				if(data.method === "showDialogAlert") {
					alert(data.message);
				}
				if(data.method === "sendDeviceInfo") {
	//				alert(data.token);
				}
				if(data.method === "showDialogConfirm") {
					const isVal = confirm(data.message);
					if(isVal && data.callback !== undefined) {
						this[data.callback]()
					} else if(data.callbackCancel !== undefined){
						this[data.callbackCancel]()
					}
				}
				if(data.method === "openWebView" || data.method === "openBrowser") {
					window.open(
						data.url,
						data.name
					);
				}
				if(data.method === "closeWebView") {
					if(data.url !== undefined) {
						parent.opener.location = data.url;
					}
					window.close();
				}
				if(data.method === "downloadFile" || data.method === "openFile") {
					window.location = data.url;
				}
			}
		},
		showAlert(v) {

			let _this = this;
			// Alert 자동 닫기
			// if(v.autoClose !== undefined && v.autoClose > 0) {
			// 	v.btnTxtL = '';
			// 	v.btnTxtR = '';
			// 	// v.hasClose = true;
			//
			// 	var time = v.autoClose * 1000;
			// 	setTimeout(()=>{ _this.$root.$children[0].$refs.refAlert.hideAlert(); }, time);
			// }

			// Alert Key Event
			// if(v.btnTxtL !== '' && v.btnTxtL !== '') {
			// 	_this.abort = new AbortController();
			// 	window.addEventListener("keydown", (e) => {
			//
			// 		if(e.keyCode === 32) {
			// 			let v = this.$root.$children[0].alertData;
			// 			if(v.btnTxtL !== '') {
			// 				_this.$root.$children[0].$refs.refAlert.left(e);
			// 			}
			// 		}
			// 	}, {signal: _this.abort.signal, passive: true});
			// }

			// Alert Open
			this.$root.$children[0].alertData = {...this.$root.$children[0].alertData, ...v};
			//console.log(this.$root.$children[0].alertData);
			this.$root.$children[0].alertData.show = true;
			//this.$root.$children[0].$refs.refAlert.showAlert();

		},
		hideAlert() {

			// if(this.abort !== null) {
			// 	this.abort.abort();
			// 	this.abort = null;
			// }

			this.$root.$children[0].alertData = {
				show: false,
				msg: '',
			}
			//this.$root.$children[0].$refs.refAlert.closeAlert();
		},
		openPopup(msg, ok, cancel, doAction, param, alertType) {
			if(utils.isEmpty(alertType)) alertType =  0;
			if(utils.isEmpty(doAction)) doAction =  this.hideAlert;
			let v= {
				msg: msg,
				btnO:ok,
				btnC:cancel,
				doAction: doAction,
				doActionParam: param,
				alertType:alertType
			}
			this.showAlert(v);
		},
		gotoBack() {
			this.$router.go(-1);
		}
	}
}

export default mixin;
