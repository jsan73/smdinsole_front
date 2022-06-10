import api from '@/api/api';
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
    name: "Dashboard",
    data() {
        return {
            shoesList : "",
            shoes : {
                lat:0,
                lon:0,
            }
        };
    },
    methods: {
        async selShoesList() {
            const res = await api.selShoesList();
            if(res.data.status === "SUCCESS") {
                this.shoesList = res.data.data

                if(this.shoesList.length > 0) {

                    this.shoesList.forEach(shoes => {
                        if (this.choiceDevice == shoes.shoesNo) {
                            this.shoes = shoes;

                            let marker = [{position: {lat: this.shoes.lat, lng: this.shoes.lon}}];
                            this.shoes["markers"] = marker;
                            this.shoes["batteryImg"] = "/static/images/battery/" + shoes.battery + ".svg";
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
        this.selShoesList();
    },
    computed:{
        ...mapState("guardStore", ['choiceDevice'] ),

    },
}