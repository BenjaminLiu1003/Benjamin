<template>
  <el-container style="height:100%;">
    <el-main>
      <el-row :gutter="5"
              v-for="row in rows"
              :key="row"
              style="margin-top:0px">
        <el-col :span="1"
                v-for="col in cols"
                :key="col">
          <el-popover v-if="(row - 1) * cols + col - 1 < entries.length"
                      :width="1000"
                      trigger="hover">
            <!-- popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"> -->
            <template #reference>
              <div class="thumbnail-box content"
                   :class="entries[(row - 1) * cols + col - 1].class">
                {{ entries[(row - 1) * cols + col - 1].pgInfo.pg }}
              </div>
            </template>
            <template #default>
              <el-descriptions title="Program Details"
                               :column="3"
                               border>
                <el-descriptions-item label="Program"
                                      label-align="center"
                                      align="center"
                                      label-class-name="my-label"
                                      class-name="my-content"
                                      width="150px">
                  {{ entries[(row - 1) * cols + col - 1].pgInfo.pg }}
                </el-descriptions-item>
                <el-descriptions-item label="Host"
                                      label-align="center"
                                      align="center">
                  {{ entries[(row - 1) * cols + col - 1].pgInfo.host }}
                </el-descriptions-item>
                <el-descriptions-item label="Pid"
                                      label-align="center"
                                      align="center">
                  {{ entries[(row - 1) * cols + col - 1].pgInfo.pid}}
                </el-descriptions-item>
                <el-descriptions-item label="Numbers"
                                      label-align="center"
                                      align="center">
                  <el-col :span="3"
                          v-for="(key, index) in numberKeys"
                          :key="index">
                    <el-badge :value="entries[(row - 1) * cols + col - 1]['modInfo'][key]"
                              :max="1000000000000"
                              style="maring-left: 10px">
                      <el-tag>{{ key }}</el-tag>
                    </el-badge>
                  </el-col>
                </el-descriptions-item>
                <!-- <el-descriptions-item label="Address"
                                    label-align="center"
                                    align="center">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                Province
              </el-descriptions-item> -->
              </el-descriptions>
              <!-- <div>
              {{ entries[(row - 1) * cols + col - 1].pgInfo.pg }}
              {{ entries[(row - 1) * cols + col - 1].pgInfo.host }}
              {{ entries[(row - 1) * cols + col - 1].pgInfo.pid }}
              {{ entries[(row - 1) * cols + col - 1].pgInfo.fails }}
              {{ entries[(row - 1) * cols + col - 1].pgInfo.orders }}
              {{ entries[(row - 1) * cols + col - 1].pgInfo.trades }}
              {{ entries[(row - 1) * cols + col - 1].pgInfo.currGMV }}
              {{ entries[(row - 1) * cols + col - 1].pgInfo.maxGMV }}
            </div> -->
            </template>
          </el-popover>
          <!-- <el-container 
            v-if="(row - 1) * 8 + col - 1 < entries.length" 
            class="thumbnail-box"
            style="background-color:white"
            @click="showDrawer">
           <el-header height="36px">
              <el-tag type="success">
                  {{ entries[(row - 1) * 8 + col - 1].pgInfo.pg }}
              </el-tag>
              <el-tag type="info" style="margin-left: 6px">
                  {{ entries[(row - 1) * 8 + col - 1].pgInfo.host }}
              </el-tag>
           </el-header>
           <el-main>
            <time class="time">
              {{ entries[(row - 1) * 8 + col - 1].modInfo.startTime }}
            </time>
            <el-popover placement="top-start" title="Orders" trigger="hover">
                <template #reference>
                    <el-badge :value="entries[(row - 1) * 8 + col - 1].modInfo.orders" :max="10000000" class="item" type="primary"/>
                </template>
            </el-popover>
            <el-popover placement="top-start" title="Trades" trigger="hover">
                <template #reference>
                    <el-badge :value="entries[(row - 1) * 8 + col - 1].modInfo.trades" :max="10000000" class="item" type="primary"/>
                </template>
            </el-popover>
            <el-popover placement="top-start" title="Fails" trigger="hover">
                <template #reference>
                    <el-badge :value="entries[(row - 1) * 8 + col - 1].modInfo.fails" :max="10000000" class="item" type="danger"/>
                </template>
            </el-popover>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.orders" class="item">
              <el-button bg text>orders</el-button>
            </el-badge>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.trades" class="item">
              <el-button bg text>trades</el-button>
            </el-badge>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.fails" class="item">
              <el-button bg text>fails</el-button>
            </el-badge>
           </el-main>
        </el-container>
        <el-container v-else class="thumbnail-box empty"/> -->
          <!-- <el-card v-if="(row - 1) * 8 + col - 1 < entries.length" :body-style="{ padding: '0px' }" class="status-card" 
            @click="handleClickCard(row, col)">
          <template #header>
            <div class="status-header">
              <el-tag type="success">
                  {{ entries[(row - 1) * 8 + col - 1].first.pg }}
              </el-tag>
              <el-tag type="info">
                  {{ entries[(row - 1) * 8 + col - 1].first.host }}
              </el-tag>
            </div>
          </template>
          <div class="bottom">
            <time class="time">
              {{ entries[(row - 1) * 8 + col - 1].second.startTime }}
            </time>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.orders" class="item">
              <el-button bg text>orders</el-button>
            </el-badge>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.trades" class="item">
              <el-button bg text>trades</el-button>
            </el-badge>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.fails" class="item">
              <el-button bg text>fails</el-button>
            </el-badge>
          </div>
        </el-card>
        <el-card v-else :body-style="{padding: '0px'}" class="status-card empty">
        </el-card> -->
        </el-col>
      </el-row>
    </el-main>
    <el-aside width="400px">
      <el-scrollbar ref="logContainer" height="100%">
        <el-timeline>
          <el-timeline-item v-for="(log, index) in logs"
                            :key="index"
                            :color="log.color"
                            :timestamp="log.timestamp"
                            placement="top">
            <div class="thumbnail-box log-box"
                 :class="log.level"
                 style="min-height:30px;background-color:white;">
              {{ log.msg }}
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </el-aside>
  </el-container>
  <!-- <el-drawer
        v-model="visible"
        title="All Entries"
        direction="rtl"
        size="60%">
        <el-table :data="entries"
            :row-class-name="tableRowClassName">
            <el-table-column v-for="key in entries_keys" :key="key" :property="key" :label="key" width="150" />
            <el-table-column property="pgInfo.host" label="Host" width="150"/>
            <el-table-column property="pgInfo.pg" label="Program" width="150" />
            <el-table-column property="pgInfo.pid" label="Pid" />
            <el-table-column property="modInfo.name" label="Name" width="150" />
            <el-table-column property="modInfo.orders" label="Orders" />
            <el-table-column property="modInfo.trades" label="Trades" />
            <el-table-column property="modInfo.fails" label="Fails" />
            <el-table-column property="modInfo.startTime" label="Since" width="150"/>
            <el-table-column property="modInfo.currGMV" label="Curr GMV" />
            <el-table-column property="modInfo.maxGMV" label="Max GMV" />
            <el-table-column property="modInfo.symbols" label="Symbols" />
            <el-table-column property="modInfo.engaged" label="engaged" />
        </el-table>
    </el-drawer> -->
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
// import EntryDrawer from './components/entrydrawer.vue'
import http from "@/utils/network/http";
import { ElMessage } from "_element-plus@1.2.0-beta.6@element-plus/es";
import { dealResponseCode } from "@/utils/functions";
// import scroll from "vue-seamless-scroll";

