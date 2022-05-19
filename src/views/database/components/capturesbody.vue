<template>
  <el-table class="testtable"
            ref="table"
            :data="tableData"
            @cell-click="handleCellClick"
            @current-change="handleCurrentChange"
            max-height='850px'
            :header-cell-style="{background:'transparent',color:'white','font-weight':'bold', 'font-size': '20px'}"
            :empty-text="t('no_data')"
            :span-method="spanMethod"
            :row-class-name="rowClassName"
            highlight-current-row>
    <el-table-column width="55">
      <template #default="scope">
        <el-checkbox v-model="scope.row.selected"
                     @click.prevent="selectRow(scope.row)" />
      </template>
    </el-table-column>
    <el-table-column label="#"
                     width="80"
                     prop="id" />
    <el-table-column :label="t('photo')"
                     width="80">
      <template #default="scope">
        <el-image fit="cover"
                  style="width:4rem;height:3rem;"
                  :src="scope.row.photoUri"
                  :preview-src-list="[scope.row.photoUri]" />
      </template>
    </el-table-column>
    <el-table-column property="name"
                     :label="t('name')"
                     width="160" />
    <el-table-column property="number"
                     :label="t('number')"
                     width="300"
                     show-overflow-tooltip />
    <el-table-column :label="t('captures') + (totalCaptures > 0 ? '/' + t('total') + totalCaptures + t('entries') : '')"
                     className="v-align-t">
      <!-- @cell-click.stop=""> -->
      <!-- <template #header>
        <span style="color:white;font-weight:bold;font-size:20px;margin-left: 1rem;margin-right:20px;">
          {{ t('time_range') }}
        </span>
        <el-date-picker v-model="query.timeRange"
                        type="datetimerange"
                        :range-separator="t('to')"
                        :start-placeholder="t('start_time')"
                        :end-placeholder="t('end_time')"
                        :shortcuts="shotcuts"
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
      </template> -->
      <template #default>
        <el-scrollbar height="720px"
                      style="padding:1rem;">
          <!-- @click.stop=""> -->
          <!-- <span v-if="captures.length===0"
                style="font-size:16px;color:white;">
            {{ t('no_data') }}
          </span> -->
          <el-empty v-show="captures.length===0"
                    :description="t('no_data')" />
          <el-timeline v-if="captures.length">
            <el-timeline-item v-for="(capture, index) in captures"
                              :key="index"
                              :color="capture.alarmLevel > 0 ? 'red': 'green'"
                              :timestamp="formatTime(capture.captureTime*1000, 'yyyy-MM-dd HH:mm:ss')"
                              placement="top">
              <el-row type="flex"
                      align="middle">
                <el-col :span="5">
                  <el-image :src="capture.snapshotUri"
                            :preview-src-list="[capture.snapshotUri]"
                            fit="cover"
                            class="avatar"
                            lazy />
                </el-col>
                <el-col :span="5">
                  <span style="font-size:16px;color:white;">
                    {{ t('body_temp') }}: {{ ( capture.bodyTemp / 1000.0 ).toFixed( 1 ) }}°C
                  </span>
                </el-col>
                <el-col :span="5">
                  <span style="font-size:16px;color:white;">
                    {{ t('fever') }}: {{ capture.alarmLevel > 0 ? t('yes') : t('no') }}
                  </span>
                </el-col>
                <!-- <el-col :span="4">
                  <span style="font-size:16px;color:white;">
                    {{ t('helmet') }}: {{ capture.helmetStatus ? t('yes') : t('no') }}
                  </span>
                </el-col> -->
                <el-col :span="5">
                  <span style="font-size:16px;color:white;">
                    {{ t('mask') }}: {{ capture.maskStatus ? t('yes') : t('no') }}
                  </span>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger"
                             :icon="Delete"
                             @click="handleDeleteCapturesForRecordId(capture.recordId)">
                    {{ t('delete') }}
                  </el-button>
                </el-col>
              </el-row>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </template>
    </el-table-column>
    <el-table-column width="250">
      <template #header>
        <el-progress v-show="queryTimer"
                     :stroke-width="26"
                     :text-inside="true"
                     :percentage="deletedPercentage" />
        <el-tooltip placement="top-start"
                    effect="dark">
          <template #content>
            {{ t('close') + t('captures' ) }}
          </template>
          <el-button v-show="queryTimer===null"
                     :icon="CloseBold"
                     @click="handleCloseCaptures"
                     circle
                     size="mini"
                     style="float:right" />
        </el-tooltip>
        <el-tooltip placement="top-start"
                    effect="dark">
          <template #content>
            {{ t('delete') + t('captures' ) }}
          </template>
          <el-button v-show="queryTimer===null"
                     type="danger"
                     :icon="Delete"
                     @click="handleDeleteCapturesForFaceId"
                     circle
                     size="mini"
                     style="float:right;margin-right:10px;" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {
  ref,
  defineEmits,
  defineExpose,
  defineProps,
  onBeforeUnmount,
  reactive,
} from 'vue'
import {
  CloseBold,
  Edit,
  Delete,
  DeleteFilled,
  Filter,
  MoreFilled,
  TrendCharts,
  UploadFilled,
} from '@element-plus/icons'
import { formatTime } from '@/utils/index'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import http from '@/utils/network/http'
import { dealResponseCode } from '@/utils/functions'
import { MAX_DISPLAY_ENTRIES } from '@/constant/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const router = useRouter()

