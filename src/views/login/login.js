import api from '@/api/common';

export default {
    name: "Login",
    data() {
        return {
            guardPhone: '',
            guardPwd: ''
        };
    },
    methods: {
        async loginForm() {
            const params = {guardPhone: this.guardPhone, guardPwd: this.guardPwd};
            const res = await api.login(params);
            if(res.data.status === "SUCCESS") {
                console.log("메인 이동");
            }
        }
    }
}