// const currentDate = ref(new Date())
// let entry_drawer = ref(null)
const logContainer = ref(null)
let rows = ref(0)
let cols = ref(24)
let visible = ref(false)
// let queryTimer = ref(null)
let query = {
  from: null,
  to: null,
  name: null,
  number: null,
}
const numberKeys = ["orders", "trades", "fails", "currGMV", "maxGMV"];

let entries = ref([]);
let logs = ref([]);
// let entries_keys = ref([]);

onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
  //   stopQueryStatus()
});

const tableRowClassName = ({ row, rowIndex }) => {
  console.log("row....", row.second.fails, row.second.fails > 300);
  if (row.second.fails > 300) {
    return "error-row";
  } else if (row.second.since == "") {
    return "warning-row";
  }
  return "";
};

const startQueryStatus = () => {
  console.log("query...");
  //   let url = 'quoter/all'
  query.from = 0;
  query.to = "jump trading";

  http.get("quoter/all", query, Object).then((response) => {
    entries.value = response.data.quoters;
  });
};

// const stopQueryStatus = () => {
//   clearInterval(queryTimer.value)
//   queryTimer.value = null
// }

// const handleClickCard = (row, col) => {
//     console.log(row, col)
// }

// const enterThumbnail = (index) => {
//   console.log(index);
//   console.log(entries.value[index]);
//   entries.value[index].isShowPopOver = true;
// };

// const leaveThumnail = (index) => {
//   entries.value[index].isShowPopOver = false;
// };

// const clickPop = (index) => {
//   if (activeId.value == index && showPop.value) return;
//   showPop.value = false;
//   activeId.value = index;
//   nextTick(() => {
//     showPop.value = true;
//     nextTick(() => {
//       pop.value?.doShow();
//     });
//   });
// };

