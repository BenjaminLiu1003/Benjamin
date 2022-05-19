<template>
  <el-row>
    <el-col :span="8">
      <el-table class="testtable"
                ref="table"
                :data="tableData"
                @row-click="handleRowClick"
                @current-change="handleCurrentChange"
                max-height='850px'
                :header-cell-style="{background:'transparent',color:'white','font-weight':'bold', 'font-size': '20px'}"
                :empty-text="t('no_data')"
                highlight-current-row>
        <el-table-column label="#"
                         width="80"
                         prop="id" />
        <el-table-column :label="t('photo')"
                         width="80">
          <template #default="scope">
            <el-image fit="cover"
                      style="width:4rem;height:3rem;"
                      :src="scope.row.photoUri" />
          </template>
        </el-table-column>
        <el-table-column property="name"
                         :label="t('name')"
                         width="160" />
        <el-table-column property="number"
                         :label="t('number')"
                         width="300"
                         show-overflow-tooltip />
      </el-table>
    </el-col>
    <el-col :span="16"
            style="margin-top:5px">
      <span style="color:white;font-weight:bold;font-size:20px;margin-left: 1rem;margin-right:20px;">
        {{ t('time_range') }}
      </span>
      <el-date-picker v-model="query.timeRange"
                      type="datetimerange"
                      :range-separator="t('to')"
                      :start-placeholder="t('start_time')"
                      :end-placeholder="t('end_time')"
                      @change="changeTimeRange" />
      <span style="color:white;font-weight:bold;font-size:20px;margin-left:20px;margin-right:20px;">
        {{ t('index_range') }}
      </span>
      <el-input-number v-model="query.from"
                       :min="0"
                       controls-position="right"
                       style="width:6rem" />
      <span style="color:white;font-weight:bold;font-size:20px;margin-left:20px;margin-right:20px;">
        {{ t('to') }}
      </span>
      <el-input-number v-model="query.to"
                       :min="0"
                       controls-position="right"
                       style="width:6rem;margin-right:20px;" />
      <el-button type="primary"
                 @click="handleFilterCaptures"
                 :icon="Filter">
        {{ t('filter') }}
      </el-button>
      <el-button type="danger"
                 @click="handleDeleteCaptures"
                 :icon="Delete">
        {{ t('delete') }}
      </el-button>
      <el-scrollbar max-height="760px"
                    style="padding: 1rem">
        <span v-if="captures.length===0"
              style="font-size:16px;color:white;">
          {{ t('no_data') }}
        </span>
        <el-timeline v-else>
          <el-timeline-item v-for="(capture, index) in captures"
                            :key="index"
                            :timestamp="formatTime(capture.captureTime*1000, 'yyyy-MM-dd HH:mm:ss')"
                            placement="top">
            <el-form label-position="top"
                     :inline="true"
                     :model="capture">
              <el-form-item prop="snapshotUri">
                <el-image :src="capture.snapshotUri"
                          fit="cover"
                          class="avatar" />
              </el-form-item>
              <el-form-item>
                <span style="font-size:16px;color:white;">
                  {{ t('body_temp') }}: {{ capture.bodyTemp / 1000.0 }}°C
                </span>
              </el-form-item>
              <el-form-item>
                <span style="font-size:16px;color:white;">{{ t('alarm_level') }}: {{ capture.helmetStatus }}</span>
              </el-form-item>
              <el-form-item>
                <span style="font-size:16px;color:white;">Helmet: {{ capture.helmetStatus }}</span>
              </el-form-item>
              <el-form-item>
                <span style="font-size:16px;color:white;">Mask: {{ capture.maskStatus }}</span>
              </el-form-item>
            </el-form>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, defineExpose, onBeforeUnmount } from 'vue'
import {
  Edit,
  Delete,
  DeleteFilled,
  Filter,
  TrendCharts,
  UploadFilled,
} from '@element-plus/icons'
import { formatTime } from '@/utils/index'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import http from '@/utils/network/http'
import { dealResponseCode } from '@/utils/functions'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const router = useRouter()

const table = ref()
let currentFaceId = ref(0)
let nowDate = new Date()
const query = ref({
  faceId: null,
  begin: null,
  end: null,
  timeRange: [new Date(nowDate - 7 * 24 * 3600 * 1000), nowDate],
  from: 0,
  to: 9,
})

