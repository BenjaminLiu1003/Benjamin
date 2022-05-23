<template>
  <div id="index"
       ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">
        {{ t("loading") + "..." }}
      </dv-loading>
      <div v-else
           class="host-body">
        <!-- <navbar class="navBar" /> -->
        <app-main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import useDraw from '@/utils/useDraw'
import Navbar from './components/navbar.vue'
import AppMain from './components/appmain.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// * 加载标识
const loading = ref<boolean>(true)
// methods
// todo 处理 loading 展示
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 5)
}
// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()

// 生命周期
onMounted(() => {
  cancelLoading()
  // todo 屏幕适应
  windowDraw()
  calcRate()
})

onBeforeUnmount(() => {
  unWindowDraw()
})

// export default {
//   components: {
//     Navbar,
//     AppMain,
//   },
//   setup() {
//     // * 加载标识
//     const loading = ref<boolean>(true)
//     // methods
//     // todo 处理 loading 展示
//     const cancelLoading = () => {
//       setTimeout(() => {
//         loading.value = false
//       }, 5)
//     }
//     // * 适配处理
//     const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()

//     // 生命周期
//     onMounted(() => {
//       cancelLoading()
//       // todo 屏幕适应
//       windowDraw()
//       calcRate()
//     })

//     onBeforeUnmount(() => {
//       unWindowDraw()
//     })

//     return {
//       appRef,
//       loading,
//     }
//   },
// }
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
