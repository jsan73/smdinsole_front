<template>
  <div class="offcanvas offcanvas-bottom" data-bs-backdrop="false" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">알림 설정</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" @click="$emit('update:visible', false)"></button>
    </div>
    <div class="offcanvas-body">
      <!--
      <ul class="offcanvas_List form-check">
      <li><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
      <label class="form-check-label" for="flexRadioDefault1">내일 아침 9시까지 알림 해제</label></li>
      <li>3시간 알림 해제</li>
      <li>6시간 알림 해제</li>
      <li>12시간 알림 해제</li>
      <li>다음 설정시까지 알림 해제</li>
      </ul>
      -->

      <div v-if="notice" class="offcanvas-body">
        <p class="m-4 text-center" v-if="notice.notiCd === 'NC99'">알림을 받으려면<br>다시 설정해야 합니다.</p>
        <p class="m-4 text-center" v-else>{{notice.displayDay}}시까지 <br>알림이 해제됩니다.</p>
        <div class="m-4 text-center">
          <button type="button" @click="resetNotice" class="btn btn-style-1 btn-sm w-50">지금 알림 설정하기</button>
        </div>
      </div>

      <div v-else class="form-check offcanvas_List" v-for="code in noticeList">
        <input class="form-check-input" v-model="noticeOption" type="radio" name="exampleRadios" :id="code.codeCd" :value="code">
        <label class="form-check-label" :for="code.codeCd">
          {{ code.codeNm }}
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/api/api";
import {mapState} from "vuex";
import utils from "@/utils/utils";


export default {
  name: "NoticeLayer",
  props:{
    visible:false,
  },
  data() {
    return {
      noticeList:[],
      noticeOption: {
        codeValue:''
      },
      notice: {
        shoesNo:0,
        guardNo:0,
        notiCd:'',
        nextNotiTime:'',
        displayDay:''
      }


    }
  },

  watch: {
    noticeOption() {
      if(utils.isNotEmpty(this.noticeOption.codeValue)) this.setNotice(this.noticeOption.codeValue);
    },
    visible() {
      if(this.visible) {
        //console.log("알림 설정 가져오기")
        this.initChoice();
        //console.log(this.noticeOption)
        this.getNoticeStatus();
      }

    }
  },
  methods: {
    initChoice() {
      this.noticeOption = {codeValue: ''};
    },
    setNotice(optionValue) {
      let params ={shoesNo:this.choiceDevice.shoesNo, notiCd:this.noticeOption.codeCd};
      api.setNotice(params, optionValue).then(res => {
        if(res.data.status === "SUCCESS") {
          this.getNoticeStatus().then(()=>{
            if(utils.isNotEmpty(this.notice)) {
              if(this.notice.notiCd === 'NC99')
                this.openPopup("알림을 해제합니다.<br>알림을 받으려면<br>다시 설정해야 합니다.", true, false);
              else
                this.openPopup(this.notice.displayDay + "까지<br>알림이 해제됩니다.", true, false);
            }else{
              this.openPopup("알림이 설정 되었습니다.", true, false);
            }
            $('.offcanvas').offcanvas('hide');
            this.$emit('update:visible', false);
          })
        }
      })
    },
    resetNotice(){
      this.noticeOption.codeValue = '100';
      this.setNotice(this.noticeOption.codeValue);
    },
    async getNoticeStatus() {
      let res = await api.getNotice(this.choiceDevice.shoesNo);
      if(res.data.status === "SUCCESS") {
        this.notice = res.data.data;
        if(utils.isNotEmpty(this.notice)) {
          if(this.notice.notiCd !== "NC99") {
            const nextTime = new Date(utils.convertFromStrToDate(this.notice.nextNotiTime));
            const today = new Date();
            const diffDate = utils.getDatediff(today, nextTime);

            this.notice.displayDay =  (diffDate < 1)? "오늘 ":"내일 ";
            const hours = nextTime.getHours() < 12 ? "오전 " + nextTime.getHours() :"오후 " + (nextTime.getHours()-12);
            this.notice.displayDay += hours;

          } else {
            // 무한 해제
          }
        }else {
          //console.log(this.notice);
        }
      }
    },
    async selCodeList() {
      let res = await api.selCodeList("NOTI");
      if(res.data.status === "SUCCESS") {
        this.noticeList = res.data.data;
      }
    }
  },
  created() {
    this.getNoticeStatus();
    this.selCodeList();
  },
  computed:{
    ...mapState("guardStore", ['choiceDevice'] ),
  }
}
</script>

<style scoped>

</style>