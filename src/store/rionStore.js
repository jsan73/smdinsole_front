//import common from "../views/mypg/common/common";
//import notiApi from '@/api/admin/noti';

const rionStore={
	namespaced: true,
	state: {
		isKeepAlive: false,
		pushMsgCnt: 0,
		rprtList: [],
		rprtIns: {},
	},
	mutations: {
		CHNG_KEEP_ALIVE: (state, payload) => {
			state.isKeepAlive = payload ?? false;
		},
		CHNG_PUSH_MSG_CNT: (state, payload) => {
			state.pushMsgCnt = payload;
		},
		CHNG_PUSH_MSG: (state, payload) => {
			let cnt = 0;
			if(payload !== undefined && payload !== null && Object.prototype.toString.call(payload).slice(8, -1).toLocaleLowerCase() === 'array' && payload.length > 0) {
				cnt = payload.filter(el => el.readYn === 'N').length;
			}
			state.pushMsgCnt = cnt;
		},

		RPRT_MODIFY: (state, data) => {
			state.rprtList=data;
		},
		INIT_RPRT: (state) => {
			state.rprtList = [];
			state.rprtIns = {};
		},
		RPRT_INS: (state, data) => {
			state.rprtIns=data;
		}
	},
	actions: {
		// GET_PUSH_MSG_CNT : async (context) => {
		// 	try {
		// 		const userInfo = common.userInfo();
		// 		let params = {
		// 			recvId: userInfo.userNo,
		// 			recvGb: 'M',
		// 			readYn: "N",
		// 			pageNum: 1,
		// 			pageSize: 100,
		// 		};
		// 		let res = await notiApi.selNotiSend(params);
		// 		if(res.data.status === 'SUCCESS') {
		// 			const {total} = res.data.data;
		// 			context.commit('CHNG_PUSH_MSG_CNT', total);
		// 		} else {
		// 			console.error('rionStore 알림 메시지 가져오기 실패 메시지 :', res.data.message);
		// 		}
		// 	} catch(err) {
		// 		console.error('rionStore 알림 메시지 가져오기 오류', err)
		// 	}
		// },

		RPRT_MODIFY: ({ commit }, data) => {
			commit('RPRT_MODIFY', data);
		},

		INIT_RPRT: ({ commit }) => {
			commit('INIT_RPRT');
		},

		RPRT_INS: ({ commit }, data) => {
			commit('RPRT_INS', data);
		},

	},
	getters: {
		getPushMsgCnt: state => {
			return state.pushMsgCnt;
		},
	}
}

export default rionStore;