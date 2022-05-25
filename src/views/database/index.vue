<template>
  <div>
    <el-menu :default-active="activeSelection"
             mode="horizontal"
             background-color="black"
             text-color="white"
             @select="handleSelect">

      <el-menu-item index="all"
                    style="background-color: rgba(0, 0, 0, 0.1) !important">
        Collapsed
      </el-menu-item>
      <el-sub-menu index="host">
        <template #title>Host</template>
        <el-menu-item v-for="(host, index) in hosts"
                      :key="index"
                      :index="host.name">
          {{ host.name }}
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="strategy">
        <template #title>Strategy</template>
        <el-menu-item v-for="(group, index) in grouped"
                      :key="index"
                      :index="group.name">
          {{ group.name }}
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="organize">
        <template #title>Organize</template>
        <el-menu-item index="All">
          Sequential
        </el-menu-item>
        <el-menu-item index="Alert Only">
          Organized
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item index="time"
                    disabled
                    style="position: absolute;right:0px;">
        {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
        {{ timeInfo.dateDay }}
      </el-menu-item>
    </el-menu>
    <!-- <span class="text"
          style="color:red;">
      {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
      {{ timeInfo.dateDay }}
    </span> -->
  </div>
  <!-- <div class="d-flex jc-between">
    <div class="d-flex aside-width"> -->
  <!-- <div class="react-left ml-4">
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
      </div> -->

  <!-- <el-dropdown>
        <div class="react-left ml-3">
          <span class="text"
                style="color:white">
            Host
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu v-for="(host, index) in hosts"
                            :key="index">
            <el-dropdown-item>{{ host.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <div class="react-left ml-3">
          <span class="text"
                style="color:white">
            Strategy
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu v-for="(group, index) in grouped"
                            :key="index">
            <el-dropdown-item>{{ group.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->

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
  <!-- </div>
    <div class="d-flex aside-width">
      <div class="react-right mr-1 react-l-s">
        <span class="react-after"></span>
        <span class="text">
          {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
          {{ timeInfo.dateDay }}
        </span>
      </div>
    </div>
  </div> -->
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
          <el-popover v-if="(row - 1) * cols + col - 1 < programs.length"
                      :width="600"
                      trigger="hover">
            <!-- popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"> -->
            <template #reference>
              <div class="thumbnail-box content"
                   :class="programs[(row - 1) * cols + col - 1].class"
                   @mouseenter="enterBox((row - 1) * cols + col - 1)"
                   @mouseleave="leaveBox">
                {{ programs[(row - 1) * cols + col - 1].name }}
              </div>
            </template>
            <template #default>
              <el-descriptions title="Program Details"
                               direction="vertical"
                               :column="7"
                               size="large"
                               border>
                <el-descriptions-item label="Program"
                                      :span="3">
                  {{ programs[(row - 1) * cols + col - 1].name }}
                </el-descriptions-item>
                <el-descriptions-item label="Host"
                                      :span="2">
                  {{ programs[(row - 1) * cols + col - 1].host }}
                </el-descriptions-item>
                <el-descriptions-item label="Pid">
                  {{ programs[(row - 1) * cols + col - 1].pid }}
                </el-descriptions-item>
                <el-descriptions-item label="Reboots">
                  <el-tag type="danger">
                    {{ programs[(row - 1) * cols + col - 1].reboots }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Orders">
                  <el-tag type="success">
                    {{ programs[(row - 1) * cols + col - 1]['modules'][0].orders }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Trades">
                  <el-tag type="success">
                    {{ programs[(row - 1) * cols + col - 1]['modules'][0].trades }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Fails">
                  <el-tag type="danger">
                    {{ programs[(row - 1) * cols + col - 1]['modules'][0].fails }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="CurrGMV / MaxGMV"
                                      :span="2">
                  <el-progress :text-inside="true"
                               :stroke-width="24"
                               :percentage="programs[(row - 1) * cols + col - 1]['modules'][1].currGMV * 100 / programs[(row - 1) * cols + col - 1]['modules'][1].maxGMV"
                               :format="formatGMV(programs[(row - 1) * cols + col - 1]['modules'][1].currGMV, programs[(row - 1) * cols + col - 1]['modules'][1].maxGMV)" />
                </el-descriptions-item>
                <el-descriptions-item label="Symbols">
                  <el-tag type="success">
                    {{ programs[(row - 1) * cols + col - 1]['modules'][2].symbols }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Engaged">
                  <el-tag type="success">
                    {{ programs[(row - 1) * cols + col - 1]['modules'][2].engaged }}
                  </el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </el-popover>
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
    <el-aside width="450px">
      <el-card v-if="0"
               style="height:0px">
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
           style="height:100%">
        <div v-for="(log, index) in logs"
             :key="index"
             class="scroll-item"
             :style="log.color">
          <p style="font-size:15px">
            {{ formatLogTitle(index) }}
          </p>
          <p style="font-size:15px">
            {{ log.text }}
          </p>
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
import {
  reactive,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
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

let host = ref(null);
// const hosts = [
//   {
//     value: "fpis_kbsiml14",
//     label: "fpis_kbsiml14",
//   },
//   {
//     value: "fpis_kbsiml35",
//     label: "fpis_kbsiml35",
//   },
//   {
//     value: "fpis_kbsiml66",
//     label: "fpis_kbsiml66",
//   },
// ];

let grouped = ref([]);
let hosts = ref([]);

let onlyShowAlert = ref(false);
let actualPrograms = ref([]); // the stored whole programs
let programs = ref([]); // for show

let logs = ref([]);
const activeGroupIdx = ref(null);
let activePgIdx = ref(null);
const activeSelection = ref("all");
let isGrouping = ref(false);

let socket, socketUrl;
const createNewSocket = () => {
  if (socket !== undefined) {
    socket.close();
  }

  socket = new WebSocket(socketUrl);

  socket.onopen = function () {
    // console.log("socket opened...");
    // socket.send(JSON.stringify({username: "bliu",msg: "test websocket"}));
  };

  socket.onmessage = parseSocketMsg;

  socket.onerror = function () {
    ElMessage({
      message: "Websocket error",
      grouping: true,
      type: "error",
    });
  };

  socket.onclose = function () {
    // console.log("Websocket closed......");
  };
};

const handleSelect = (key: string, keyPath: string[]) => {
  if (keyPath[0] == "organize") {
    onlyShowAlert.value = key == "Alert Only";
    isGrouping.value = false;
    return;
  }

  if (keyPath[0] == "all") {
    isGrouping.value = true;
    // socketUrl = "ws://192.168.0.120:6919/quoter/all/all";
    // socketUrl = "ws://7.151.16.99:6919/quoter/all/all";
    socketUrl = process.env.VUE_APP_WEBSOCKET_URL + "quoter/all/all";
  } else if (keyPath[0] == "host") {
    isGrouping.value = false;
    // socketUrl = "ws://192.168.0.120:6919/quoter/host/" + key;
    socketUrl = process.env.VUE_APP_WEBSOCKET_URL + "quoter/host/" + key;
    // socketUrl = "ws://7.151.16.99:6919/quoter/host/" + key
  } else if (keyPath[0] == "strategy") {
    isGrouping.value = false;
    // socketUrl = "ws://192.168.0.120:6919/quoter/strategy/" + key;
    socketUrl = process.env.VUE_APP_WEBSOCKET_URL + "/quoter/strategy/" + key;
    // socketUrl = "ws://7.151.16.99:6919/quoter/strategy/" + key
  }

  createNewSocket();
};

const formatLogTitle = (index) => {
  for (var program of actualPrograms.value) {
    if (logs.value[index].id === program.id) {
      return (
        "[" +
        logs.value[index].ctime +
        "]:" +
        program.name +
        "@" +
        hosts.value[program.host - 1].name
      );
    }
  }
};

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

watch(onlyShowAlert, (newValue, oldValue) => {
  if (newValue) {
    programs.value = [];
    var normal = [];
    var abnormal = [];
    for (var program of actualPrograms.value) {
      if (program["class"].indexOf("alert") !== -1) {
        abnormal.push(program);
      } else {
        normal.push(program);
      }
    }
    programs.value = normal.concat(abnormal);
  } else {
    programs.value = actualPrograms.value;
  }
  rows.value = Math.ceil(programs.value.length / cols.value);
});

watch(activeGroupIdx, (newValue, oldValue) => {
  console.log(newValue, "<----", oldValue);
  if (newValue == null) {
    if (isGrouping.value) {
      programs.value = [];
      for (var group of grouped.value) {
        var newProgram = null;
        for (var program of actualPrograms.value) {
          if (program.group == group.id) {
            if (program["class"].indexOf("alert") !== -1) {
              newProgram = {
                group: group.id,
                name: group.name,
                class: "alert",
                modules: [
                  { name: "component1", orders: 0, trades: 0, fails: 0 },
                  { name: "component2", currGMV: 0, maxGMV: 1 },
                  { name: "component3", symbols: 0, engaged: 0 },
                ],
              };
            } else {
              newProgram = {
                group: group.id,
                name: group.name,
                class: "normal",
                modules: [
                  { name: "component1", orders: 0, trades: 0, fails: 0 },
                  { name: "component2", currGMV: 0, maxGMV: 1 },
                  { name: "component3", symbols: 0, engaged: 0 },
                ],
              };
            }
          }
        }
        if (newProgram !== null) {
          programs.value.push(newProgram);
        }
      }
    }

    for (program of programs.value) {
      program.class = program.class.replace(/opacity/g, "");
    }
  } else {
    if (isGrouping.value) {
      programs.value = [];
      for (group of grouped.value) {
        if (group.id === newValue) {
          for (program of actualPrograms.value) {
            if (program.group === newValue) {
              programs.value.push(program);
            }
          }
        } else {
          newProgram = null;
          for (program of actualPrograms.value) {
            if (program.group == group.id) {
              if (program["class"].indexOf("alert") !== -1) {
                newProgram = {
                  group: group.id,
                  name: group.name,
                  class: "alert",
                  modules: [
                    { name: "component1", orders: 0, trades: 0, fails: 0 },
                    { name: "component2", currGMV: 0, maxGMV: 1 },
                    { name: "component3", symbols: 0, engaged: 0 },
                  ],
                };
                break;
              } else {
                newProgram = {
                  group: group.id,
                  name: group.name,
                  class: "normal",
                  modules: [
                    { name: "component1", orders: 0, trades: 0, fails: 0 },
                    { name: "component2", currGMV: 0, maxGMV: 1 },
                    { name: "component3", symbols: 0, engaged: 0 },
                  ],
                };
              }
            } else if (newProgram !== null) {
              break;
            }
          }
          if (newProgram !== null) {
            programs.value.push(newProgram);
          }
        }
      }
    }
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
  console.log("programs:", programs.value);
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
    return "Curr:" + currGMV; // + ",Max:" + maxGMV;
  };
};

const formatSymbols = (symbols, engaged) => {
  return () => {
    return "Symbols:" + symbols + ",Engaged: " + engaged;
  };
};

const parseSocketMsg = (msg) => {
  var response = JSON.parse(msg.data);
  console.log("response");
  console.log(response);
  dealResponseCode(
    response,
    function successHandler() {
      // first time: get the whole programs
      if (response.data.programs !== undefined) {
        onlyShowAlert.value = false;
        actualPrograms.value = [];
        programs.value = [];
        grouped.value = [];
        hosts.value = [];
        logs.value = [];
        rows.value = 0;
        activePgIdx.value = null;
        activeGroupIdx.value = null;

        if (response.data.logs !== undefined) {
          for (i = 0; i < response.data.logs.length; ++i) {
            if (response.data.logs[i].level == "0") {
              var color = "color: #67c23a"; // success
            } else if (response.data.logs[i].level == "1") {
              color = "color: #e6a23c"; // warning
            } else if (response.data.logs[i].level == "2") {
              color = "color: #ff1602"; // alert #f56c6c #f20c00
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

        grouped.value = response.data.groups;
        for (var i = 0; i < grouped.value.length; ++i) {
          grouped.value[i].opacity = 1;
        }
        console.log("coming hosts...");
        console.log(response.data.hosts);
        hosts.value = response.data.hosts;
        console.log("parsed hosts");
        console.log(hosts.value);
        actualPrograms.value = response.data.programs;

        for (i = 0; i < actualPrograms.value.length; ++i) {
          if (actualPrograms.value[i].modules == undefined) {
            actualPrograms.value[i].modules = [];
            actualPrograms.value[i]["class"] = "dead blink-border";
          } else if (
            actualPrograms.value[i].modules[0].fails >
            actualPrograms.value[i].modules[0].trades
          ) {
            actualPrograms.value[i]["class"] = "alert";
          } else {
            actualPrograms.value[i]["class"] = "normal";
          }
        }

        if (isGrouping.value) {
          for (var group of grouped.value) {
            var newProgram = null;
            for (var program of actualPrograms.value) {
              if (program.group == group.id) {
                if (program["class"].indexOf("alert") !== -1) {
                  newProgram = {
                    group: group.id,
                    name: group.name,
                    class: "alert",
                    modules: [
                      { name: "component1", orders: 0, trades: 0, fails: 0 },
                      { name: "component2", currGMV: 0, maxGMV: 1 },
                      { name: "component3", symbols: 0, engaged: 0 },
                    ],
                  };
                } else {
                  newProgram = {
                    group: group.id,
                    name: group.name,
                    class: "normal",
                    modules: [
                      { name: "component1", orders: 0, trades: 0, fails: 0 },
                      { name: "component2", currGMV: 0, maxGMV: 1 },
                      { name: "component3", symbols: 0, engaged: 0 },
                    ],
                  };
                }
              }
            }
            if (newProgram !== null) {
              programs.value.push(newProgram);
            }
          }
        } else {
          programs.value = actualPrograms.value;
        }

        console.log("Programs: ", programs.value);
        console.log("actualPrograms: ", actualPrograms.value);
      } else {
        program = response.data.program;
        for (var idx = 0; idx < actualPrograms.value.length; ++idx) {
          if (actualPrograms.value[idx].id == program.id) {
            break;
          }
        }

        actualPrograms.value[idx].group = program.group;
        actualPrograms.value[idx].host = program.host;
        actualPrograms.value[idx].pid = program.pid;
        actualPrograms.value[idx].reboots = program.reboots;

        actualPrograms.value[idx]["class"] = actualPrograms.value[idx][
          "class"
        ].replace(/alert/g, "normal");
        for (var newModule of program["modules"]) {
          if (
            newModule["name"] == "component2" &&
            newModule["fails"] > newModule["trades"]
          ) {
            actualPrograms.value[idx]["class"] = "alert";
          }
        }

        for (newModule of program["modules"]) {
          for (var oldModule of actualPrograms.value[idx]["modules"]) {
            if (newModule["name"] == oldModule["name"]) {
              oldModule = newModule;
            }
          }
          if (newModule["name"] == "log") {
            if (newModule["level"] == "0") {
              color = "color: #67c23a"; // success
            } else if (newModule["level"] == "1") {
              color = "color: #e6a23c"; // warning
            } else if (newModule["level"] == "2") {
              color = "color: #ff1602"; // alert #f56c6c #f20c00
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
        if (logs.value.length > 40) {
          logs.value = logs.value.slice(logs.value.length - 40);
        }

        programs.value = [];
        if (isGrouping.value) {
          if (activeGroupIdx.value !== null) {
            for (group of grouped.value) {
              if (group.id === activeGroupIdx.value) {
                for (program of actualPrograms.value) {
                  if (program.group === activeGroupIdx.value) {
                    programs.value.push(program);
                  }
                }
              } else {
                newProgram = null;
                for (program of actualPrograms.value) {
                  if (program.group == group.id) {
                    if (program["class"].indexOf("alert") !== -1) {
                      newProgram = {
                        group: group.id,
                        name: group.name,
                        class: "alert",
                        modules: [
                          {
                            name: "component1",
                            orders: 0,
                            trades: 0,
                            fails: 0,
                          },
                          { name: "component2", currGMV: 0, maxGMV: 1 },
                          { name: "component3", symbols: 0, engaged: 0 },
                        ],
                      };
                      break;
                    } else {
                      newProgram = {
                        group: group.id,
                        name: group.name,
                        class: "normal",
                        modules: [
                          {
                            name: "component1",
                            orders: 0,
                            trades: 0,
                            fails: 0,
                          },
                          { name: "component2", currGMV: 0, maxGMV: 1 },
                          { name: "component3", symbols: 0, engaged: 0 },
                        ],
                      };
                    }
                  } else if (newProgram !== null) {
                    break;
                  }
                }
                if (newProgram !== null) {
                  programs.value.push(newProgram);
                }
              }
            }
          } else {
            for (group of grouped.value) {
              newProgram = null;
              for (program of actualPrograms.value) {
                if (program.group == group.id) {
                  if (program["class"].indexOf("alert") !== -1) {
                    newProgram = {
                      group: group.id,
                      name: group.name,
                      class: "alert",
                      modules: [
                        { name: "component1", orders: 0, trades: 0, fails: 0 },
                        { name: "component2", currGMV: 0, maxGMV: 1 },
                        { name: "component3", symbols: 0, engaged: 0 },
                      ],
                    };
                    break;
                  } else {
                    newProgram = {
                      group: group.id,
                      name: group.name,
                      class: "normal",
                      modules: [
                        { name: "component1", orders: 0, trades: 0, fails: 0 },
                        { name: "component2", currGMV: 0, maxGMV: 1 },
                        { name: "component3", symbols: 0, engaged: 0 },
                      ],
                    };
                  }
                } else if (newProgram !== null) {
                  break;
                }
              }
              if (newProgram !== null) {
                programs.value.push(newProgram);
              }
            }
          }
        } else if (onlyShowAlert.value) {
          var normal = [];
          var abnormal = [];
          for (program of actualPrograms.value) {
            if (program["class"].indexOf("alert") !== -1) {
              abnormal.push(program);
            } else {
              normal.push(program);
            }
          }
          programs.value = normal.concat(abnormal);
        } else {
          programs.value = actualPrograms.value;
        }
      }
      rows.value = Math.ceil(programs.value.length / cols.value);
    },
    function failHandler() {
      ElMessage.error("failure" + ":" + response.msg);
    },
    () => {
      // nothing
    }
  );
};

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

if (typeof WebSocket == "undefined") {
  ElMessage({
    message: "Websocket is unsupported, please use Chrome",
    grouping: true,
    type: "error",
  });
} else {
  // const socketUrl = 'ws://localhost:6919/wx/?level=all&key=all'
  // socketUrl = "ws://7.151.16.99:6919/quoter/all/all";
  socketUrl = process.env.VUE_APP_WEBSOCKET_URL + "quoter/all/all";
  createNewSocket();
}
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";

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
    font-size: 12px;
    margin-bottom: 10px;
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
  font-size: 8px;
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
    background-color: #006400; //#42b983;
  }

  &.success {
    background-color: #67c23a;
  }

  &.warning {
    background-color: #e6a23c;
  }

  &.alert {
    background-color: #ff1602; //#f20c00; //#f56c6c;
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
    color: #ff1602; // #f56c6c;
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