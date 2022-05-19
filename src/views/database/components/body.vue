<template>
  <el-table class="faces-table"
            ref="table"
            :data="tableData"
            @row-click="handleRowClick"
            @row-dblclick="handleRowDblClick"
            @selection-change="handleSelectionChange"
            @cell-mouse-enter="hoverIn"
            @cell-mouse-leave="hoverOut"
            max-height='850px'
            :header-cell-style="{background:'transparent',color:'white','font-weight':'bold', 'font-size': '20px'}"
            :empty-text="t('no_data')">
    <el-table-column type="selection"
                     width="55" />
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
                     width="160"
                     show-overflow-tooltip />
    <el-table-column property="number"
                     :label="t('number')"
                     width="300" />
    <el-table-column :label="t('gender')"
                     width="100">
      <template #default="scope">
        {{ t(scope.row.gender) }}
      </template>
    </el-table-column>
    <el-table-column property="age"
                     :label="t('age')"
                     width="100" />
    <el-table-column property="department"
                     :label="t('department')"
                     width="160" />
    <el-table-column property="position"
                     :label="t('position')"
                     width="160" />
    <el-table-column :label="t('register_time')">
      <template #default="scope">
        {{ formatTime(scope.row.registerTime * 1000, 'yyyy-MM-dd') + " " + formatTime(scope.row.registerTime * 1000,'HH:mm:ss') }}
      </template>
    </el-table-column>
    <!-- <el-table-column width='100'>
      <template #header>
        
      </template>
    </el-table-column> -->
    <el-table-column align="center"
                     width="250">
      <template #header>
        <el-progress v-if="queryTimer!==null"
                     :text-inside="true"
                     :stroke-width="26"
                     :percentage="deletedPercentage" />
        <el-button-group v-else>
          <el-button type="primary"
                     size="mini"
                     :icon="UploadFilled"
                     @click="handleAdd"
                     round>
            {{ t( 'add' ) }}
          </el-button>
          <el-button type="danger"
                     size="mini"
                     :icon="Delete"
                     @click="handleMultiDelete"
                     :disabled="selectedRows.length==0"
                     round>
            {{ t('delete') }}
          </el-button>
          <el-button type="danger"
                     size="mini"
                     :icon="DeleteFilled"
                     @click="handleDeleteAll"
                     :disabled="total==0"
                     round>
            {{ t('delete_all') }}
          </el-button>
        </el-button-group>
      </template>
      <template #default="scope">
        <el-tooltip placement="top-start"
                    effect="dark">
          <template #content>
            {{ t('captures' ) }}
          </template>
          <el-button type="info"
                     v-show="queryTimer==null&&showOperationsBtn&&scope.row.faceId==currentFaceId"
                     :icon="TrendCharts"
                     @click.stop="handleShowCaptures(scope.$index, scope.row)"
                     circle />
        </el-tooltip>
        <el-tooltip placement="top-start"
                    effect="dark">
          <template #content>{{ t('edit') }}
          </template>
          <el-button type="primary"
                     v-show="queryTimer==null&&showOperationsBtn==true&&scope.row.faceId==currentFaceId"
                     :icon="Edit"
                     @click.stop="handleEdit(scope.$index, scope.row)"
                     circle />
        </el-tooltip>
        <el-tooltip placement="top-start"
                    effect="dark">
          <template #content> {{ t('delete')}}</template>
          <el-button type="danger"
                     v-show="queryTimer==null&&showOperationsBtn==true&&scope.row.faceId==currentFaceId"
                     :icon="Delete"
                     @click.stop="handleDelete(scope.$index, scope.row)"
                     circle />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineExpose, onBeforeUnmount } from 'vue'