const captures = ref([])

const handleCurrentChange = (row) => {
  console.log('change')
  // query.value.faceId = row ? row.faceId : null
  // queryCaptures()
}
const handleRowClick = (row, column, event) => {
  if (query.value.faceId == row.faceId) {
    table.value.setCurrentRow()
    query.value.faceId = null
  } else {
    query.value.faceId = row ? row.faceId : null
  }
  queryCaptures()
}

const changeTimeRange = (timeRange) => {
  if (timeRange) {
    query.value.begin = new Date(timeRange[0]).getTime() / 1000
    query.value.end = new Date(timeRange[1]).getTime() / 1000
  } else {
    query.value.begin = null
    query.value.end = null
  }
}

const handleFilterCaptures = () => {
  queryCaptures()
}

var tableData = ref([])
let total = ref(0)
const setData = (resp, startIndex) => {
  total.value = resp.total
  tableData.value = resp.infos ? resp.infos : []
  tableData.value.forEach((data, index) => {
    data.id = startIndex + index + 1
  })
}

defineExpose({
  setData,
  tableData,
})

const queryCaptures = () => {
  let query1 = Object.assign({ begin: null, end: null }, query.value)
  if (query1.timeRange) {
    query1.begin = Math.trunc(new Date(query1.timeRange[0]).getTime() / 1000)
    query1.end = Math.trunc(new Date(query1.timeRange[1]).getTime() / 1000)
    delete query1.timeRange
  }
  http.get('captures/faces/infos', query1).then((response) => {
    dealResponseCode(
      response,
      function successHandler() {
        captures.value = response.data.infos ? response.data.infos : []
      },
      function failHandler() {
        ElMessage.error(response.msg)
      }
    )
  })
}

queryCaptures()
</script>

<style lang="scss">
.el-timeline-item__timestamp.is-top {
  position: absolute;
  left: -195px;
  top: -3px;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.el-timeline {
  padding-left: 200px;
}
/* 滚动条 */
.el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 12px;
  background-color: transparent;
}
/* 滚动条的滑块 */
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 0px white;
  -webkit-box-shadow: inset 0 0 0px white;
  background-color: #a1a3a9;
  border-radius: 20px;
}

.testtable th {
  border: none;
}
.testtable td,
.testtable th.is-leaf {
  border: none;
}
/*表格最外边框*/
.testtable .el-table--border,
.el-table--group {
  border: none;
}
/*头部边框*/
.testtable thead tr th.is-leaf {
  border: 0px solid #ebeef5;
  border-right: none;
}
.testtable thead tr th:nth-last-of-type(2) {
  border-right: 0px solid #ebeef5;
}
/*表格最外层边框-底部边框*/
.testtable .el-table--border::after,
.testtable .el-table--group::after {
  width: 0;
}
.testtable::before {
  width: 0;
}
/* .testtable .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
} */
/* .testtable .el-table__header tr th {
  background: #fff;
  color: #333333;
  padding: 3px;
  font-weight: 550;
  height: 36px;
  border: 0px;
  font-size: 15px;
} */
.testtable .el-table__row > td {
  border: none;
}
.testtable .el-table::before {
  height: 0px;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.el-table thead {
  background-color: transparent;
}
.el-table th {
  background-color: red;
}
.el-table tr {
  background-color: transparent;
  font-size: 20px;
  /* color: white; */
}
.el-table__body tr:hover > td {
  background-color: gray !important;
  color: black;
}
.el-table__body tr.current-row > td {
  background: gray !important;
  color: black;
}
/*修改table 的背景颜色和文字颜色*/
/* .el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: red;
  background-color: black;
  color: white;
} */
.testtable .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: goldenrod;
}
/*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
/* .el-table tbody tr:hover > td {
  background-color: #eef1f6 !important;
} */
/* .el-table td,
.el-table th.is-leaf {
  border-bottom: 10px solid goldenrod;
} */
.el-table th {
  background-color: red;
}
/* .el-table::before {
  border-bottom: 1px solid blue;
  height: 2px;
} */
.el-table {
  color: white;
  font-size: 14px;
}
/* el-table列数据为空自动显示-- */
/* .cell:empty::before {
  content: '--';
  color: gray;
} */
</style>
