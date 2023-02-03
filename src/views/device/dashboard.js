import api from '@/api/api';
import {mapState, mapActions} from 'vuex';
import DeviceHeader from "@/views/device/DeviceHeader";
import utils from "@/utils/utils";

export default {
    name: "Dashboard",
    components: {DeviceHeader},
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
            styles:'width:100%;  height: 500px;'
        };
    },
    methods: {
        ...mapActions("guardStore", ['commitChoiceDevice']),
        addMarker(marker, icon, content) {
            this.markers.push({position: marker, icon: icon, content:content});
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
            const res = await api.getLocation(deviceNo);
            if(res.data.status === "SUCCESS") {
                this.location = res.data.data
                if(utils.isNotEmpty(this.location)) {
                    this.center.lat = this.location.lat;
                    this.center.lng = this.location.lng;

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
        moveControl(url) {
            this.$router.push('control');
        },
        requestLocation(data) {
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

        }
    },
    created() {

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
            components   : this,
            requestLocation: (data) => this.requestLocation(data),
        };
    },
    beforeDestroy() {
        delete window['InterfaceLocation'];
    },

}