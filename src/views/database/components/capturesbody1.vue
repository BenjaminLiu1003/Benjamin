<template>
  <el-table class="testtable"
            ref="table"
            :data="[{}]"
            :span-method="spanMethod"
            max-height='850px'
            :header-cell-style="{background:'transparent',color:'white','font-weight':'bold', 'font-size': '20px'}">
    <el-table-column :label="t('captures') + (totalCaptures > 0 ? '/' + t('total') + totalCaptures + t('entries') : '')"
                     className="v-align-t">
      <template #default>
        <el-scrollbar height="720px"
                      style="padding:1rem;">
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
        <el-tooltip placement="top-start"
                    effect="dark">
          <template #content>
            {{ t('delete') + t('captures' ) }}
          </template>
          <el-button type="danger"
                     :icon="Delete"
                     @click="handleDeleteCapturesForFaceId"
                     circle
                     size="mini"
                     style="float:right;" />
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
import { MAX_FACES_PER_PAGE } from '@/constant/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()

const table = ref()
const props = defineProps({
  initialQuery: Object,
})
let query = ref(props.initialQuery)

const captures = ref([])
const totalCaptures = ref(0)

const changeTimeRange = (timeRange) => {
  if (timeRange) {
    query.value.begin = Math.trunc(new Date(timeRange[0]).getTime() / 1000)
    query.value.end = Math.trunc(new Date(timeRange[1]).getTime() / 1000)
  } else {
    query.value.begin = null
    query.value.end = null
  }
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

const setCaptures = (response) => {
  captures.value = response.data.infos ? response.data.infos : []
  totalCaptures.value = response.data.total ? response.data.total : 0
}

defineExpose({
  setCaptures,
})

const emit = defineEmits(['on-delete-captures', 'on-delete-captures-success'])

const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    return {
      rowspan: 1,
      colspan: 2,
    }
  } else {
    return {
      rowspan: 0,
      colspan: 0,
    }
  }
}
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
    background-color: transparent !important;
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
