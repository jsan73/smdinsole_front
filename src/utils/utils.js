export default {
    //Object 널체크
    isEmptyObject(obj) {
        if (this.isObject(obj)) {
            return (Object.keys(obj).length === 0 && obj.constructor === Object) ||
                (obj.length === 0 && obj.constructor === Array);
        }
    },
    //Object 널체크
    isNotEmptyObject(obj) {
        if (this.isObject(obj)) {
            return !this.isEmptyObject(obj);
        }
    },
    //String 빈값 체크
    isNotEmpty(str) {
        return !this.isEmpty(str);
    },
    //String 빈값 체크
    isEmpty(str) {
        return str === null || str === undefined || "" === str;
    },
    //Object 체크
    isObject(obj) {
        if (this.isEmpty(obj)) return false;
        return typeof obj === 'object'
    },
    // String null 체크
    isNull(str) {
        return str === undefined || str === null;
    },
    // String null 체크
    isNotNull(str) {
        return !this.isNull(str);
    },

    telForm(str, type) {
        let rs = "";
        if (this.isNotEmpty(str)) {
            if (str.length == 11) {
                if (type == 0) {
                    rs = str.replace(/(\d{3})(.{4})(\d{4})/, '$1-****-$3');
                } else {
                    rs = str.replace(/(\d{3})(.{4})(\d{4})/, '$1-$2-$3');
                }
            }
        }
        return rs;
    },

    // 파라미터의 타입 확인(소문자로 리턴)
    getType(trgt) {
        return Object.prototype.toString.call(trgt).slice(8, -1).toLowerCase();
    },
    // 문자형을 날짜형으로 데이터 변환
    convertFromStrToDate(trgt) {
        let rst = "";
        if (this.getType(trgt) === `string`) {
            if (/^\d{8}$/.test(trgt)) {
                rst = trgt.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3");
            } else {
                rst = trgt.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1/$2/$3 $4:$5:$6");
            }
        }
        return rst;
    },

    getDatediff(date1, date2){
        let d1 = new Date(this.getYmd10(date1));
        let d2 = new Date(this.getYmd10(date2));

        const diffDate = d2.getTime() - d1.getTime();
        return Math.abs(diffDate / (1000 * 60 * 60 * 24));

    },
    getYmd10(d) {
        //yyyy-mm-dd 포맷 날짜 생성
        return d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
    }

}