// Axios 구성
// 수정 불가

import axios from "./index";
import jsonAdapter from "axios-jsonp";

//axios를 이용하여 get, put 등을 하지만 각 기능별로 header가 다른경우가 있어 구분하여 재설정함
let _sotrage = window.sessionStorage
let _tokenKey = _sotrage.getItem(process.env.VUE_APP_TOKEN_KEY)

let defaultHeader = {
	"Content-Type": "application/json;charset=UTF-8",
	"Accept": "application/json",
	"Access-Control-Allow-Origin": "*",
	"X-AUTH-TOKEN": _tokenKey,
	"X-SSCM-CD":process.env.VUE_APP_AUTH_KEY,
	"X-MENU-ID": "",
	"X-CLNT-IP": "",
};

// let jsonHeader = {
// 	"Content-Type": "application/json",
// 	"Accept": "application/json",
// 	"Access-Control-Allow-Origin": "*",
// 	"dataType" : "jsonp"
// };

export default {

	setToken(token) {
		defaultHeader["X-AUTH-TOKEN"] = token;
	},

	setIp(ip) {
		defaultHeader["X-CLNT-IP"] = ip;
	},

	setMenuId(id) {
		defaultHeader["X-MENU-ID"] = id;
	},

	get(url) {

		return axios.get(url, {
			headers: {
				...defaultHeader,
				//"addType":"addData"
			}
		})
	},
	getp(url) {

		return axios.get(url, {adapter:jsonAdapter}, {
			headers: {
				...defaultHeader
			}
		})
	},

	put(url, body) {
		return axios.put(url, body, {
			headers: defaultHeader
		})
	},

	post(url, body, key) {
		//외부 토큰이 있을경우
		if(key && typeof key == "string"){
			defaultHeader["X-AUTH-TOKEN"] = key;
		}

		return axios.post(url, body, {
			headers   : {
				...defaultHeader,
				//"addType":"addData"
			}, timeout: 600000 // 10분
		})
	},

	delete(url) {
		return axios.delete(url, {
			headers: defaultHeader
		})
	},

	getFile(url) {
		return axios.get(url, {
			headers: {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
			}
		})
	},


	postFileDn(url, body) {
		return axios.post(url, body, {

			headers       : {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
				//"addType":"addData"
			}
			, responseType: 'blob'
			, timeout     : 600000 // 10분
		})
	},

	postParamFileDn(url, params) {
		return axios.post(url, {}, {

			headers       : {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
				//"addType":"addData"
			}
			, responseType: 'blob'
			, timeout     : 600000 // 10분
			, params      : params
		})
	},


	postFile(url, body) {
		return axios.post(url, body, {
			headers  : {
				...defaultHeader,
				"Content-Type": "multipart/form-data"
			}
			, timeout: 600000 // 10분
		})

	},

	postFileOption(url) {
		console.log(url);
		return {
			url      : `${axios.defaults.baseURL}${url}`,
			headers  : {
				"Accept"                     : "application/json",
				"Access-Control-Allow-Origin": "*",
				"X-AUTH-TOKEN"               : _tokenKey
			}
			, timeout: 600000 // 10분
		}
	},

	postParam(url, params) {
		return axios.post(url, {}, {
			headers  : {
				...defaultHeader,
				//"addType":"addData"
			},
			params   : params
			, timeout: 600000 // 10분
		})
	},

	//IRIS
	postIris(url, body) {

		let irisHeader = JSON.parse(JSON.stringify(defaultHeader));
		irisHeader["X-AUTH-TOKEN"] = _sotrage.getItem(process.env.VUE_APP_IRIS_TOKEN_KEY);

		return axios.post(url, body, {
			headers   : {
				...irisHeader
			}, timeout: 600000 // 10분
		})
	},

	postIrisFileDn(url, body) {

		let irisHeader = JSON.parse(JSON.stringify(defaultHeader));
		irisHeader["X-AUTH-TOKEN"] = _sotrage.getItem(process.env.VUE_APP_IRIS_TOKEN_KEY);

		return axios.post(url, body, {

			headers       : {
				...irisHeader,
				"Response-Type": 'arraybuffer'
				//"addType":"addData"
			}
			, responseType: 'blob'
			, timeout     : 600000 // 10분
		})
	},

	postParamIrisFileDn(url, params) {

		let irisHeader = JSON.parse(JSON.stringify(defaultHeader));
		irisHeader["X-AUTH-TOKEN"] = _sotrage.getItem(process.env.VUE_APP_IRIS_TOKEN_KEY);

		return axios.post(url, {}, {

			headers       : {
				...irisHeader,
				"Response-Type": 'arraybuffer'
				//"addType":"addData"
			}
			, responseType: 'blob'
			, timeout     : 600000 // 10분
			, params      : params
		})
	},


}