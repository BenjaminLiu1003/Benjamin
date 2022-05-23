<template>
  <div class="d-flex jc-between">
    <div class="d-flex aside-width">
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
  <el-container style="height:100%;">
    <el-main>
      <el-row :gutter="5"
              v-for="row in rows"
              :key="row"
              style="margin-top:0px">
        <el-col :span="1"
                v-for="col in cols"
                :key="col"
                style="padding: 0px">
          <!-- <el-popover v-if="(row - 1) * cols + col - 1 < programs.length"
                      :width="1000"
                      trigger="hover"> -->
          <!-- popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"> -->
          <!-- <template #reference> -->
          <div v-if="(row - 1) * cols + col - 1 < programs.length"
               class="thumbnail-box content"
               :class="programs[(row - 1) * cols + col - 1].class"
               @mouseenter="enterBox((row - 1) * cols + col - 1)"
               @mouseleave="leaveBox">
            {{ programs[(row - 1) * cols + col - 1].name }}
          </div>
          <!-- </template> -->
          <!-- <template #default> -->
          <!-- <div>
              {{ programs[(row - 1) * cols + col - 1].pgInfo.pg }}
              {{ programs[(row - 1) * cols + col - 1].pgInfo.host }}
              {{ programs[(row - 1) * cols + col - 1].pgInfo.pid }}
              {{ programs[(row - 1) * cols + col - 1].pgInfo.fails }}
              {{ programs[(row - 1) * cols + col - 1].pgInfo.orders }}
              {{ programs[(row - 1) * cols + col - 1].pgInfo.trades }}
              {{ programs[(row - 1) * cols + col - 1].pgInfo.currGMV }}
              {{ programs[(row - 1) * cols + col - 1].pgInfo.maxGMV }}
            </div> -->
          <!-- </template> -->
          <!-- </el-popover> -->
          <!-- <el-container 
            v-if="(row - 1) * 8 + col - 1 < programs.length" 
            class="thumbnail-box"
            style="background-color:white"
            @click="showDrawer">
           <el-header height="36px">
              <el-tag type="success">
                  {{ programs[(row - 1) * 8 + col - 1].pgInfo.pg }}
              </el-tag>
              <el-tag type="info" style="margin-left: 6px">
                  {{ programs[(row - 1) * 8 + col - 1].pgInfo.host }}
              </el-tag>
           </el-header>
           <el-main>
            <time class="time">
              {{ programs[(row - 1) * 8 + col - 1].modInfo.startTime }}
            </time>
            <el-popover placement="top-start" title="Orders" trigger="hover">
                <template #reference>
                    <el-badge :value="programs[(row - 1) * 8 + col - 1].modInfo.orders" :max="10000000" class="item" type="primary"/>
                </template>
            </el-popover>
            <el-popover placement="top-start" title="Trades" trigger="hover">
                <template #reference>
                    <el-badge :value="programs[(row - 1) * 8 + col - 1].modInfo.trades" :max="10000000" class="item" type="primary"/>
                </template>
            </el-popover>
            <el-popover placement="top-start" title="Fails" trigger="hover">
                <template #reference>
                    <el-badge :value="programs[(row - 1) * 8 + col - 1].modInfo.fails" :max="10000000" class="item" type="danger"/>
                </template>
            </el-popover>
            <el-badge :value="programs[(row - 1) * 8 + col - 1].second.orders" class="item">
              <el-button bg text>orders</el-button>
            </el-badge>
            <el-badge :value="programs[(row - 1) * 8 + col - 1].second.trades" class="item">
              <el-button bg text>trades</el-button>
            </el-badge>
            <el-badge :value="programs[(row - 1) * 8 + col - 1].second.fails" class="item">
              <el-button bg text>fails</el-button>
            </el-badge>
           </el-main>
        </el-container>
        <el-container v-else class="thumbnail-box empty"/> -->
          <!-- <el-card v-if="(row - 1) * 8 + col - 1 < programs.length" :body-style="{ padding: '0px' }" class="status-card" 
            @click="handleClickCard(row, col)">
          <template #header>
            <div class="status-header">
              <el-tag type="success">
                  {{ programs[(row - 1) * 8 + col - 1].first.pg }}
              </el-tag>
              <el-tag type="info">
                  {{ programs[(row - 1) * 8 + col - 1].first.host }}
              </el-tag>
            </div>
          </template>
          <div class="bottom">
            <time class="time">
              {{ programs[(row - 1) * 8 + col - 1].second.startTime }}
            </time>
            <el-badge :value="programs[(row - 1) * 8 + col - 1].second.orders" class="item">
              <el-button bg text>orders</el-button>
            </el-badge>
            <el-badge :value="programs[(row - 1) * 8 + col - 1].second.trades" class="item">
              <el-button bg text>trades</el-button>
            </el-badge>
            <el-badge :value="programs[(row - 1) * 8 + col - 1].second.fails" class="item">
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
      <el-card style="height:33%">
        <div v-if="activePgIdx"
             class="clearfix">
          <span>
            {{ programs[activePgIdx].name + "@" + programs[activePgIdx].host }}
          </span>
        </div>
        <el-descriptions v-if="activePgIdx"
                         title=""
                         :column="1"
                         border>
          <el-descriptions-item label="Orders/Trades/Fails"
                                label-align="center"
                                align="center"
                                label-class-name="my-label"
                                class-name="my-content"
                                width="150px">
            <el-badge :value="programs[activePgIdx]['modules'][0].fails"
                      :max="10000000"
                      class="item"
                      type="primary" />
            <el-badge :value="programs[activePgIdx]['modules'][0].trades"
                      :max="10000000"
                      class="item"
                      type="primary" />
            <el-badge :value="programs[activePgIdx]['modules'][0].fails"
                      :max="10000000"
                      class="item"
                      type="danger" />
          </el-descriptions-item>
          <el-descriptions-item label="GMV"
                                label-align="center"
                                align="center">
            <el-progress :text-inside="true"
                         :stroke-width="24"
                         :percentage="programs[activePgIdx]['modules'][1].currGMV * 100 / programs[activePgIdx]['modules'][1].maxGMV"
                         :format="formatGMV(programs[activePgIdx]['modules'][1].currGMV, programs[activePgIdx]['modules'][1].maxGMV)"
                         status="success"></el-progress>
            <!-- <el-badge :value="programs[activePgIdx]['modules'][1].currGMV"
                      :max="20000000"
                      class="item"
                      type="primary" />
            <el-badge :value="programs[activePgIdx]['modules'][1].maxGMV"
                      :max="20000000"
                      class="item"
                      type="primary" /> -->
          </el-descriptions-item>
          <el-descriptions-item label="Symbols"
                                label-align="center"
                                align="center">
            <el-progress :text-inside="true"
                         :stroke-width="24"
                         :percentage="programs[activePgIdx]['modules'][2].engaged * 100 / programs[activePgIdx]['modules'][2].symbols"
                         :format="formatSymbols(programs[activePgIdx]['modules'][2].symbols, programs[activePgIdx]['modules'][2].engaged)"
                         status="success"></el-progress>
            <!-- <el-badge :value="programs[activePgIdx]['modules'][2].symbols"
                      :max="10000000"
                      class="item"
                      type="primary" />
            <el-badge :value="programs[activePgIdx]['modules'][2].engaged"
                      :max="10000000"
                      class="item"
                      type="primary" /> -->
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <div v-scrollBottom
           class="scroll"
           style="height:67%">
        <div v-for="(log, index) in logs"
             :key="index"
             class="scroll-item"
             :style="log.color">
          [{{ log.ctime }}]: {{ log.text }}
        </div>
      </div>
      <!-- <el-scrollbar ref="logContainer"
                    height="67%">
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
      </el-scrollbar> -->
    </el-aside>
  </el-container>
  <!-- <el-drawer
        v-model="visible"
        title="All programs"
        direction="rtl"
        size="60%">
        <el-table :data="programs"
            :row-class-name="tableRowClassName">
            <el-table-column v-for="key in programs_keys" :key="key" :property="key" :label="key" width="150" />
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
import { reactive, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
// import EntryDrawer from './components/entrydrawer.vue'
import http from "@/utils/network/http";
import { ElMessage } from "_element-plus@1.2.0-beta.6@element-plus/es";
import { dealResponseCode } from "@/utils/functions";
import { formatTime } from "@/utils/index";
import { subtitle, WEEK } from "@/constant/index";
// import scroll from "vue-seamless-scroll";

// const currentDate = ref(new Date())
// let entry_drawer = ref(null)
// const programsNum = ref(0)

const timeInfo = reactive({
  setInterval: 0,
  dateDay: "",
  dateYear: "",
  dateWeek: "",
});

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

let host = ref(null)
const hosts = [
  {
    value: "fpis_kbsiml14",
    label: "fpis_kbsiml14",
  },
  {
    value: "fpis_kbsiml35",
    label: "fpis_kbsiml35",
  },
  {
    value: "fpis_kbsiml66",
    label: "fpis_kbsiml66",
  },
];

let grouped = ref([]);
let programs = ref([]);
let logs = ref([]);
const activeGroupIdx = ref(null);
let activePgIdx = ref(null);

const setOpacity = (index, isOpacity) => {
  if (isOpacity) {
    programs.value[index].class = programs.value[index].class + " opacity";
  } else {
    programs.value[index].class = programs.value[index].class.replace(
      /opacity/g,
      ""
    );
  }
};
watch(activeGroupIdx, (newValue, oldValue) => {
  console.log(newValue, "<----", oldValue);
  if (newValue == null) {
    for (var program of programs.value) {
      program.class = program.class.replace(/opacity/g, "");
    }
  } else {
    for (program of programs.value) {
      if (program.group != newValue) {
        program.class = program.class + " opacity";
      } else {
        program.class = program.class.replace(/opacity/g, "");
        // ElMessage({
        //   message: grouped.value[program.group].name,
        //   grouping: true,
        //   type: "success",
        // });
      }
    }

    // var oldGroupIdx = -1,
    //   newGroupIdx = -1;
    // for (var group of grouped.value) {
    //   var idx = group.programs.indexOf(newValue);
    //   if (idx !== -1) {
    //     newGroupIdx = idx;
    //     for (idx of group.programs) {
    //       setOpacity(idx, false);
    //     }
    //   }
    //   if (oldValue !== null) {
    //     idx = group.programs.indexOf(oldValue);
    //     if (idx !== -1) {
    //       oldGroupIdx = idx;
    //     }
    //   }

    //   if ((oldGroupIdx !== -1 || oldValue == null) && newGroupIdx !== -1) {
    //     break;
    //   }
    // }
  }
});
const enterBox = (index) => {
  activePgIdx.value = index;
  activeGroupIdx.value = programs.value[index].group;
  // console.log("enter...");
  // for ( var i = 0; i < programs.value.length; ++i) {
  //   console.log("Before", programs.value[i].class)
  //   programs.value[i].class.replace(/opacity/g, "")
  //   if ( i != index ) {
  //     programs.value[i].class += " opacity"
  //   }
  //   console.log("After", programs.value[i].class)
  // }
};

const leaveBox = () => {
  console.log("leave...");
  activePgIdx.value = null;
  activeGroupIdx.value = null;
  // for ( var i = 0; i < programs.value.length; ++i) {
  //   programs.value[i].class.replace(/opacity/g, "")
  // }
};

const logContainer = ref(null);
let rows = ref(0);
let cols = ref(24);
let visible = ref(false);
// let queryTimer = ref(null)
let query = {
  from: null,
  to: null,
  name: null,
  number: null,
};
const numberKeys = ["orders", "trades", "fails", "currGMV", "maxGMV"];

// let programs_keys = ref([]);

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

const formatGMV = (currGMV, maxGMV) => {
  return () => {
    return "Curr:" + currGMV + ",Max:" + maxGMV;
  };
};

const formatSymbols = (symbols, engaged) => {
  return () => {
    return "Symbols:" + symbols + ",Engaged: " + engaged;
  };
};

const selectHost = (host) => {
  socket.close()
  programs.value = []
  grouped.value = []
  rows.value = 0

  // socketUrl = "ws://192.168.0.120:6919/quoter/host/" + host
  socketUrl = "ws://7.151.16.99:6919/quoter/host/" + host
  socket = new WebSocket(socketUrl)
  socket.onopen = function () {
    console.log("socket opened...");
    // socket.send(
    //   JSON.stringify({
    //     username: "bliu",
    //     msg: "test websocket",
    //   })
    // );
  };
  socket.onmessage = function (msg) {
    var response = JSON.parse(msg.data);
    console.log("message....", response);
    dealResponseCode(
      response,
      function successHandler() {
        if (response.data.logs !== undefined) {
          for (i = 0; i < response.data.logs.length; ++i) {
            if (response.data.logs[i].level == "0") {
              // success
              var color = "color: #67c23a";
            } else if (response.data.logs[i].level == "1") {
              // warning
              color = "color: #e6a23c";
            } else if (response.data.logs[i].level == "2") {
              // alert
              color = "color: #f56c6c";
            } else {
              color = "color: #909399";
            }
            logs.value.push({
              id: response.data.logs[i].program,
              text: response.data.logs[i].text,
              level: response.data.logs[i].level,
              color: color,
              ctime: response.data.logs[i].ctime,
            });
          }
        }

        // first time: get the whole programs
        if (programs.value.length === 0) {
          grouped.value = response.data.groups;
          for (var i = 0; i < grouped.value.length; ++i) {
            grouped.value[i].opacity = 1;
          }

          programs.value = response.data.programs;
          rows.value = Math.ceil(programs.value.length / cols.value);

          for (i = 0; i < programs.value.length; ++i) {
            if (programs.value[i].modules == undefined) {
              programs.value[i].modules = [];
              programs.value[i]["class"] = "dead blink-border";
            } else if (
              programs.value[i].modules[0].fails >
              programs.value[i].modules[0].trades
            ) {
              programs.value[i]["class"] = "alert";
              // } else if (programs.value[i].modules[2].symbols > 0) {
              //   programs.value[i]["class"] = "warning";
            } else {
              programs.value[i]["class"] = "normal";
            }
          }
        } else {
          var program = response.data.program;
          programs.value[program.id].group = program.group;
          programs.value[program.id].host = program.host;
          programs.value[program.id].pid = program.pid;
          for (var newModule of program["modules"]) {
            for (var oldModule in programs.value[program.id]["modules"]) {
              if (newModule["name"] == oldModule["name"]) {
                oldModule = newModule;
              }
            }
            if (newModule["name"] == "log") {
              if (newModule["level"] == "0") {
                // success
                color = "color: #67c23a";
              } else if (newModule["level"] == "1") {
                // warning
                color = "color: #e6a23c";
              } else if (newModule["level"] == "2") {
                // alert
                color = "color: #f56c6c";
              } else {
                color = "color: #909399";
              }
              logs.value.push({
                id: program.id,
                text: newModule["text"],
                level: newModule["level"],
                color: color,
                ctime: newModule["ctime"],
              });
            }
          }
          if (logs.value.length > 20) {
            logs.value = logs.value.slice(logs.value.length - 20);
          }

          programs.value[program.id]["class"] = programs.value[program.id][
            "class"
          ].replace(/alert/g, "normal");
          for (newModule in programs.value[program.id].modules) {
            if (
              newModule["name"] == "component2" &&
              newModule["fails"] > newModule["trades"]
            ) {
              programs.value[program.id]["class"] = "alert";
            }
          }
        }

        // console.log(logContainer.value)
        // logContainer.value.scrollTop = 0
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

// const startQueryStatus = () => {
//   console.log("query...");
//   //   let url = 'quoter/all'
//   query.from = 0;
//   query.to = "jump trading";

//   http.get("quoter/all", query, Object).then((response) => {
//     programs.value = response.data.quoters;
//   });
// };

// const stopQueryStatus = () => {
//   clearInterval(queryTimer.value)
//   queryTimer.value = null
// }

// const handleClickCard = (row, col) => {
//     console.log(row, col)
// }

// const enterThumbnail = (index) => {
//   console.log(index);
//   console.log(programs.value[index]);
//   programs.value[index].isShowPopOver = true;
// };

// const leaveThumnail = (index) => {
//   programs.value[index].isShowPopOver = false;
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
  // entry_drawer.value.show(programs)
};

// queryTimer.value = setInterval(startQueryStatus, 10000)

// startQueryStatus()

let socket
let socketUrl

if (typeof WebSocket == "undefined") {
  ElMessage({
    message: "Websocket is unsupported, please use Chrome",
    grouping: true,
    type: "error",
  });
} else {
  // const socketUrl = 'ws://localhost:6919/wx/?level=all&key=all'
  const socketUrl = "ws://7.151.16.99:6919/quoter/all/all";
  // socketUrl = "ws://192.168.0.120:6919/quoter/all/all";
  socket = new WebSocket(socketUrl);
  socket.onopen = function () {
    console.log("socket opened...");
    // socket.send(
    //   JSON.stringify({
    //     username: "bliu",
    //     msg: "test websocket",
    //   })
    // );
  };
  socket.onmessage = function (msg) {
    var response = JSON.parse(msg.data);
    console.log("message....", response);
    dealResponseCode(
      response,
      function successHandler() {
        if (response.data.logs !== undefined) {
          for (i = 0; i < response.data.logs.length; ++i) {
            if (response.data.logs[i].level == "0") {
              // success
              var color = "color: #67c23a";
            } else if (response.data.logs[i].level == "1") {
              // warning
              color = "color: #e6a23c";
            } else if (response.data.logs[i].level == "2") {
              // alert
              color = "color: #f56c6c";
            } else {
              color = "color: #909399";
            }
            logs.value.push({
              id: response.data.logs[i].program,
              text: response.data.logs[i].text,
              level: response.data.logs[i].level,
              color: color,
              ctime: response.data.logs[i].ctime,
            });
          }
        }

        // first time: get the whole programs
        if (programs.value.length === 0) {
          grouped.value = response.data.groups;
          for (var i = 0; i < grouped.value.length; ++i) {
            grouped.value[i].opacity = 1;
          }

          programs.value = response.data.programs;
          rows.value = Math.ceil(programs.value.length / cols.value);

          for (i = 0; i < programs.value.length; ++i) {
            if (programs.value[i].modules == undefined) {
              programs.value[i].modules = [];
              programs.value[i]["class"] = "dead blink-border";
            } else if (
              programs.value[i].modules[0].fails >
              programs.value[i].modules[0].trades
            ) {
              programs.value[i]["class"] = "alert";
              // } else if (programs.value[i].modules[2].symbols > 0) {
              //   programs.value[i]["class"] = "warning";
            } else {
              programs.value[i]["class"] = "normal";
            }
          }
        } else {
          var program = response.data.program;
          programs.value[program.id].group = program.group;
          programs.value[program.id].host = program.host;
          programs.value[program.id].pid = program.pid;
          for (var newModule of program["modules"]) {
            for (var oldModule in programs.value[program.id]["modules"]) {
              if (newModule["name"] == oldModule["name"]) {
                oldModule = newModule;
              }
            }
            if (newModule["name"] == "log") {
              if (newModule["level"] == "0") {
                // success
                color = "color: #67c23a";
              } else if (newModule["level"] == "1") {
                // warning
                color = "color: #e6a23c";
              } else if (newModule["level"] == "2") {
                // alert
                color = "color: #f56c6c";
              } else {
                color = "color: #909399";
              }
              logs.value.push({
                id: program.id,
                text: newModule["text"],
                level: newModule["level"],
                color: color,
                ctime: newModule["ctime"],
              });
            }
          }
          if (logs.value.length > 20) {
            logs.value = logs.value.slice(logs.value.length - 20);
          }

          programs.value[program.id]["class"] = programs.value[program.id][
            "class"
          ].replace(/alert/g, "normal");
          for (newModule in programs.value[program.id].modules) {
            if (
              newModule["name"] == "component2" &&
              newModule["fails"] > newModule["trades"]
            ) {
              programs.value[program.id]["class"] = "alert";
            }
          }
        }

        // console.log(logContainer.value)
        // logContainer.value.scrollTop = 0
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

.scroll {
  // height: 600px;
  overflow: auto;
  .scroll-item {
    // height: 200px;
    margin-bottom: 20px;
  }
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
    // margin: 6px;
    padding: 10%;
    text-overflow: ellipsis;
  }

  &.opacity {
    opacity: 0.5;
  }

  &.normal {
    background-color: #42b983;
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

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