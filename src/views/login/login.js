import api from '@/api/common';

export default {
    name: "Login",
    data() {
        return {
            guardPhone: '01052490965',
            guardPwd: '1234'
        };
    },
    methods: {
        async login() {
            const params = {guardPhone: this.guardPhone, guardPwd: this.guardPwd};
            console.log(params);
            const res = await api.login(params);
            if(res.data.status === "SUCCESS") {
                console.log("메인 이동");
            }
        }
    }
}