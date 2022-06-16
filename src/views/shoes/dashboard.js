import api from '@/api/api';
import {mapState, mapActions} from 'vuex';

export default {
    name: "Dashboard",
    data() {
        return {
            shoesList : "",
            shoes:'',
            center : {
                lat:0,
                lng:0,
            },
            markers:[],
            circles:[],

        };
    },
    methods: {
        ...mapActions("guardStore", ['commitChoiceDevice']),
        addMarker(marker) {
            this.markers.push({position: marker});
        },
        addCircle(center, radius) {
            let option ={
                fillColor: '#0000FF',
                fillOpacity: 0.3,
                strokeWeight: 1,
                strokeColor: '#0000FF',
                radius: radius
            }
            this.circles.push({center: center, option:option})
        },
        async selShoesList() {
            const res = await api.selShoesList();
            if(res.data.status === "SUCCESS") {
                this.shoesList = res.data.data

                if(this.shoesList.length > 0) {

                    this.shoesList.forEach(shoes => {
                        if (this.choiceDevice.shoesNo == shoes.shoesNo || this.choiceDevice.shoesNo == 0) {
                            this.shoes = shoes;
                            this.center.lat = shoes.lat;
                            this.center.lng = shoes.lng;

                            this.addMarker(this.center);
                            //this.addCercle(this.center, this.circleOption);
                            let activeMarker = {lat:shoes.activeLat, lng:shoes.activeLng};
                            this.addMarker(activeMarker);

                            this.addCircle(activeMarker, shoes.radius);

                            console.log(this.circles)
                            //let marker = [{position: this.center}];
                            //this.shoes["markers"] = marker;
                            this.shoes["batteryImg"] = "/static/images/battery/" + shoes.battery + ".svg";

                            this.commitChoiceDevice(shoes);
                            return false;
                        }
                    });
                }
            }
        },
        move(url) {
            this.$router.push(url);
        }
    },
    created() {

        //this.selShoesList();
    },
    mounted() {
        this.selShoesList();
    },
    computed:{

        ...mapState("guardStore", ['choiceDevice'] ),

    },
}