<template>
  <div id="container1"
       style="position:relative">
    <el-menu :default-active="activeSelection"
             mode="horizontal"
             background-color="black"
             text-color="white"
             @select="handleSelect">

      <el-menu-item index="all"
                    style="background-color: rgba(0, 0, 0, 0.1) !important">
        Overview
      </el-menu-item>

      <el-sub-menu index="project">
        <template #title>Project</template>
        <el-menu-item v-for="(project, index) in projects"
                      :key="index"
                      :index="project.name">
          {{ project.name }}
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="host">
        <template #title>Host</template>
        <el-menu-item v-for="(host, index) in hosts"
                      :key="index"
                      :index="host.name">
          {{ host.name }}
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

      <!-- <el-menu-item index="time"
                    disabled
                    style="position: absolute;right:0px;">
        {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
        {{ timeInfo.dateDay }}
      </el-menu-item> -->
    </el-menu>
    <div style="position:absolute;top:18px;right:200px;background-color:transparent;color:green;font-size:24px;"
         @click="settingVisible=true">
      <!-- <Setting style="height: 2em; width: 2em"/> -->
      <span>
        <svg-icon icon-class="setting" />
      </span>
    </div>
    <span class="text"
          style="position:absolute;top:20px;right:0px;">
      {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
      {{ timeInfo.dateDay }}
    </span>
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
          <el-dropdown-menu v-for="(group, index) in projects"
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
    <el-main class="scroll">
      <el-row :gutter="5"
              v-for="row in Math.ceil(programs.length / settings.grid.cols)"
              :key="row"
              style="margin-top:0px"
              :style="{height: settings.grid.height + 'px'}">
        <el-col :span="24 / settings.grid.cols"
                v-for="col in settings.grid.cols"
                :key="col"
                style="padding: 0px">
          <el-popover v-if="(row - 1) * settings.grid.cols + col - 1 < programs.length"
                      :width="800"
                      trigger="hover"
                      :show-after="300"
                      :popper-options="{ placement: 'bottom', modifiers: [{name:'offset', options: { offset: [0, 8]}}] }"
                      :fallback-placements="['bottom', 'top', 'right', 'left']">
            <!-- :append-to_body="false" -->
            <!-- popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"> -->
            <template #reference>
              <div class="thumbnail-box content"
                   :class="programs[(row - 1) * settings.grid.cols + col - 1].state + ((row - 1) * settings.grid.cols + col - 1 == activePgIdx ? ' hover' : '')"
                   @mouseenter="enterBox((row - 1) * settings.grid.cols + col - 1)"
                   @mouseleave="leaveBox"
                   :style="{minHeight: settings.grid.height + 'px', fontSize: settings.grid.fontSize + 'px'}">
                {{ programs[(row - 1) * settings.grid.cols + col - 1].program }}
              </div>
            </template>
            <template #default>
              <div class="scroll"
                   style="max-height:780px;overflow: auto;">
                <el-descriptions title="Program Details"
                                 direction="vertical"
                                 :column="10"
                                 size="large"
                                 border>
                  <el-descriptions-item label="Program"
                                        :span="3"
                                        align="center"
                                        label-align="center">
                    {{ programs[(row - 1) * settings.grid.cols + col - 1].program }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Host"
                                        :span="2"
                                        align="center"
                                        label-align="center">
                    {{ programs[(row - 1) * settings.grid.cols + col - 1].host }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Pid"
                                        :width="85"
                                        align="center"
                                        label-align="center">
                    {{ programs[(row - 1) * settings.grid.cols + col - 1].pid }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Reboots"
                                        :width="85"
                                        align="center"
                                        label-align="center">
                    <el-tag type="danger">
                      {{ programs[(row - 1) * settings.grid.cols + col - 1].reboots }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Since"
                                        :span="3"
                                        align="center"
                                        label-align="center">
                    {{ formatTime(1000 * programs[(row - 1) * settings.grid.cols + col - 1].startTime, "yyyy-MM-dd HH:mm:ss") }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Orders"
                                        :width="85"
                                        align="center"
                                        label-align="center">
                    <el-tag type="success">
                      {{ getOrders((row - 1) * settings.grid.cols + col - 1) }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Trades"
                                        :width="85"
                                        align="center"
                                        label-align="center">
                    <el-tag type="success">
                      {{ getTrades((row - 1) * settings.grid.cols + col - 1) }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Fails"
                                        :width="85"
                                        align="center"
                                        label-align="center">
                    <el-tag type="danger">
                      {{ getFails((row - 1) * settings.grid.cols + col - 1) }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Symbols"
                                        :width="85"
                                        align="center"
                                        label-align="center">
                    <el-tag type="success">
                      {{ getSymbols((row - 1) * settings.grid.cols + col - 1) }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Engaged"
                                        :width="85"
                                        align="center"
                                        label-align="center">
                    <el-tag type="success">
                      {{ getEngaged((row - 1) * settings.grid.cols + col - 1) }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="CurrGMV / MaxGMV"
                                        :span="5"
                                        align="center"
                                        label-align="center">
                    <el-progress :text-inside="true"
                                 :stroke-width="24"
                                 :percentage="getGMVPercentage((row - 1) * settings.grid.cols + col - 1)"
                                 :format="formatGMV((row - 1) * settings.grid.cols + col - 1)" />
                  </el-descriptions-item>
                  <el-descriptions-item :label="formatComponentTitle((row - 1) * settings.grid.cols + col - 1)"
                                        :span="10">
                    <json-viewer :value="programs[(row - 1) * settings.grid.cols + col - 1]['modules']"
                                 sort
                                 copyable
                                 theme="my-awesome-json-theme"></json-viewer>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
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
    <el-aside width="640px">
      <el-carousel style="height:15%" class="scroll">
        <el-carousel-item>
          <el-progress v-for="(summary, index) in projectsSummary" :key="index" type="dashboard" :percentage="summary['progress']" :color="summaryColors">
            <template #default="{ percentage }">
              <span style="display:block; margin-top:10px;font-size:28px">
                  {{ percentage }}%
              </span>
              <span style="display:block;margin-top:10px;font-size:12px;">
                  {{ summary['project'] }}
              </span>
            </template>
          </el-progress>
        </el-carousel-item>
      </el-carousel>
      <!-- <el-card v-if="0"
               style="height:0px">
        <div v-if="activePgIdx"
             class="clearfix">
          <span>
            {{ programs[activePgIdx].program + "@" + programs[activePgIdx].host }}
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
            <el-badge :value="programs[activePgIdx]['modules'][1].currGMV"
                      :max="20000000"
                      class="item"
                      type="primary" />
            <el-badge :value="programs[activePgIdx]['modules'][1].maxGMV"
                      :max="20000000"
                      class="item"
                      type="primary" />
          </el-descriptions-item>
          <el-descriptions-item label="Symbols"
                                label-align="center"
                                align="center">
            <el-progress :text-inside="true"
                         :stroke-width="24"
                         :percentage="programs[activePgIdx]['modules'][2].engaged * 100 / programs[activePgIdx]['modules'][2].symbols"
                         :format="formatSymbols(programs[activePgIdx]['modules'][2].symbols, programs[activePgIdx]['modules'][2].engaged)"
                         status="success"></el-progress>
            <el-badge :value="programs[activePgIdx]['modules'][2].symbols"
                      :max="10000000"
                      class="item"
                      type="primary" />
            <el-badge :value="programs[activePgIdx]['modules'][2].engaged"
                      :max="10000000"
                      class="item"
                      type="primary" />
          </el-descriptions-item>
        </el-descriptions>
      </el-card> -->
      <div v-scrollBottom
           class="scroll"
           style="height:85%;background-color:black;">
        <div v-for="(log, index) in logs"
             :key="index"
             class="scroll-item"
             :class="log.state">
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

  <el-dialog v-model="settingVisible"
             title="Settings"
             width="40%">
    <template #default>
      <el-form ref="settings_form"
               :model="settings"
               label-width="auto"
               label-position="left"
               size="default">

        <el-form-item label="Projects">
          <el-checkbox-group v-model="settings.projects"
                             @change="changeProjectsFilter">
            <el-checkbox-button v-for="(project, index) in projects"
                                :key="index"
                                :label="project.name"
                                name="type" />
          </el-checkbox-group>
          <el-checkbox v-model="settings.selectAllProjects"
                       :indeterminate="settings.indeterminateProjects"
                       @change="checkAllProjects">
            Select all projects
          </el-checkbox>
        </el-form-item>

        <el-form-item label="Hosts">
          <el-checkbox-group v-model="settings.hosts"
                             @change="changeHostsFilter">
            <el-checkbox-button v-for="(host, index) in hosts"
                                :key="index"
                                :label="host.name"
                                name="type" />
          </el-checkbox-group>
          <el-checkbox v-model="settings.selectAllHosts"
                       :indeterminate="settings.indeterminateHosts"
                       @change="checkAllHosts">
            Select all hosts
          </el-checkbox>
        </el-form-item>

        <el-form-item label="Grid">
          <span style="margin-right:10px">Columns</span>
          <el-radio-group v-model="settings.grid.cols"
                          size="medium">
            <el-radio-button v-for="value in colsSelections"
                             :key="value"
                             :label="value" />
          </el-radio-group>
          <div style="margin-top:10px">
            <span style="margin-right:24px;">Height</span>
            <el-input-number v-model="settings.grid.height"
                             :min="25"
                             :max="80"
                             size="small" />
            <span style="margin-left:10px;margin-right:10px;">Font size</span>
            <el-input-number v-model="settings.grid.fontSize"
                             :min="6"
                             :max="12"
                             size="small" />
          </div>
        </el-form-item>

        <el-form-item label="Color">
          <div style="display: flex;align-items: center;margin-bottom: 16px;">
            <span class="demonstration"
                  style="margin-right: 10px;">INFO</span>
            <el-color-picker v-model="normalColor" />
            <span class="demonstration"
                  style="margin-left:10px;margin-right:10px;">WARN</span>
            <el-color-picker v-model="warningColor" />
            <span class="demonstration"
                  style="margin-left:10px;margin-right:10px;">ERROR</span>
            <el-color-picker v-model="alertColor" />
          </div>
        </el-form-item>
      </el-form>
      <!-- <el-tree-select v-model="selection"
                      :data="selections"
                      multiple
                      show-checkbox />
      Which combinations you want to monitor?
      <treeselect v-model="selection"
                  :multiple="true"
                  :options="selections" /> -->
    </template>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="settingVisible=false">
          Cancel
        </el-button> -->
        <el-button type="primary"
                   @click="handleSaveSettings">
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  reactive,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  defineComponent,
} from "vue";
import { Setting } from "@element-plus/icons-vue";
// import EntryDrawer from './components/entrydrawer.vue'
import http from "@/utils/network/http";
import { ElMessage } from "_element-plus@1.2.0-beta.6@element-plus/es";
import { dealResponseCode } from "@/utils/functions";
import { formatTime } from "@/utils/index";
import { subtitle, WEEK } from "@/constant/index";
import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";

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

const normalColor = ref("#006400");
const alertColor = ref("#ff1602");
const warningColor = ref("#e6a23c");
const selection = ref();
const selections = ref([
  {
    id: "all_hosts",
    label: "All Hosts",
    children: [
      {
        id: "host_1",
        label: "fpis_kbsiml14",
      },
      {
        id: "host_2",
        label: "fpis_kbsiml35",
      },
      {
        id: "host_3",
        label: "fpis_kbsiml66",
      },
    ],
  },
  {
    id: "all_strategies",
    label: "All Strategies",
    children: [
      {
        id: "strategy_1",
        label: "JCT",
      },
      {
        id: "strategy_2",
        label: "JPAU",
      },
      {
        id: "strategy_3",
        label: "JPHEDG",
      },
      {
        id: "strategy_4",
        label: "JTRISK",
      },
    ],
  },
]);

const jsonData = {
  PROGRAM: [
    {
      name: "JCTHEDG_1",
      startTime: 1653465021,
    },
  ],
  RISK: [
    {
      name: "risk",
      priority: 41,
    },
  ],
  RMMSTATUS: [
    {
      name: "rmmst",
      priority: 500,
    },
  ],
  PECM: [
    {
      name: "pecm",
      priority: 950,
    },
  ],
  PEALPHA: [
    {
      name: "preoo",
      priority: 500,
    },
  ],
  LGBM: [
    {
      name: "LGBM_OO_0900",
      priority: 200,
    },
    {
      name: "LGBM_OO_VWAP",
      priority: 200,
    },
    {
      name: "LGBM_OO_Flow",
      priority: 200,
    },
    {
      name: "LGBM_00_5m",
      priority: 200,
    },
  ],
  S201: [
    {
      name: "preopen",
      currGMV: 11877554,
      maxGMV: 101368752.959531,
      symbols: 399,
      engaged: 399,
      priority: 500,
    },
  ],
  RISKDATA: [
    {
      name: "rds",
      priority: 22,
    },
  ],
  ALPHA: [
    {
      name: "alpha",
      priority: 1,
    },
  ],
  PRED: [
    {
      name: "alpha.p201",
      priority: 1,
    },
  ],
  PWGT: [
    {
      name: "wgtset.dftwgt",
      priority: 500,
    },
  ],
  MDA: [
    {
      name: "MDA",
      priority: 2,
    },
  ],
  MD: [
    {
      name: "md",
      priority: 8,
    },
  ],
  BKCK: [
    {
      name: "bkck",
      priority: 1000,
    },
  ],
  QRLOG: [
    {
      name: "qrlog",
      priority: 1,
    },
  ],
  CTM: [
    {
      name: "ct",
      priority: 31,
    },
  ],
  MCM: [
    {
      name: "mcc",
      priority: 5,
    },
  ],
  ASPECT: [
    {
      name: "aspect",
      priority: 9,
    },
  ],
  PNL: [
    {
      name: "pnl",
      priority: 900,
    },
  ],
  TCM: [
    {
      name: "tcm",
      priority: 9,
    },
  ],
  DE: [
    {
      name: "de",
      priority: 700,
    },
  ],
  LIQSTGY: [
    {
      name: "liqstgy",
      currGMV: 11877913,
      maxGMV: 100500011.259417,
      symbols: 399,
      engaged: 399,
      priority: 500,
    },
  ],
};
// const data = [
//   {
//     value: '1',
//     label: 'Level one 1',
//     children: [
//       {
//         value: '1-1',
//         label: 'Level two 1-1',
//         children: [
//           {
//             value: '1-1-1',
//             label: 'Level three 1-1-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: '2',
//     label: 'Level one 2',
//     children: [
//       {
//         value: '2-1',
//         label: 'Level two 2-1',
//         children: [
//           {
//             value: '2-1-1',
//             label: 'Level three 2-1-1',
//           },
//         ],
//       },
//       {
//         value: '2-2',
//         label: 'Level two 2-2',
//         children: [
//           {
//             value: '2-2-1',
//             label: 'Level three 2-2-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: '3',
//     label: 'Level one 3',
//     children: [
//       {
//         value: '3-1',
//         label: 'Level two 3-1',
//         children: [
//           {
//             value: '3-1-1',
//             label: 'Level three 3-1-1',
//           },
//         ],
//       },
//       {
//         value: '3-2',
//         label: 'Level two 3-2',
//         children: [
//           {
//             value: '3-2-1',
//             label: 'Level three 3-2-1',
//           },
//         ],
//       },
//     ],
//   },
// ]

const formatTimeInfo = (date) => {
  // const date = new Date();
  timeInfo.dateDay = formatTime(date, "HH: mm: ss");
  timeInfo.dateYear = formatTime(date, "yyyy-MM-dd");
  timeInfo.dateWeek = WEEK[date.getDay()];
};

const handleTime = () => {
  timeInfo.setInterval = setInterval(() => {
    formatTimeInfo(new Date());
  }, 1000);
};

formatTimeInfo(new Date());
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

let projectsSummary = ref([
  {
    'project': 'brazil',
    'progress': 10,
  },
  {
    'project': 'japan',
    'progress': 80,
  },
  {
    'project': 'preopen',
    'progress': 66,
  },
  {
    'project': 'useqau',
    'progress': 99,
  },
  {
    'project': 'useqct',
    'progress': 36, 
  },
]);
const summaryColors = ref([
  { color: alertColor, percentage: 20 },
  { color: warningColor, percentage: 40 },
  { color: normalColor, percentage: 60 },
  { color: normalColor, percentage: 80 },
  { color: normalColor, percentage: 100 },
])

let projects = ref([]);
let hosts = ref([]);
let socket, socketUrl;
const settings = reactive({
  hosts: [],
  projects: [],
  selectAllHosts: false,
  selectAllProjects: false,
  indeterminateHosts: false,
  indeterminateProjects: false,
  grid: {
    cols: 24,
    height: 25,
    fontSize: 6,
    infoColor: 'green',
    warnColor: 'yellow',
    errorColor: 'red',
  },
});

const filterProgramsViaHostsAndProjects = () => {
  socketUrl =
    process.env.VUE_APP_WEBSOCKET_URL +
    "quoter?" +
    JSON.stringify({ hosts: settings.hosts, projects: settings.projects });
  createNewSocket();
};

const changeProjectsFilter = (value) => {
  settings.selectAllProjects = value.length === projects.value.length;
  settings.indeterminateProjects =
    value.length > 0 && value.length < projects.value.length;
  filterProgramsViaHostsAndProjects();
};

const changeHostsFilter = (value) => {
  settings.selectAllHosts = value.length === hosts.value.length;
  settings.indeterminateHosts =
    value.length > 0 && value.length < hosts.value.length;
  filterProgramsViaHostsAndProjects();
};

const checkAllProjects = (value) => {
  settings.projects = [];
  if (value) {
    for (var project of projects.value) {
      settings.projects.push(project.name);
    }
  }
  settings.indeterminateProjects = false;
  filterProgramsViaHostsAndProjects();
};

const checkAllHosts = (value) => {
  settings.hosts = [];
  if (value) {
    for (var host of hosts.value) {
      settings.hosts.push(host.name);
    }
  }
  settings.indeterminateHosts = false;
  filterProgramsViaHostsAndProjects();
};

let onlyShowAlert = ref(false);
let actualPrograms = ref([]); // the stored whole programs
let programs = ref([]); // for show

let logs = ref([]);
const activeGroupIdx = ref(null);
let activePgIdx = ref(null);
const activeSelection = ref("all");
let isGrouping = ref(false);
let settingVisible = ref(false);

const getOrders = (index) => {
  for (var key in programs.value[index].modules) {
    if (key !== "gwm") {
      continue;
    }
    return programs.value[index].modules[key].orders;
  }
  return 0;
};

const getTrades = (index) => {
  for (var key in programs.value[index].modules) {
    if (key !== "gwm") {
      continue;
    }
    return programs.value[index].modules[key].trades;
  }
  return 0;
};

const getFails = (index) => {
  for (var key in programs.value[index].modules) {
    if (key !== "gwm") {
      continue;
    }
    return programs.value[index].modules[key].fails;
  }
  return 0;
};

const getSymbols = (index) => {
  for (var key in programs.value[index].modules) {
    if (key !== "liqstgy") {
      continue;
    }
    return programs.value[index].modules[key].symbols;
  }
  return 0;
};

const getEngaged = (index) => {
  for (var key in programs.value[index].modules) {
    if (key !== "liqstgy") {
      continue;
    }
    return programs.value[index].modules[key].engaged;
  }
  return 0;
};

const getMaxGMV = (index) => {
  for (var key in programs.value[index].modules) {
    if (key !== "liqstgy") {
      continue;
    }
    return programs.value[index].modules[key].maxGMV;
  }
  return 0;
};

const getCurrGMV = (index) => {
  for (var key in programs.value[index].modules) {
    if (key !== "liqstgy") {
      continue;
    }
    return programs.value[index].modules[key].currGMV;
  }
  return 0;
};

const formatGMV = (index) => {
  return () => {
    return "Curr:" + getCurrGMV(index); // + ",Max:" + maxGMV;
  };
};

const getGMVPercentage = (index) => {
  var maxGMV = getMaxGMV(index);
  if (maxGMV == 0) {
    return 0;
  }
  return (getCurrGMV(index) * 100) / maxGMV;
};

const formatComponentTitle = (index) => {
  return (
    "All Components Information (updated since " +
    programs.value[index].updateTime +
    ")"
  );
};

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
    isGrouping.value = false;
    socketUrl = process.env.VUE_APP_WEBSOCKET_URL + "quoter";
  } else if (keyPath[0] == "host") {
    isGrouping.value = false;
    socketUrl =
      process.env.VUE_APP_WEBSOCKET_URL +
      "quoter?" +
      JSON.stringify({ hosts: [key] });
  } else if (keyPath[0] == "project") {
    isGrouping.value = false;
    socketUrl =
      process.env.VUE_APP_WEBSOCKET_URL +
      "quoter?" +
      JSON.stringify({ projects: [key] });
  }

  createNewSocket();
};

const formatLogTitle = (index) => {
  for (var program of actualPrograms.value) {
    if (logs.value[index].program_id === program.program_id) {
      return (
        "[" +
        logs.value[index].ctime +
        "]:" +
        program.program +
        "@" +
        program.host
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
      if (program["state"].indexOf("alert") !== -1) {
        abnormal.push(program);
      } else {
        normal.push(program);
      }
    }
    programs.value = normal.concat(abnormal);
  } else {
    programs.value = actualPrograms.value;
  }
  // rows.value = Math.ceil(programs.value.length / cols.value);
});

watch(activeGroupIdx, (newValue, oldValue) => {
  if (newValue == null) {
    if (isGrouping.value) {
      programs.value = [];
      for (var group of projects.value) {
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
      for (group of projects.value) {
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
        //   message: projects.value[program.group].name,
        //   grouping: true,
        //   type: "success",
        // });
      }
    }

    // var oldGroupIdx = -1,
    //   newGroupIdx = -1;
    // for (var group of projects.value) {
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
  // activeGroupIdx.value = programs.value[index].group;
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
  activePgIdx.value = null;
  activeGroupIdx.value = null;
  // for ( var i = 0; i < programs.value.length; ++i) {
  //   programs.value[i].class.replace(/opacity/g, "")
  // }
};

const logContainer = ref(null);
// let rows = ref(0);
// let cols = ref(24);
const colsSelections = ref([1, 2, 4, 6, 8, 12, 24]);
// let gridHeight = ref(25);
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
  //   stopQueryStatus()
});

const tableRowClassName = ({ row, rowIndex }) => {
  if (row.second.fails > 300) {
    return "error-row";
  } else if (row.second.since == "") {
    return "warning-row";
  }
  return "";
};

const formatSymbols = (symbols, engaged) => {
  return () => {
    return "Symbols:" + symbols + ",Engaged: " + engaged;
  };
};

const parseSocketMsg = (msg) => {
  var response = JSON.parse(msg.data);
  console.log("Response:", response);
  dealResponseCode(
    response,
    function successHandler() {
      var data = response.data;
      // first time: get the whole programs
      if (data.programs !== undefined) {
        onlyShowAlert.value = false;
        actualPrograms.value = [];
        programs.value = [];
        projects.value = [];
        hosts.value = [];
        logs.value = [];
        // rows.value = 0;
        activePgIdx.value = null;
        activeGroupIdx.value = null;

        if (data.logs !== undefined) {
          for (var log of data.logs) {
            if (log.level == "0") {
              // var color = "color: " + normalColor.value;// "color: #67c23a"; // success
              var state = "normal";
            } else if (log.level == "1") {
              // color = "color: " + warningColor.value;// "color: #e6a23c"; // warning
              state = "warning";
            } else if (log.level == "2") {
              // color = "color: " + alertColor.value;// "color: #ff1602"; // alert #f56c6c #f20c00
              state = "alert";
            } else {
              // color = "color: #909399";
              state = "normal";
            }
            logs.value.push({
              program_id: log.program,
              text: log.text,
              level: log.level,
              state: state,
              ctime: log.ctime,
            });
          }
        }

        projects.value = data.projects;
        for (var project of projects.value) {
          project.opacity = 1;
        }

        hosts.value = data.hosts;
        actualPrograms.value = data.programs;

        for (program of actualPrograms.value) {
          // for (var i = 0; i < actualPrograms.value.length; ++i) {
          if (program.modules == undefined) {
            program.modules = {};
            program["state"] = "dead blink-border";
          } else {
            program["state"] = "normal";
            for (var key in program.modules) {
              if (
                key == "gwm" &&
                program.modules[key].fails > program.modules[key].trades
              ) {
                program["state"] = "alert";
              }
            }
          }
          var now = new Date();
          program["last_state_time"] = now.getTime();
        }

        if (isGrouping.value) {
          for (var group of projects.value) {
            var newProgram = null;
            for (var program of actualPrograms.value) {
              if (program.group == group.id) {
                if (program["class"].indexOf("alert") !== -1) {
                  newProgram = {
                    group: group.id,
                    name: group.name,
                    state: "alert",
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
                    state: "normal",
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
      } else {
        program = data.program;
        for (var idx = 0; idx < actualPrograms.value.length; ++idx) {
          if (actualPrograms.value[idx].program_id == program.program_id) {
            break;
          }
        }
        if (idx >= actualPrograms.value.length) {
          return;
        }

        var oldState = actualPrograms.value[idx]["state"];
        var lastStateTime = actualPrograms.value[idx]["last_state_time"];
        var newState = "normal";
        actualPrograms.value[idx] = program;

        // actualPrograms.value[idx]["class"] = actualPrograms.value[idx][
        //   "class"
        // ].replace(/alert/g, "normal");
        for (key in program.modules) {
          if (
            key == "gwm" &&
            program.modules[key].fails > program.modules[key].trades
          ) {
            newState = "alert";
          }
        }

        now = new Date();
        if (oldState == "alert" && newState == "normal") {
          if (now.getTime() - lastStateTime > 30 * 1000) {
            actualPrograms.value[idx]["state"] = newState;
          } else {
            actualPrograms.value[idx]["state"] = oldState;
          }
        } else {
          actualPrograms.value[idx]["state"] = newState;
        }
        actualPrograms.value[idx]["last_state_time"] = now.getTime();

        if (program["log"] && JSON.stringify(program["log"]) !== "{}") {
          if (program["log"]["level"] == "0") {
            // color = "color: #67c23a"; // success
            state = "normal";
          } else if (program["log"]["level"] == "1") {
            // color = "color: #e6a23c"; // warning
            state = "warning";
          } else if (program["log"]["level"] == "2") {
            // color = "color: #ff1602"; // alert #f56c6c #f20c00
            state = "alert";
          } else {
            // color = "color: #909399";
            state = "normal";
          }
          logs.value.push({
            program_id: program.program_id,
            text: program["log"]["text"],
            level: program["log"]["level"],
            // color: color,
            state: state,
            ctime: program["log"]["ctime"],
          });
        }

        if (logs.value.length > 40) {
          logs.value = logs.value.slice(logs.value.length - 40);
        }

        programs.value = [];
        if (isGrouping.value) {
          if (activeGroupIdx.value !== null) {
            for (group of projects.value) {
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
            for (group of projects.value) {
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
            if (program["state"].indexOf("alert") !== -1) {
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
      // rows.value = Math.ceil(programs.value.length / cols.value);
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
const handleSaveSettings = () => {
  const data = {
    "info_color": normalColor.value,
		"warn_color": warningColor.value,
    "error_color": alertColor.value,
		"grid_cols": settings.grid.cols,
    "grid_height": settings.grid.height,
    "grid_font_size": settings.grid.fontSize,
    "hosts": settings.hosts,
    "projects": settings.projects,
	}
  http.post("settings/all", data).then((response) => {
    dealResponseCode(response, () => {
      ElMessage({
        message: "Settings saved",
        grouping: true,
        type: 'success',
      })
    }, () => {
      ElMessage({
        message: 'Fail to save settings',
        grouping: true,
        type: 'error',
      })
    }, () => {
      //
    })
  })
}

const getUserSettings = () => {
  http.get("settings/all").then((response) => {
    dealResponseCode(
      response,
      () => {
        console.log(response.data.settings);
        settings.grid.cols = response.data.settings.grid_cols;
        settings.grid.height = response.data.settings.grid_height;
        settings.grid.fontSize = response.data.settings.grid_font_size;
        
        normalColor.value = response.data.settings.info_color;
        warningColor.value = response.data.settings.warn_color;
        alertColor.value = response.data.settings.error_color;

        console.log('normal:', normalColor.value)
        console.log('warning:', warningColor.value)
        console.log('alert:', alertColor.value)

        for (var host of response.data.settings.hosts) {
          settings.hosts.push(host.name);
        }
        for (var project of response.data.settings.projects) {
          settings.projects.push(project.name);
        }

        if (typeof WebSocket == "undefined") {
          ElMessage({
            message: "Websocket is unsupported, please use Chrome",
            grouping: true,
            type: "error",
          });
        } else {
          socketUrl = 'ws:' + location.host + process.env.VUE_APP_SOCKET_API_URL;
          // socketUrl = process.env.VUE_APP_WEBSOCKET_URL + "quoter";
          createNewSocket();
        }
      },
      () => {
        ElMessage({
          message: "Fail to get settings for current user",
          grouping: true,
          type: "error",
        });
        setTimeout(() => {
          getUserSettings();
        }, 2000);
      },
      () => {
        //
      }
    );
  });
};

getUserSettings();
// socketUrl = process.env.VUE_APP_WEBSOCKET_URL + "quoter";
// createNewSocket();
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";

// values are default one from jv-light template
.my-awesome-json-theme {
  background: transparent;
  white-space: nowrap;
  color: #525252;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;

  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button {
    color: #49b3ff;
  }
  .jv-key {
    color: #111111;
  }
  .jv-item {
    &.jv-array {
      color: #111111;
    }
    &.jv-boolean {
      color: #fc1e70;
    }
    &.jv-function {
      color: #067bca;
    }
    &.jv-number {
      color: #fc1e70;
    }
    &.jv-number-float {
      color: #fc1e70;
    }
    &.jv-number-integer {
      color: #fc1e70;
    }
    &.jv-object {
      color: #111111;
    }
    &.jv-undefined {
      color: #e08331;
    }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}

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
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .scroll-item {
    // height: 200px;
    font-size: 12px;
    margin-bottom: 10px;
  }
}

// .hover {
//   position: relative;
//   border: 2px solid white;
//   border-radius: 5px;
//   transition: all 0.3s;
// }

// @keyframes div5Ani {
//   0%,
//   100% {
//     clip-path: inset(0 0 98% 0);
//   }

//   25% {
//     clip-path: inset(0 98% 0 0);
//   }
//   50% {
//     clip-path: inset(98% 0 0 0);
//   }
//   75% {
//     clip-path: inset(0 0 0 98%);
//   }
// }

// .hover::before {
//   content: "";
//   position: absolute;
//   top: -10px;
//   left: -10px;
//   right: -10px;
//   bottom: -10px;
//   border: 2px solid white;
//   border-radius: 5px;
//   animation: div5Ani 3s infinite linear;
// }

// .hover::after {
//   content: "";
//   position: absolute;
//   top: -10px;
//   left: -10px;
//   right: -10px;
//   bottom: -10px;
//   border: 2px solid #ffd700;
//   border-radius: 5px;
//   animation: div5Ani 3s infinite linear;
// }

// .hover::after {
//   animation: div5Ani 3s infinite -1.5s linear;
// }

// @keyframes animated-border {
//   0% {
//     box-shadow: 0 0 0 0 rgba(255,255,255,0.8);
//   }
//   100% {
//      box-shadow: 0 0 0 20px rgba(255,255,255,0);
//   }
// }

// .hover{
//   animation: animated-border 1.5s infinite;
//   line-height: 30px;
//   font-weight: bold;
//   color: white;
//   border: 2px solid;
//   border-radius: 10px;
//   padding: 15px;
// }

@keyframes animated-border {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
}

.hover {
  outline: 2px solid white;
  outline-offset: -2px;
  animation: animated-border 1.5s infinite;
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
  font-size: 6px;
  border-radius: 5px;

  &.content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    // height: 55px;
    // min-height: v-bind(`${gridHeight}px`);
    // margin: 6px;
    padding: 10%;
    text-overflow: ellipsis;

    // @keyframes animated-border {
    //   0% {
    //     box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8);
    //   }
    //   100% {
    //     box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
    //   }
    // }

    // &.hover {
    //   // border: 2px white inset;
    //   outline: 2px solid white;
    //   outline-offset: -2px;
    //   animation: animated-border 1.5s infinite;
    //   padding: 15px;
    // }
    // &.hover {
    //   position: relative;
    //   border: 2px solid white;
    //   border-radius: 5px;
    //   transition: all 0.3s;
    // }

    // @keyframes div5Ani {
    //   0%,
    //   100% {
    //     clip-path: inset(0 0 98% 0);
    //   }

    //   25% {
    //     clip-path: inset(0 98% 0 0);
    //   }
    //   50% {
    //     clip-path: inset(98% 0 0 0);
    //   }
    //   75% {
    //     clip-path: inset(0 0 0 98%);
    //   }
    // }

    // &.hover::before {
    //   content: "";
    //   position: absolute;
    //   top: -10px;
    //   left: -10px;
    //   right: -10px;
    //   bottom: -10px;
    //   border: 2px solid white;
    //   border-radius: 5px;
    //   animation: div5Ani 3s infinite linear;
    // }

    // &.hover::after {
    //   content: "";
    //   position: absolute;
    //   top: -10px;
    //   left: -10px;
    //   right: -10px;
    //   bottom: -10px;
    //   border: 2px solid #ffd700;
    //   border-radius: 5px;
    //   animation: div5Ani 3s infinite linear;
    // }

    // &.hover::after {
    //   animation: div5Ani 3s infinite -1.5s linear;
    // }
  }

  &.opacity {
    opacity: 0.5;
  }

  &.normal {
    background-color: v-bind(normalColor); //#006400; //#42b983;
  }

  &.success {
    background-color: #67c23a;
  }

  &.warning {
    background-color: v-bind(warningColor); //#e6a23c;
  }

  &.alert {
    background-color: v-bind(alertColor); //#ff1602; //#f20c00; //#f56c6c;
  }

  &.dead {
    background-color: #909399;
  }
}

.scroll-item {
  &.normal {
    color: v-bind(normalColor); //#006400; //#42b983;
  }

  &.success {
    color: v-bind(normalColor); // #67c23a;
  }

  &.warning {
    color: v-bind(warningColor); //#e6a23c;
  }

  &.alert {
    color: v-bind(alertColor); //#ff1602; //#f20c00; //#f56c6c;
  }

  &.dead {
    color: #909399;
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