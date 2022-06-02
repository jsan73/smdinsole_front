import api from '@/api/api';
import http from '@/api/http';
import {mapActions} from "vuex";

let _sotrage = window.sessionStorage

export default {
    name: "Login",
    data() {
        return {
            guardPhone: '01052490965',
            guardPwd: '1234'
        };
    },
    methods: {
        ...mapActions("guardStore", ["commitGuardInfo"]),

        async login() {
            const params = {guardPhone: this.guardPhone, guardPwd: this.guardPwd};
            console.log(params);
            const res = await api.login(params);
            if(res.data.status === "SUCCESS") {
                let tokenData = res.data.data
                _sotrage.setItem(process.env.VUE_APP_TOKEN_KEY, tokenData);
                http.setToken(tokenData);
                await this.$router.replace("/");
                //window.location.href = "/shoes/list";
                console.log("메인 이동");
            }
        }
    }
}