const table = ref()
let nowDate = new Date()
const queryTimer = ref(null)
const props = defineProps({
  // faceId: Number,
  initialQuery: Object,
})
let query = ref(props.initialQuery)

// const query = ref({
//   faceId: props.faceId,
//   begin: null,
//   end: null,
//   timeRange: [new Date(nowDate - 7 * 24 * 3600 * 1000), nowDate],
//   from: 0,
//   to: 9,
// })

const captures = ref([])
const totalCaptures = ref(0)

const totalToDelete = ref(0)
const deletedPercentage = ref(0)
const remainedToDelete = ref(88888)

onBeforeUnmount(() => {
  stopQueryDeleteCapturesStatus()
})

const stopQueryDeleteCapturesStatus = () => {
  clearInterval(queryTimer.value)
  queryTimer.value = null
  totalToDelete.value = 0
  deletedPercentage.value = 0
  remainedToDelete.value = 0
}

const queryDeleteCapturesStatus = () => {
  http.get('captures/faces/data/delprogress').then((response) => {
    if (totalToDelete.value == 0) {
      totalToDelete.value = response.data.remained
    }
    deletedPercentage.value = response.data.progress
    remainedToDelete.value = response.data.remained
    if (response.data.progress === 100) {
      stopQueryDeleteCapturesStatus()
      emit('on-delete-captures-success')
    }
  })
}

const startQueryDeleteCapturesStatus = () => {
  queryTimer.value = setInterval(queryDeleteCapturesStatus, 50)
}

const handleCurrentChange = (row) => {
  console.log('change')
  // query.value.faceId = row ? row.faceId : null
  // queryCaptures()
}
const handleCellClick = (row, column, cell, event) => {
  if (column.no !== 2 && column.no !== 5) {
    tableData.value.forEach((item) => {
      if (item == row) {
        item.selected = !item.selected
      } else {
        item.selected = false
      }
    })
    if (query.value.faceId == row.faceId) {
      table.value.setCurrentRow()
      query.value.faceId = null
    } else {
      query.value.faceId = row ? row.faceId : null
    }
    emit('on-select', query.value.faceId)
    // queryCaptures()
  }
}
const handleRowClick = (row, column, event) => {
  console.log('row-click')
  // tableData.value.forEach((item) => {
  //   if (item == row) {
  //     item.selected = !item.selected
  //   } else {
  //     item.selected = false
  //   }
  // })
  // if (query.value.faceId == row.faceId) {
  //   console.log('reset')
  //   table.value.setCurrentRow()
  //   query.value.faceId = null
  // } else {
  //   console.log('set')
  //   query.value.faceId = row ? row.faceId : null
  // }
  // queryCaptures()
}
const selectRow = (row) => {
  console.log('select:', row)
  // row.selected = !row.selected
}

const changeTimeRange = (timeRange) => {
  if (timeRange) {
    query.value.begin = Math.trunc(new Date(timeRange[0]).getTime() / 1000)
    query.value.end = Math.trunc(new Date(timeRange[1]).getTime() / 1000)
  } else {
    query.value.begin = null
    query.value.end = null
  }
}

