// 레이아웃 유형
//import TempLayout from "./layout/TempLayout.vue"
import DefaultLayout from "./layout/DefaultLayout.vue"
//import LayerLayout from "./layout/LayerLayout.vue"
import Header from "./common/Header.vue"
import Footer from "../views/device/Footer.vue"
import GoogleMap from "./GoogleMap.vue"
import GoogleMap2 from "./GoogleMap2.vue"
import Alert from "./common/Alert.vue"
import Loading from "./common/Loading.vue"
//import Gnb from "./common/Gnb.vue"


// 공통 컴포넌트. 전역으로 설정
// import Checkbox from "@/components/Checkbox.vue"
// import Radio from "@/components/Radio.vue"
// import InputText from "@/components/InputText.vue"
// import Switcher from "@/components/Switcher.vue"
// import Selectbox from "@/components/Selectbox.vue"
// import MultiSelect from "@/components/MultiSelect.vue"
// import OrgList from "@/components/OrgList.vue"
// import SelectboxTree from "@/components/SelectboxTree.vue"
// import RangeCalendar from "@/components/RangeCalendar.vue"
// import Calendar from "@/components/Calendar.vue"
// import Textarea from "@/components/Textarea.vue"
// import Tabs from "@/components/Tabs.vue"
// import TabsRoute from "@/components/TabsRoute.vue"
// import TabSlider from "@/components/TabSlider.vue"
// import TabSliderRoute from "@/components/TabSliderRoute.vue"
// import Popup from "@/components/Alert.vue"


//외부 라이브러리
//import VueBottomSheet from "@/components/vue-bottom-sheet.vue";

export default {
	install(Vue) {
		//Layout
//		Vue.component("Temp-Layout", TempLayout);
		Vue.component("Default-Layout", DefaultLayout);
//		Vue.component("Layer-Layout", LayerLayout);
		Vue.component("Header", Header);
		Vue.component("Footer", Footer);
		Vue.component("GoogleMap", GoogleMap);
		Vue.component("GoogleMap2", GoogleMap2);
		Vue.component("Alert", Alert);
		Vue.component("Loading", Loading)
//		Vue.component("Gnb", Gnb);

		//Component
		// Vue.component("Checkbox", Checkbox);
		// Vue.component("Radio", Radio);
		// Vue.component("InputText", InputText);
		// Vue.component("Switcher", Switcher);
		// Vue.component("Selectbox", Selectbox);
		// Vue.component("MultiSelect", MultiSelect);
		// Vue.component("OrgList", OrgList);
		// Vue.component("SelectboxTree", SelectboxTree);
		// Vue.component("RangeCalendar", RangeCalendar);
		// Vue.component("Calendar", Calendar);
		// Vue.component("Textarea", Textarea);
		// Vue.component("Tabs", Tabs);
		// Vue.component("TabsRoute", TabsRoute);
		// Vue.component("TabSlider", TabSlider);
		// Vue.component("TabSliderRoute", TabSliderRoute);
		// Vue.component("Popup", Popup);
		//
		// //Plugin
		// Vue.component("VueBottomSheet", VueBottomSheet);
	}
}
