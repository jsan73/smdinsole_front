import api from '@/api/api';

let _sotrage = window.sessionStorage

export default {
    name: "Dashboard",
    data() {
        return {
            shoesList : ""
        };
    },
    methods: {
        async selShoesList() {
            const res = await api.selShoesListesList();
            if(res.data.status === "SUCCESS") {
                this.shoesList = res.data.data

                this.shoesList.forEach(shoes => {
                    let marker = [{position: { lat: shoes.lat, lng: shoes.lon }}];
                    shoes["markers"] = marker;
                });
            }
        }
    },
    created() {
        this.selShoesList();
    }
}