// const handleFilterCaptures = () => {
//   queryCaptures()
// }

const handleCloseCaptures = () => {
  emit('on-close-captures')
}

const handleDeleteCapturesForRecordId = (recordId) => {
  ElMessageBox.confirm(t('delete_selected_entries'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning',
  })
    .then(() => {
      emit('on-delete-captures', {
        recordId: recordId,
      })
    })
    .catch(() => {
      ElMessage.info(t('cancel'))
    })
  console.log(recordId)
}

const handleDeleteCapturesForFaceId = () => {
  ElMessageBox.confirm(t('delete_selected_entries'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning',
  })
    .then(() => {
      emit('on-delete-captures', { faceId: query.value.faceId })
    })
    .catch(() => {
      ElMessage.info(t('cancel'))
    })
}

var tableData = ref([])
let total = ref(0)
const setData = (resp, startIndex) => {
  total.value = resp.total
  tableData.value = resp.infos ? resp.infos : []
  tableData.value.forEach((data, index) => {
    data.id = startIndex + index + 1
    data.selected = data.faceId === query.value.faceId
  })
  while (
    tableData.value.length > 0 &&
    tableData.value.length < MAX_DISPLAY_ENTRIES
  ) {
    tableData.value.push({})
  }
}

// const setFaceId = (faceId) => {
//   query.value.faceId = faceId
//   console.log('setFaceId:', faceId)
// }

// let faceId = ref(null)
const setCaptures = (response) => {
  captures.value = response.data.infos ? response.data.infos : []
  totalCaptures.value = response.data.total ? response.data.total : 0
}
defineExpose({
  setData,
  tableData,
  totalToDelete,
  setCaptures,
  startQueryDeleteCapturesStatus,
})
const emit = defineEmits([
  'on-select',
  'on-close-captures',
  'on-delete-captures',
  'on-delete-captures-success',
])

const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 5) {
    if (rowIndex === 0) {
      return {
        rowspan: MAX_DISPLAY_ENTRIES,
        colspan: 2,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}

const rowClassName = ({ row, rowIndex }) => {
  if (!row.id) {
    return 'hidden-row'
  }
  return ''
}

// const queryCaptures = () => {
//   let query1 = Object.assign({ begin: null, end: null }, query.value)
//   if (query1.timeRange) {
//     query1.begin = Math.trunc(new Date(query1.timeRange[0]).getTime() / 1000)
//     query1.end = Math.trunc(new Date(query1.timeRange[1]).getTime() / 1000)
//     delete query1.timeRange
//   } else {
//     delete query1.begin
//     delete query1.end
//   }
//   if (!query1.faceId) {
//     delete query1.faceId
//   }
//   http.get('captures/faces/infos', query1).then((response) => {
//     dealResponseCode(
//       response,
//       function successHandler() {
//         captures.value = response.data.infos ? response.data.infos : []
//       },
//       function failHandler() {
//         ElMessage.error(response.msg)
//       }
//     )
//   })
// }

// queryCaptures()
// const shotcuts = ref([
//   {
//     text: t('last_week'),
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
//       return [start, end]
//     },
//   },
//   {
//     text: t('last_month'),
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
//       return [start, end]
//     },
//   },
//   {
//     text: t('last_3_months'),
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
//       return [start, end]
//     },
//   },
// ])
</script>

<style lang="scss">
.el-timeline-item__timestamp.is-top {
  position: absolute;
  left: -200px;
  top: -3px;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.el-timeline {
  padding-left: 200px;
}

.el-timeline-item__node {
  border: 2px solid hsla(0, 0%, 90%, 0.7);
  background-clip: content-box;
  background: rgba(78, 151, 255, 1);
}

.el-timeline-item__node--normal {
  left: -4px;
  width: 18px;
  height: 18px;
}

.el-table .v-align-t {
  vertical-align: top;
}
.el-table .hidden-row {
  visibility: hidden;
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
.testtable .el-table__body tr.current-row > td {
  background: transparent !important;
  color: white;
}
.testtable {
  .el-table__body tr:hover > td {
    background-color: gray !important;
    color: white;
  }
}

.testtable .el-table__body tr:hover > td:nth-child(6) {
  background-color: transparent !important;
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
