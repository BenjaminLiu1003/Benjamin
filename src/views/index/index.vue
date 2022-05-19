<template>
  <div id="index"
       ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">
        {{ t("loading") + "..." }}
      </dv-loading>
      <div v-else
           class="host-body">
        <!-- <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
            <div class="title">
              <span class="title-text">{{ title }}</span>
              <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
            </div>
            <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="['#568aea', '#000000']" />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div> -->

        <!-- 第二行 -->
        <div class="d-flex jc-between">
          <div class="d-flex aside-width">
            <!-- <img src="@/assets/img/logo.png" /> -->
            <span>Jump Trading Monitor</span>
            <div class="react-left ml-4"
                 v-for="(item, index) in subtitle"
                 :key="index"
                 :class="currentIndex==index?'active':''"
                 @click="switchTab(index)">
              <span class="text">{{ item }}</span>
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
            <!--
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">{{ subtitle[2] }}</span>
            </div>
            -->
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text">
                {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
                {{ timeInfo.dateDay }}
              </span>
            </div>
          </div>
        </div>

        <preview />
        <!-- <div class="body-box"> -->
        <!-- 第三行数据 -->
        <!-- <div class="content-box"> -->
        <!-- <div>
              <dv-border-box-12>
                <center-left1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <center-left2 />
              </dv-border-box-12>
            </div> -->
        <!-- 中间 -->
        <!-- <div>
              <center />
            </div> -->
        <!-- 中间 -->
        <!-- <div>
              <center-right1 />
            </div>
            <div>
              <dv-border-box-13>
                <center-right2 />
              </dv-border-box-13>
            </div> -->
        <!-- </div> -->

        <!-- 第四行数据 -->
        <!--
          <div class="bototm-box">
            <dv-border-box-13>
              <bottom-left />
            </dv-border-box-13>
            <dv-border-box-12>
              <bottom-right />
            </dv-border-box-12>
          </div>
          -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { formatTime } from '@/utils/index'
import { WEEK } from '@/constant/index'
import useDraw from '@/utils/useDraw'
import { title, subtitle, moduleInfo } from '@/constant/index'
import CenterLeft1 from '../centerLeft1/index.vue'
import CenterLeft2 from '../centerLeft2/index.vue'
import Preview from '../preview/index.vue'
// import Center from '../center/index.vue'
// import CenterRight1 from '../centerRight1/index.vue'
// import CenterRight2 from '../centerRight2/index.vue'
//import BottomLeft from '../bottomLeft/index.vue'
//import BottomRight from '../bottomRight/index.vue'

export default defineComponent({
  components: {
    Preview,
    // CenterLeft1,
    // CenterLeft2,
    // Center,
    // CenterRight1,
    // CenterRight2,
    //BottomLeft,
    //BottomRight
  },
  methods: {
    switchTab(index) {
      this.currentIndex = index
    },
  },
  setup() {
    // * 当前选中的Tab页
    const currentIndex = 0
    // * 加载标识
    const loading = ref<boolean>(true)
    // * 时间内容
    const timeInfo = reactive({
      setInterval: 0,
      dateDay: '',
      dateYear: '',
      dateWeek: '',
    })
    // * 适配处理
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
    // 生命周期
    onMounted(() => {
      cancelLoading()
      handleTime()
      // todo 屏幕适应
      windowDraw()
      calcRate()
    })

    onBeforeUnmount(() => {
      unWindowDraw()
      clearInterval(timeInfo.setInterval)
    })

    // methods
    // todo 处理 loading 展示
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false
      }, 500)
    }

    // todo 处理时间监听
    const handleTime = () => {
      timeInfo.setInterval = setInterval(() => {
        const date = new Date()
        timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
        timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
        timeInfo.dateWeek = WEEK[date.getDay()]
      }, 1000)
    }

    // return
    return {
      loading,
      timeInfo,
      appRef,
      title,
      subtitle,
      moduleInfo,
      currentIndex,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.preview-info {
  width: 30%;
  height: 100%;
  float: left;
  margin-left: 0%;
  margin-top: 1%;
  .preview-tag {
    width: 100%;
    height: 4%;
    // float: right;
    background-image: url('../../assets/img/videoTop.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}

.center-cen {
  position: relative;
  width: 69.5%;
  height: 100%;
  float: left;
  margin-left: 0.5%;
  margin-top: 1%;
  // .top-title {
  // position: absolute;
  // width: 100%;
  // height: 2.2rem;
  // left: 0.5rem;
  // top: 0.5rem;
  // margin-right: 5rem;
  // padding-left: 1%;
  // padding-bottom: 1%;
  // }
  // .rightTop {
  //   position: relative;
  //   width: 100%;
  //   height: 2.2rem;
  //   background: rgba(0, 72, 115, 0.28);
  //   transition: all ls;
  //   cursor: pointer;
  // }
  .boxCenterDisplay {
    position: absolute;
    width: 66%;
    height: calc(100% - 7rem);
    top: 7rem;
    background-image: url('../../assets/img/map.png');
    margin-left: 0.5%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  #pageAll {
    width: 33%;
    height: calc(100% - 8rem);
    margin-top: 7rem;
    margin-left: 1%;
    float: right;
    font-size: 12px;
    padding: 16px;
    // padding-top: 1%;
    // padding-left: 1%;
    // ul,
    // li {
    //   width: 98;
    //   padding: 1%;
    //   // border-bottom: 1px solid #32a1f7;
    //   height: 30%;
    // }
    li {
      background: rgba(1, 202, 217, 0.2) url(../../assets/img/icosjx.png)
        no-repeat top left;
      position: relative;
      overflow: hidden;
      padding: 2% 6%;
      color: rgba(255, 255, 255, 0.7);
      line-height: 150%;
      b {
        color: rgba(255, 255, 255, 1);
        font-weight: bold;
      }
      p.fl {
        width: 80%;
        overflow: hidden;
      }
      p.fr {
        position: absolute;
        right: 5%;
        top: -20%;
      }
    }
    li.li-bg {
      background: rgba(0, 255, 255, 0.4) url(../../assets/img/icosjx.png)
        no-repeat top left;
    }
  }
  .main-display-top {
    width: 100%;
    height: 3.2rem;
    margin-top: 1.5%;
    background-color: white;
    // background-image: url('../../assets/img/map_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    float: left;
  }
  .border h4 {
    margin: 15px 0 5px 20px;
    color: #8adeff;
    line-height: 35px;
    font-size: 18px;
    font-weight: 500;
  }
  .border {
    ::before {
      content: '';
      position: absolute;
      width: 80%;
      height: 100%;
      bottom: -1px;
      top: -1px;
      left: 10%;
      border-bottom: 1px solid #007297;
      border-top: 1px solid #007297;
      transition: all 0.5s;
    }
    ::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 80%;
      left: -1px;
      right: -1px;
      top: 10%;
      border-left: 1px solid #007297;
      border-right: 1px solid #007297;
      transition: all 0.5s;
    }
  }
  .boxCenterDown {
    width: 100%;
    height: 20%;
    .boxCenterDownLeft {
      width: 15%;
      color: #00f0ff;
      font-size: 20px;
      margin-left: 5%;
      height: 100%;

      .ananBg {
        width: 86%;
        margin-left: 7%;
        height: 70%;
        background-image: url('../../assets/img/anaBg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: 21px;
        text-align: center;
        line-height: 400%;

        .ana01Img {
          animation: anima01 8s linear infinite;
          width: 100%;
          height: 100%;
        }

        @keyframes anima01 {
          0% {
            transform: rotate(0deg);
          }
          /*25%  {transform:rotate(120deg);}*/
          /*50%  {transform:rotate(240deg);}*/
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}
.liImgLeft {
  width: 26%;
  height: 100%;
  float: left;
}
.liImgLeft img {
  width: 100%;
  height: 100%;
}
.liConRight {
  width: 72%;
  height: 100%;
  float: left;
  margin-left: 2%;
  color: #1f9dff;
  font-size: 12px;
  p {
    padding-top: 2%;
  }
}
.zhtc-table-li-content {
  width: 100%;
  display: flex;
  font-size: small;
  text-align: center;
}

.zhtc-table-li-content div:nth-child(1) {
  flex: 1;
}
.zhtc-table-li-content div:nth-child(2) {
  flex: 1.8;
}
</style>
