import api from '@/api/api';
import {mapState, mapActions} from 'vuex';
import DeviceHeader from "@/views/device/DeviceHeader";
import Footer from "@/views/device/Footer.vue"
import utils from "@/utils/utils";
import Loading from "@/components/common/Loading.vue";

export default {
    name: "Dashboard",
    components: {Loading, DeviceHeader, Footer},
    data() {
        return {
            deviceList : "",
            device:'',
            location:'',
            range:'',
            center : {
                lat:0,
                lng:0,
            },
            markers:[],
            circles:[],
            styles:'width:100%;  height: 75vh;',
            auto_reload:false,
            auto_reload_delay: 60 * 1000,
            auto_reload_func:null,
            request_loc_time:0,
            request_interval:null,
            loading_yn: "N",
            device_status: 1
        };
    },
    methods: {
        ...mapActions("guardStore", ['commitChoiceDevice']),
        addMarker(marker, icon, date) {
            // console.log(this.markers.length)
            // if(this.markers.length > 0) this.markers.pop()
            let is_same = false;
            for(let center of this.markers) {
                // console.log(center.position)
                if(center.position === marker) is_same = true;
            }
            if(!is_same)
                this.markers.push({position: marker, icon: icon, date:date});
            // console.log(this.markers)

        },
        addCircle(center, radius) {
            let option ={
                fillColor: '#7BFF70',
                fillOpacity: 0.1,
                // strokeWeight: 1,
                strokeColor: '#7BD6CE',
                strokeOpacity: 0.9,
                radius: radius
            }
            this.circles.push({center: center, option:option})
        },
        async selDeviceList() {
            const res = await api.selDeviceList();
            if(res.data.status === "SUCCESS") {
                this.deviceList = res.data.data

                if(this.deviceList.length > 0) {

                    this.deviceList.forEach(device => {
                        if (this.choiceDevice.deviceNo == device.deviceNo || this.choiceDevice.deviceNo == 0) {
                            this.device = device;
                            this.getLastLocation(device.deviceNo);
                            this.getActiveRange(device.deviceNo);
                            //let marker = [{position: this.center}];
                            //this.device["markers"] = marker;
                            //this.device["batteryImg"] = "/static/images/battery/" + device.battery + ".svg";

                            this.commitChoiceDevice(device);

                            return false;
                        }
                    });
                }
            }
        },
        async getLastLocation(deviceNo) {
            this.center.lat = 0;
            this.center.lng = 0;
            const res = await api.getLocation(deviceNo);
            // console.log("GET : " + deviceNo);
            if(res.data.status === "SUCCESS") {
                if(utils.isNotEmpty(this.location) && utils.isNotEmpty(res.data.data) && this.location.reportDate < res.data.data.reportDate) {
                    // clearInterval(this.request_interval)
                    this.$toast.bottom("새로운 위치가 수신 되었습니다.");
                    this.hideAlert()
                    this.loading_yn = "N"
                    // console.log("새로운 위치 수신")
                }

                this.location = res.data.data
                if(utils.isNotEmpty(this.location)) {
                    this.center.lat = this.location.lat;
                    this.center.lng = this.location.lng;
                    //this.location.battery = Math.floor(Math.random() * 5);

                    const icon = {
                        url : utils.getPinImage(this.location.status)
                    }
                    const date = {
                        map : utils.convertFromStrToDate(this.location.reportDate)
                    }
                    this.addMarker(this.center, icon, date);
                    this.getLocInfo();

                    this.device_status = utils.getBatteryStatus(this.location.status, this.location.reportDate)
                }else{
                    this.location = {
                        battery:0,
                        status:0,
                    }
                }
            }
        },
        getLocInfo() {
            var geocoder = new window.google.maps.Geocoder();
            for (let i = 0; i < this.markers.length; i++) {
                var rel = new window.google.maps.LatLng(this.markers[i].position.lat, this.markers[i].position.lng);
                geocoder.geocode({'latLng': rel}, async function (results, status) {
                    if (status == 'OK') {
                        this.markers[i].addr = results[0]['formatted_address'].replace("대한민국 ", '');
                        // console.log(this.markers[i].addr)
                    } else {
                        this.markers[i].addr = "주소 정보가 없습니다.";
                    }
                }.bind(this));
            }
        },
        async getActiveRange(deviceNo) {
            const res = await api.selActiveRangeList(deviceNo);
            if(res.data.status === "SUCCESS") {
                const rangeList = res.data.data
                if(utils.isNotEmpty(rangeList) && rangeList.length > 0) {
                    this.range = rangeList[0];
                }
                rangeList.forEach((range, index) => {
                    //if(index == 0) {
                        let activeMarker = {lat: range.lat, lng: range.lng};
                        const icon = {
                            url: "/static/images/Pin_OK.svg"
                        }
                        const date = {
                            map : range.rangeName
                        }
                        this.addMarker(activeMarker, icon, date);

                        this.addCircle(activeMarker, range.radius);
                    //}
                })
            }
        },
        async getActiveRange_old(deviceNo) {
            const res = await api.selActiveRangeList(deviceNo);
            if(res.data.status === "SUCCESS") {
                const rangeList = res.data.data
                if(utils.isNotEmpty(rangeList) && rangeList.length > 0) {
                    this.range = rangeList[0];
                    //this.addCercle(this.center, this.circleOption);
                    let activeMarker = {lat:this.range.lat, lng:this.range.lng};
                    const icon = {
                        url : "/static/images/Pin_OK.svg"
                    }
                    this.addMarker(activeMarker, icon);

                    this.addCircle(activeMarker, this.range.radius);
                }
            }
        },
        moveControl() {
            this.$router.push('devicecontrol');
        },
        requestLocation() {
            clearInterval(this.request_interval)
            this.loading_yn = "N"
            this.hideAlert()
            this.getLastLocation(this.choiceDevice.deviceNo)
        },
        sendLocation() {
            navigator.geolocation.getCurrentPosition(position => {
                // this.setMap(position.coords.latitude, position.coords.longitude);
                // this.getAddress(position.coords.latitude, position.coords.longitude);
                let param = {
                    deviceIMEI : this.choiceDevice.deviceIMEI,
                    location : "NTY," + position.coords.latitude +"," + position.coords.longitude + ",18," + utils.getNowDateToStr()
                }

                api.sendLocation(param);
            });
        },
        sendLocation2(position) {

                let param = {
                    deviceIMEI : this.choiceDevice.deviceIMEI,
                    location : "NTY," + position.lat() +"," + position.lng() + ",18," + utils.getNowDateToStr()
                }

                api.sendLocation(param);

        },
        start_auto_reload() {
            console.log("start!!");
            this.auto_reload = true;
            this.auto_reload_func = setInterval(() => {
                this.getLastLocation(this.choiceDevice.deviceNo);
            }, this.auto_reload_delay)
        },
        stop_auto_reload() {
            console.log("stop!!");
            this.auto_reload = false;
            clearInterval(this.auto_reload_func);
        },
        // 현재위치 요청
        reload() {
            // this.$router.go(0)
            this.loading_yn = "N"
            this.getLastLocation(this.choiceDevice.deviceNo);
        },

        start_timer(){
            // this.request_interval = setInterval(() => {
                // console.log(new Date())
                let now_time = new Date()
                let diff = utils.getTimeDiff(now_time, this.request_loc_time)
                this.getLastLocation(this.choiceDevice.deviceNo);
                // 위치 요청 후 Alert에서 3분 카운트 후 start_timer를 재 호출 함
                // 재 요청 시간을 변경 해야 하는 경우에는 여기와 Alert에서 같이 변경 해주어야 한다.
                if (diff > 3) {
                    this.updatePopup("위치 요청을 다시 시도 하시겠습니까?", true, true, this.retry_ready, null,2);
                    // clearInterval(this.request_interval)
                    this.loading_yn = "N"
                }
                // console.log(diff)
                // clearInterval(this.request_interval)
            // }, 2000)
        },
        start_request_loc() {
            this.request_loc_time = new Date()
            this.start_timer()
            this.loading_yn = "Y"
            // setTimeout(this.getLastLocation, 5000, this.choiceDevice.deviceNo)
        },
        retry_ready() {
            console.log("위치 요청 다시 시작")
            this.request_loc_time = new Date()
            this.updatePopup("위치 요청 후 수신을 기다리고 있습니다.", false, true, this.start_timer, null, 3);
        },
        async reqloc() {
            if (this.device_status === 0) {
                this.openPopup("기기 전원이 꺼져 있어 위치 수신이 불가능 합니다.", true, false, this.hideAlert);
                return;
            }
            const res = await api.reqCurrentLocation(this.choiceDevice.deviceIMEI);
            if(res.data.status === "SUCCESS") {
                if (res.data.data > 0)
                    this.openPopup("위치 요청 후 수신을 기다리고 있습니다.", false, true, this.start_timer,null, 3);
                else
                    this.openPopup("현재 위치 정보가 없습니다.<br>잠시 후에 다시 요청해 주세요.", true, false, this.hideAlert);
            }
            this.start_request_loc();

        }
    },
    created() {
        this.start_auto_reload();
        //this.selDeviceList();
    },
    mounted() {
        this.selDeviceList();
    },
    computed:{

        ...mapState("guardStore", ['choiceDevice'] ),

    },

    beforeMount() {
        window['InterfaceLocation'] = {
            // 위치 정보 요청후 push로 위치 수신 받으면 실행
            components   : this,
            requestLocation: (data) => this.requestLocation(data),
        };
    },
    beforeDestroy() {
        delete window['InterfaceLocation'];
    },
    destroyed() {
        this.stop_auto_reload();
        clearInterval(this.request_interval)
    }

}