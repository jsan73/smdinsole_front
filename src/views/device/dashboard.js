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
            styles:'width:100%;  height: 500px;',
            auto_reload:false,
            auto_reload_delay: 60 * 1000,
            auto_reload_func:null,
            request_loc_time:0,
            request_interval:null,
            loading_yn: "N"
        };
    },
    methods: {
        ...mapActions("guardStore", ['commitChoiceDevice']),
        addMarker(marker, icon, content) {
            // console.log(this.markers.length)
            // if(this.markers.length > 0) this.markers.pop()
            let is_same = false;
            for(let center of this.markers) {
                console.log(center.position)
                if(center.position === marker) is_same = true;
            }
            if(!is_same)
                this.markers.push({position: marker, icon: icon, content:content});
            console.log(this.markers)

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
            console.log("GET : " + deviceNo);
            if(res.data.status === "SUCCESS") {
                this.location = res.data.data
                console.log(this.location)
                if(utils.isNotEmpty(this.location)) {
                    this.center.lat = this.location.lat;
                    this.center.lng = this.location.lng;
                    //this.location.battery = Math.floor(Math.random() * 5);
                    console.log(this.center)

                    const icon = {
                        url : utils.getPinImage(this.location.status)
                    }
                    this.addMarker(this.center, icon, utils.convertFromStrToDate(this.location.reportDate));
                }else{
                    this.location = {
                        battery:0,
                        status:0,
                    }
                }
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
                        this.addMarker(activeMarker, icon, range.rangeName);

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
        reload() {
            // this.$router.go(0)
            this.loading_yn = "N"
            this.getLastLocation(this.choiceDevice.deviceNo);
        },

        start_timer(){
            this.request_interval = setInterval(() => {
                // console.log(new Date())
                let now_time = new Date()
                let diff = utils.getTimeDiff(now_time, this.request_loc_time)
                if (diff > 5) {
                    this.openPopup("현재 위치 정보가 없습니다.<br>잠시 후에 다시 요청해주세요.", true, false, this.hideAlert);
                    clearInterval(this.request_interval)
                    this.loading_yn = "N"
                }
                console.log(diff)
                // clearInterval(this.request_interval)
            }, 2000)
        },
        reqloc() {
            this.request_loc_time = new Date()
            this.start_timer()
            this.loading_yn = "Y"
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