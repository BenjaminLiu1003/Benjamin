<template>
  <div class="d-flex jc-between">
    <div class="d-flex aside-width">
      <!-- <img src="@/assets/img/logo.png" /> -->
      <!-- <span>JCT Monitor</span>
      <div class="react-left ml-4"
           v-for="(item, index) in subtitle"
           :key="index"
           :class="currentIndex==index?'active':''"
           @click="switchTab(index)">
        <span class="text">{{ t(item) }}</span>
      </div> -->
      <div class="react-left ml-4">
        Host
        <el-select v-model="host"
                   class="m-2"
                   placeholder="Select"
                   size="large"
                   @change="selectHost">
          <el-option v-for="item in hosts"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </div>
      <!-- <div class="react-left ml-4" @click="click1">
              <span class="react-before"></span>
              <span class="text">{{ subtitle[0] }}</span>
            </div>
            <div class="react-left ml-4">
              <span class="text">{{ subtitle[1] }}</span>
            </div>
            <div class="react-left ml-4">
              <span class="text">{{ subtitle[2] }}</span>
            </div>
            <div class="react-left ml-4">
              <span class="text">{{ subtitle[3] }}</span>
            </div> -->
    </div>
    <div class="d-flex aside-width">
      <div class="react-right mr-1 react-l-s">
        <span class="react-after"></span>
        <span class="text">
          {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
          {{ timeInfo.dateDay }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useI18n } from "vue-i18n";
// import { useRouter } from "vue-router";
// import { getCurrentInstance } from 'vue'
import { ref, reactive, onBeforeUnmount, onMounted, watch, defineEmits } from "vue";
import { formatTime } from "@/utils/index";
import { subtitle, WEEK } from "@/constant/index";
import router from "@/router/index";
import connect from "../connector.vue"

const emit = defineEmits([
  'on-select',
])

// const { t } = useI18n();
// const router = useRouter();
// * 当前选中的Tab页
let currentIndex = ref(1);
// * 时间内容
const timeInfo = reactive({
  setInterval: 0,
  dateDay: "",
  dateYear: "",
  dateWeek: "",
});

let host = ref(null)
const hosts = [
  {
    value: "fpis-kbsiml14",
    label: "fpis-kbsiml14",
  },
  {
    value: "fpis-kbsiml35",
    label: "fpis-kbsiml35",
  },
  {
    value: "fpis-kbsiml66",
    label: "fpis-kbsiml66",
  },
];

// 生命周期
onBeforeUnmount(() => {
  clearInterval(timeInfo.setInterval);
});

watch(
  () => router,
  (newValue, oldValue) => {
    console.log(newValue);
    currentIndex.value = subtitle.indexOf(
      newValue.currentRoute.value.name.toString()
    );
  },
  { immediate: true }
);

const switchTab = (index) => {
  currentIndex.value = index;
  // router.push(subtitle[index])
};

const selectHost = (value) => {
  console.log(value)
}

// todo 处理时间监听
const formatTimeInfo = () => {
  const date = new Date();
  timeInfo.dateDay = formatTime(date, "HH: mm: ss");
  timeInfo.dateYear = formatTime(date, "yyyy-MM-dd");
  timeInfo.dateWeek = WEEK[date.getDay()];
};

const handleTime = () => {
  timeInfo.setInterval = setInterval(() => {
    formatTimeInfo();
  }, 1000);
};

formatTimeInfo();
handleTime();
// return
// return {
//   t,
//   timeInfo,
//   subtitle,
//   currentIndex,
//   hosts,
//   switchTab,
// };

</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
</style>
