import jwt from "vue-jwt-decode";

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
            if (str.length === 11) {
                if (type === 0) {
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
    convertFromStrToDate(trgt, type=1) {
        let rst = "";
        if (this.getType(trgt) === `string` && type === 1) {
            if (/^\d{8}$/.test(trgt)) {
                rst = trgt.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3");
            } else {
                rst = trgt.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1/$2/$3 $4:$5:$6");
            }
        }else if(type === 2){
            rst = trgt.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$2월 $3일 $4:$5");
        }
        return rst;
    },
    getTimeDiff(date1, date2) {
        let d1 = new Date(date1);
        let d2 = new Date(date2);
        let diff = d2.getTime() - d1.getTime();

        // 분차이 계산
        return Math.abs(diff  / (60 * 1000));
    },
    getNowDateToStr() {
        let d = new Date();

        let rst = d.getFullYear() + "-" + this.leftPad(d.getMonth() + 1) + "-" + this.leftPad(d.getDate());
        rst +=  "T" + this.leftPad(d.getHours()) + ":" + this.leftPad(d.getMinutes()) + ":" + this.leftPad(d.getSeconds())

        return rst;
    },
    leftPad(value) {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;

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
    },
    getMask( phoneNumber ) {
        if (!phoneNumber) return phoneNumber
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

        let res = ''
        if (phoneNumber.length < 3) {
            res = phoneNumber
        } else {
            if (phoneNumber.substr(0, 2) === '02') {

                if (phoneNumber.length <= 5) {//02-123-5678
                    res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3)
                } else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {//02-123-5678
                    res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5)
                } else if (phoneNumber.length > 9) {//02-1234-5678
                    res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6)
                }

            } else {
                if (phoneNumber.length < 8) {
                    res = phoneNumber
                } else if (phoneNumber.length === 8) {
                    res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4)
                } else if (phoneNumber.length === 9) {
                    res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                } else if (phoneNumber.length === 10) {
                    res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                } else if (phoneNumber.length > 10) { //010-1234-5678
                    res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
                }
            }
        }
        return res;
    },
    getGuard(token) {
        const dToken = jwt.decode(token)
        let userInfo = dToken;

        return userInfo;
    },

    // 구글 지도 zoom level
    getGmapZoomLevel(lat, radius){
        return Math.log2(38000 * Math.cos ( lat * Math.PI / 180) / (radius/1000)*2)  - 1.5
    },
    getPinImage(status) {
        // GPS:4, CELL:5, SAVE-WIFI:6
        let iconUrl = "/static/images/Pin_NET.svg"
        switch (status) {
            case 4:
                iconUrl = "/static/images/GPS.svg"
                break;
            case 5:
                iconUrl = "/static/images/Cell.svg"
                break;
            case 6:
                iconUrl = "/static/images/WiFi.svg"
                break;
        }

        return iconUrl;
    },

    // 두 좌표간의 거리
    getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lng2-lng1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c *1000; // Distance in km
        console.log("거리 ", d)
        return d;
    },

    // 두 좌표의 중간 지점 구하기
    getCenter(lat1,lng1,lat2,lng2) {

// 위도, 경도를 라디안 단위로 변환
        const l1 = lat1 * Math.PI / 180;
        const l2 = lat2 * Math.PI / 180;
        const n1 = lng1 * Math.PI / 180;
        const n2 = lng2 * Math.PI / 180;

        const Bx = Math.cos(l2) * Math.cos(n2 - n1);
        const By = Math.cos(l2) * Math.sin(n2 - n1);
        const l3 = Math.atan2(Math.sin(l1) + Math.sin(l2),
        Math.sqrt((Math.cos(l1) + Bx) * (Math.cos(l1) + Bx) + By * By));
        const n3 = n1 + Math.atan2(By, Math.cos(l1) + Bx);

// 라디안을 디그리로 변환
        const lat3 = l3 * 180 / Math.PI;
        let lon3 = n3 * 180 / Math.PI;

// lat3 = 77.2989712658764
// lon3 = 199.60411612492646

// 경도는 −180 ~ +180 사이의 값으로 정규화 할 수 있다.
        lon3 = (lon3 + 540) % 360 - 180;
        return {lat:lat3, lng:lon3}
    },


    getBatteryImage(battery, reportDate) {

        let batteryImg = '';
        switch (battery) {
            case 0:
                batteryImg = "/static/images/battery/Warn.svg";
                break;
            case 1:
            case 2:
            case 3:
                batteryImg = "/static/images/battery/" + battery + ".svg";
                break;
            case 4:
                // 충전중
                batteryImg = "/static/images/battery/Chg.svg";
                break;
            case 5:
                // 충전완료
                batteryImg = "/static/images/battery/Complete.svg";
                break;
            default:
                // console.log("battery : " + battery)
                batteryImg = "/static/images/battery/0.svg";
        }
        let date1 = this.convertFromStrToDate(reportDate)
        let date2 = new Date()
        const diff = this.getTimeDiff(date1, date2);
        if(diff > 90) {
            // cell = "icon_none.svg";
            batteryImg = "/static/images/battery/0.svg"
        }
        return batteryImg
    },
    getNetImg(status, reportDate) {
        //(GPS:4, CELL:5, SAVE-WIFI:6,없음:7)
        let netImg = "/static/images/none.svg";
        switch (status) {
            case 4:
                netImg = "/static/images/GPS.svg";
                break;
            case 5:
                netImg = "/static/images/Cell.svg";
                break;
            case 6:
                netImg = "/static/images/WiFi.svg";
        }
        let date1 = this.convertFromStrToDate(reportDate)
        let date2 = new Date()
        const diff = this.getTimeDiff(date1, date2);
        if(diff > 90) {
            netImg = "/static/images/none.svg"
        }
        return netImg
    },


}