import {
  Edit,
  Delete,
  DeleteFilled,
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
const emit = defineEmits([
  'on-edit',
  'on-add',
  'on-delete-success',
  'on-show-captures',
])
let queryTimer = ref(null)
let totalToDelete = 0
let deletedPercentage = ref(0)

const table = ref()
let currentFaceId = ref(0)
let selectedRows = ref([])

const stopQueryDeleteStatus = () => {
  clearInterval(queryTimer.value)
  queryTimer.value = null
  deletedPercentage.value = 0
}

onBeforeUnmount(() => {
  stopQueryDeleteStatus()
})

const startQueryDeleteStatus = () => {
  http.get('faces/data/delprogress').then((response) => {
    deletedPercentage.value = response.data.progress
    if (response.data.progress === 100) {
      stopQueryDeleteStatus()
      emit('on-delete-success')
    }
  })
}

const handleEdit = (index, row) => {
  emit('on-edit', row)
}

const handleShowCaptures = (index, row) => {
  emit('on-show-captures', row.faceId)
}

const handleRowClick = (row, column, event) => {
  let index = selectedRows.value.findIndex((item) => {
    return item.faceId == row.faceId
  })
  table.value.toggleRowSelection(row, index == -1)
}
const handleRowDblClick = (row, column, event) => {
  emit('on-edit', row)
}
const handleSelectionChange = (selection) => {
  selectedRows.value = Object.assign([], selection)
  console.log(selectedRows.value.length)
}

const handleDeleteAll = () => {
  ElMessageBox.confirm(t('delete_all'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning',
  })
    .then(() => {
      http.delete('faces/data').then((response) => {
        dealResponseCode(
          response,
          function successHandler() {
            ElMessage.success(t('delete') + t('success'))
            totalToDelete = total.value
            queryTimer.value = setInterval(startQueryDeleteStatus, 50)
          },
          function failHandler() {
            ElMessage.error(response.msg)
          }
        )
      })
    })
    .catch(() => {
      ElMessage.info(t('cancel'))
    })
}
const handleDelete = (index, row) => {
  ElMessageBox.confirm(t('delete_selected_entries'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning',
  })
    .then(() => {
      http.delete('faces/data/' + row.faceId).then((response) => {
        dealResponseCode(
          response,
          function successHandler() {
            ElMessage.success(t('delete') + t('success'))
            emit('on-delete-success')
          },
          function failHandler() {
            ElMessage.error(t('delete') + t('failure'))
          }
        )
      })
    })
    .catch(() => {
      ElMessage.info(t('cancel'))
    })
}
const handleAdd = () => {
  emit('on-add')
}
const handleMultiDelete = () => {
  console.log('multi_delete:', selectedRows)
  let faceIds = []
  selectedRows.value.forEach((row) => {
    faceIds.push(row.faceId)
  })
  ElMessageBox.confirm(t('delete_selected_entries'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning',
  })
    .then(() => {
      http.delete('faces/data', faceIds).then((response) => {
        dealResponseCode(
          response,
          function successHandler() {
            ElMessage.success(t('delete') + t('success'))
            totalToDelete = faceIds.length
            queryTimer.value = setInterval(startQueryDeleteStatus, 50)
          },
          function failHandler() {
            ElMessage.error(response.msg)
          }
        )
      })
    })
    .catch(() => {
      ElMessage.info(t('cancel'))
    })
}
let showOperationsBtn: any = ref({})
showOperationsBtn.value = false
const hoverIn = (row, column, cell, event) => {
  // console.log(cell)
  showOperationsBtn.value = true
  currentFaceId.value = row.faceId
  // console.log(currentRow)
  // console.log(row)
  // console.log(column)
  // console.log(cell)
  // console.log(event)
  // row.showIcon = true
  // row.id += 1
}
const hoverOut = (row, column, cell, event) => {
  // row.id -= 1
  // // console.log(row)
  showOperationsBtn.value = false
  // row.showIcon = false
  // row.age += 1
}

// watch(ref(showOperationsBtn), (newValue, oldValue) => {
//   console.log(newValue)
//   console.log(oldValue)
// })

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
</script>

<style>
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

.faces-table .with_captures {
  width: 40rem;
}

.faces-table th {
  border: none;
}
.faces-table td,
.faces-table th.is-leaf {
  border: none;
}
/*表格最外边框*/
.faces-table .el-table--border,
.el-table--group {
  border: none;
}
/*头部边框*/
.faces-table thead tr th.is-leaf {
  border: 0px solid #ebeef5;
  border-right: none;
}
.faces-table thead tr th:nth-last-of-type(2) {
  border-right: 0px solid #ebeef5;
}
/*表格最外层边框-底部边框*/
.faces-table .el-table--border::after,
.faces-table .el-table--group::after {
  width: 0;
}
.faces-table::before {
  width: 0;
}
/* .faces-table .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
} */
/* .faces-table .el-table__header tr th {
  background: #fff;
  color: #333333;
  padding: 3px;
  font-weight: 550;
  height: 36px;
  border: 0px;
  font-size: 15px;
} */
.faces-table .el-table__row > td {
  border: none;
}
.faces-table .el-table::before {
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
/*修改table 的背景颜色和文字颜色*/
/* .el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: red;
  background-color: black;
  color: white;
} */
.faces-table .el-table--striped .el-table__body tr.el-table__row--striped td {
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