const showDrawer = () => {
  console.log("clicked");
  visible.value = true;
  // entry_drawer.value.show(entries)
};

// queryTimer.value = setInterval(startQueryStatus, 10000)

// startQueryStatus()

if (typeof WebSocket == "undefined") {
  ElMessage({
    message: "Websocket is unsupported, please use Chrome",
    grouping: true,
    type: "error",
  });
} else {
  // const socketUrl = 'ws://localhost:6919/wx/?level=all&key=all'
  const socketUrl = "ws://7.151.16.99:6919/quoter/all/all";
  // const socketUrl = "ws://localhost:6919/quoter/all/all";
  const socket = new WebSocket(socketUrl);
  socket.onopen = function () {
    socket.send(
      JSON.stringify({
        username: "bliu",
        msg: "test websocket",
      })
    );
  };
  socket.onmessage = function (msg) {
    var response = JSON.parse(msg.data);
    dealResponseCode(
      response,
      function successHandler() {
        entries.value = response.data.quoters;
        logs.value = logs.value.concat(response.data.logs);
        rows.value = Math.ceil(entries.value.length / cols.value);
        for (var i = 0; i < entries.value.length; ++i) {
          if (entries.value[i].modInfo == undefined) {
            entries.value[i].modInfo = {};
            entries.value[i]["class"] = "dead blink-border";
          } else if (entries.value[i].modInfo.fails > 0) {
            entries.value[i]["class"] = "alert";
          } else if (entries.value[i].modInfo.symbols > 0) {
            entries.value[i]["class"] = "warning";
          } else {
            entries.value[i]["class"] = "normal";
          }
        }
        for (i = 0; i < logs.value.length; ++i) {
          if (logs.value[i].level == "success") {
            logs.value[i].color = "#67c23a";
          } else if (logs.value[i].level == "warning") {
            logs.value[i].color = "#e6a23c";
          } else if (logs.value[i].level == "alert") {
            logs.value[i].color = "#f56c6c";
          } else {
            logs.value[i].color = "#909399";
          }
        }
        console.log(logContainer.value)
        logContainer.value.scrollTop = 0
      },
      function failHandler() {
        ElMessage.error("failure" + ":" + response.msg);
      },
      () => {
        // nothing
      }
    );
  };
  socket.onerror = function () {
    ElMessage({
      message: "Websocket error",
      grouping: true,
      type: "error",
    });
  };
  socket.onclose = function () {
    console.log("Websocket closed......");
  };
}
</script>

<style lang="scss">
.el-table .warning-row {
  // --el-table-tr-bg-color: var(--el-color-warning-light-9);
  background-color: red;
}

.el-table .error-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

// .el-timeline-item__timestamp.is-top {
// position: absolute;
// left: -10spx;
// top: -3px;
// color: white;
// font-size: 20px;
// font-weight: bold;
// }
.el-timeline {
  padding-left: 1px;
}

.thumbnail-box {
  //   height: 110px;
  //   margin-bottom: 10px;
  //   border-radius: 6px;
  //   .el-card__body {
  //       padding: 0;
  //   }
  width: 100%;
  max-height: 26px;
  font-size: 10px;
  border-radius: 5px;

  &.content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 55px;
    margin: 6px;
    padding: 10%;
    text-overflow: ellipsis;
  }

  &.normal {
    background-color: #67c23a;
  }

  &.success {
    background-color: #67c23a;
  }

  &.warning {
    background-color: #e6a23c;
  }

  &.alert {
    background-color: #f56c6c;
  }

  &.dead {
    background-color: #909399;
  }
}

.log-box {
  font-size: 16px;
  &.normal {
    color: #67c23a;
  }

  &.success {
    color: #67c23a;
  }

  &.warning {
    color: #e6a23c;
  }

  &.alert {
    color: #f56c6c;
  }

  &.dead {
    color: #909399;
  }
}

.blink-border {
  // border: 4px solid #ffff66;
  padding-top: 10%;
  -webkit-animation: dead-twinkling 1s infinite ease-in-out;
}

@-webkit-keyframes dead-twinkling {
  0% {
    background-color: #909399;
    background-position: 0 0 10px rgba(0, 255, 0, 0.2),
      inset 0 0 10px rgba(0, 255, 0, 0.1), 0 1px 0 #393;
  }
  100% {
    background-color: #f56c6c;
    background-position: 0 0 25px rgba(0, 255, 0, 0.6),
      inset 0 0 15px rgba(125, 231, 125, 0.4), 0 1px 0 #6f6;
  }
}

.empty {
  background-color: gray;
}

/* .status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.time {
  font-size: 10px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}
</style>