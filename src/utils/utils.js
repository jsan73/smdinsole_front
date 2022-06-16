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
    }
}