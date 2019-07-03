import Vue from 'vue';

function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://api.jugemkey.jp/api/horoscope/free/2013/04/10");
oReq.send();

Vue.component("member-list", {
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  template:
    "<div>" +
    '<input type="checkbox" v-model="member.checked">' +
    "<span> {{ member.name }}　{{ member.month }}/{{ member.day }}　{{ member.zodiacSign }}</span>" +
    '<button type="button" v-on:click="onClickRemove">×</button>' +
    "</div>",
  methods: {
    onClickRemove: function() {
      this.$emit("remove");
    }
  }
});

var vm = new Vue({
  el: "#roulette",
  data: {
    members: [
      { checked: true, name: "member1", month: "1", day: "1", zodiacSign: "山羊座" },
      { checked: true, name: "member2", month: "2", day: "2", zodiacSign: "水瓶座" }
    ],
    name: "",
    month: "",
    day: "",
    assigned: "shikai",
    isStarting: false
  },
  computed: {
    buttonLabel() {
      return this.isStarting ? "stop" : "start";
    }
  },
  methods: {
    start() {
      if (this.isStarting) {
        this.isStarting = false;
      } else {
        this.isStarting = true;
        const target = this.members.filter(m => m.checked).map(m => m.name);
        const interval = setInterval(() => {
          this.assigned = target[Math.floor(Math.random() * target.length)];
          if (!this.isStarting) {
            clearInterval(interval);
          }
        }, 10);
      }
    },
    addMember: function() {
      if (this.name !== "") {
        this.members.push({
          checked: true,
          name: this.name,
          month: this.month,
          day: this.day,
          zodiacSign: this.getZodiacSign()
        });
        this.name = "";
        this.month = "";
        this.day = "";
      }
    },
    getZodiacSign: function() {
      if (this.month !== "" && this.day !== "") {
        if (this.checkZodiacSignDateRange(1, 20, 2, 18)) {
          return "水瓶座";
        } else if (this.checkZodiacSignDateRange(2, 19, 3, 20)) {
          return "魚座";
        } else if (this.checkZodiacSignDateRange(3, 21, 4, 19)) {
          return "牡羊座";
        } else if (this.checkZodiacSignDateRange(4, 20, 5, 20)) {
          return "牡牛座";
        } else if (this.checkZodiacSignDateRange(5, 21, 6, 21)) {
          return "双子座";
        } else if (this.checkZodiacSignDateRange(6, 22, 7, 22)) {
          return "蟹座";
        } else if (this.checkZodiacSignDateRange(7, 23, 8, 22)) {
          return "獅子座";
        } else if (this.checkZodiacSignDateRange(8, 23, 9, 22)) {
          return "乙女座";
        } else if (this.checkZodiacSignDateRange(9, 23, 10, 23)) {
          return "天秤座";
        } else if (this.checkZodiacSignDateRange(10, 24, 11, 22)) {
          return "蠍座";
        } else if (this.checkZodiacSignDateRange(11, 23, 12, 21)) {
          return "射手座";
        } else {
          return "山羊座";
        }
      }
    },
    checkZodiacSignDateRange: function(firstDateMonth, firstDateDay, lastDateMonth, lastDateDay) {
      const first = new Date(2019, firstDateMonth - 1, firstDateDay);
      const last = new Date(2019, lastDateMonth - 1, lastDateDay);
      const birthDay = new Date(2019, this.month - 1, this.day);
      return first <= birthDay && birthDay <= last;
    }
  }
});
