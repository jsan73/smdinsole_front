import api from '@/api/api';
import http from '@/api/http';
import {mapActions, mapState} from "vuex";
import jwt from "vue-jwt-decode";
import utils from "@/utils/utils";


export default {
    name: "Login",
    data() {
        return {
            checkGuard: true,
            guardPhone: '',
            guardPwd: '',
            cnfGuardPwd: '',
            guardNo: 0,
            mktAgree: 'N',
            autoLogin: 'N',
            refreshToken  : ''
        };
    },
    methods: {
        ...mapActions("guardStore", ["commitGuardInfo", "commitToken"]),

        // async login() {
        //     const params = {guardPhone: this.guardPhone, guardPwd: this.guardPwd};
        //     console.log(params);
        //     const res = await api.login(params);
        //     console.log(res)
        //     if(res.data.status === "SUCCESS") {
        //         let tokenData = res.data.data
        //         _sotrage.setItem(process.env.VUE_APP_TOKEN_KEY, tokenData);
        //         http.setToken(tokenData);
        //         await this.$router.replace("/");
        //         //window.location.href = "/device/list";
        //         console.log("메인 이동");
        //     }else{
        //         console.log("FAIL")
        //     }
        // }
        // setStorage(tokenData) {
        //     _storage.setItem(process.env.VUE_APP_TOKEN_KEY, tokenData);
        //     let decodeToken = jwt.decode(tokenData);
        //     if (decodeToken) {
        //         let userData = JSON.stringify(decodeToken);
        //         _storage.setItem(_userKey, userData);
        //         http.setToken(tokenData);
        //     }
        // },
        async tmpPwd() {
            let res = await api.tmpPwd();
            if(res.data.status === "SUCCESS") {
                if(res.data.data > 0) {
                    this.$toast.bottom("임시 비밀번호가 문자 발송 되었습니다.");
                }else{
                    this.$toast.bottom("임시 비밀번호 발급이 실패했습니다.");
                }
            }
        },
        login() {
            if(utils.isEmpty(this.guardPhone)) {
                this.$toast.bottom("핸드폰 번호를<br>입력해 주세요.");
                return;
            }
            if(utils.isEmpty(this.guardPwd)) {
                this.$toast.bottom("비밀 번호를<br>입력해 주세요.");
                return;
            }
            const params = {guardPhone: this.guardPhone, guardPwd: this.guardPwd, autoLogin:this.autoLogin};
            api.loginChk(params).then(res => {
                if(res.data.status === "SUCCESS") {
                    if(res.data.data === 0) {
                        api.login(params).then(res => {
                            console.log(res.data)
                            if(res.data.status === "SUCCESS") {
                                let tokenData = res.data.data.token
                                let refreshToken = res.data.data.refreshToken;

                                let payload = {guardPhone: this.guardPhone, autoLogin: this.autoLogin, refreshToken: refreshToken};
                                this.commitGuardInfo(payload);
                                this.commitToken(tokenData);
                                http.setToken(tokenData);

                                if(this.autoLogin ==="Y") {
                                    const payload = {method: 'putAppData', key: "password", value: this.guardPwd};
                                    this._callNative(payload);
                                }

                                this.$router.replace("/");
                            }
                        }).catch(e => {
                            // 로그인 실패
                            // this.openPopup(e.response.data.message, true, false);
                            this.$toast.bottom(e.response.data.message);

                        });
                    }else{
                        // 비밀번호 등록 및 가입
                        this.guardNo = res.data.data;
                        this.checkGuard = false;
                    }
                }
            }).catch(e=>{
                // 등록되지 않은 사용자
                this.openPopup(e.response.data.message, true, false);

            })
        },
        regist() {
            if(this.guardPwd !== this.cnfGuardPwd) {
                this.openPopup("비밀번호가 일치하지 않습니다.", true, false);
                return false;
            }
            if(this.mktAgree === "N") {
                this.$toast.bottom("개인정보 수집 동의에 체크해 주세요.");
                return false;
            }

            const params = {guardNo: this.guardNo, guardPhone: this.guardPhone, guardPwd: this.guardPwd};
            api.regist(params).then(res => {
                if(res.data.status === "SUCCESS") {
                    //this.$router.replace("/login");
                    this.$toast.bottom("가입 되었습니다.");
                    this.checkGuard = true;
                }
            }).catch(e =>{
                this.$toast.bottom(e.response.data.message);
            })
        },
        autoLoginPwd(pwd) {
            this.guardPwd = pwd;
            setTimeout(() => {
            this.login();
            }, 500);
        },
        goTerm() {
            const payload = {method: 'openWebView', url: process.env.VUE_APP_URL +"/termprivacy"};
            this._callNative(payload);
            //his.$router.push("termprivacy");
        }

    },
    computed:{
        ...mapState("guardStore", ['guardInfo', 'getToken'] )


    },
    created() {
        let guardInfo = this.guardInfo;

        if(utils.isNotEmpty(guardInfo)) {
            this.guardPhone = guardInfo.guardPhone;
            this.autoLogin = guardInfo.autoLogin;
            this.refreshToken = guardInfo.refreshToken;

            if(this.isApp && this.autoLogin === "Y" && utils.isEmpty(this.getToken)) {
                const payload = {method: 'getAppData', key: "password", callback: 'autoLoginPwd', interface: 'Login'};
                this._callNative(payload);
            }

            // if(this.autoLogin) {
            //     api.relogin(this.refreshToken).then(res => {
            //         if (res.data.status === "SUCCESS") {
            //             let tokenData = res.data.data
            //             this.setStorage(tokenData);
            //                 this.$router.replace("/");
            //         }
            //     })
            // }
        }
    },
    beforeMount() {
        window['InterfaceLogin'] = {
            components   : this,
            autoLoginPwd: (data) => this.autoLoginPwd(data),
        };
    },
    beforeDestroy() {
        delete window['InterfaceLogin'];
    },
}