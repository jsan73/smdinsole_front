// Axios Interceptor 구성
// 수정 가능(PL)

import axios from "axios"
// import store from "@/store/loadingStore"

//axios 기본설정
const instance = axios.create({
	baseURL        : process.env.VUE_APP_SERVER_URL,
	timeout        : 150000,
	withCredentials: true
});

/*
	1. 요청 인터셉터를 작성합니다.
	2개의 콜백 함수를 받습니다.

	1) 요청 바로 직전 - 인자값: axios config
	2) 요청 에러 - 인자값: error
*/
instance.interceptors.request.use(
	// function (config) {
	// 	// 요청 바로 직전
	// 	// store.state.loading = true;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용
	//
	// 	// axios 설정값에 대해 작성합니다.
	//
	// 	// context가 다를 경우 API Server 요청
	// 	// 모바일은 API Server 는 무조건 GATEWAY 서버 호출
	// 	config.baseURL = process.env.VUE_APP_GW_URL
	//
	// 	return config;
	// },
	// function (error) {
	// 	// store.state.loading = false;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용
	//
	// 	// 요청 에러 처리를 작성합니다.
	// 	return Promise.reject(error);
	//
	// }
);


/*
	2. 응답 인터셉터를 작성합니다.
	2개의 콜백 함수를 받습니다.

	1) 응답 정성 - 인자값: http response
	2) 응답 에러 - 인자값: http error
*/
instance.interceptors.response.use(
	function (response) {
		// store.state.loading = false;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용
		/*
			http status가 200인 경우
			응답 바로 직전에 대해 작성합니다.
			.then() 으로 이어집니다.
		*/
		return response;
	},

	function (error) {
		// store.state.loading = false;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용

		if (error.response && error.response.status === 401) {

			// //이동하기 전에 sesstion 값 제거
			// let _authKey = process.env.VUE_APP_AUTH_KEY;
			// let _tokenKey = process.env.VUE_APP_TOKEN_KEY
			let _tokenKey = process.env.VUE_APP_TOKEN_KEY;
			let _userKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_USER_KEY;
			//
			// _storage.removeItem(_userKey);
			// _storage.removeItem(_tokenKey);
			//
			// let protocol = location.protocol;
			// let hostName = location.hostname;
			// let port = location.port;
			//
			// var ssoUrl = protocol + "//" + hostName;
			// if (port != "" && port != "443") ssoUrl += ":" + port;
			//
			//window.location.href = "/login";
		}
		/*
			http status가 200이 아닌 경우
			응답 에러 처리를 작성합니다.
			이곳 먼저 처리 후 화면단에서 호출한 .catch() 으로 이어집니다.
		*/
		return Promise.reject(error);
		//return error.response;
	}
);


// 생성한 인스턴스를 익스포트 합니다.
export default instance;