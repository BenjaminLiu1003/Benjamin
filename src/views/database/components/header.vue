<template>
  <div id="emp__header">
    <el-form :inline="true"
             :model="query">
      <el-form-item :label="t('name')"
                    class="query-form-item">
        <el-input v-model="query.name"
                  :placeholder="t('input_name')"
                  clearable />
      </el-form-item>
      <el-form-item :label="t('number')"
                    class="query-form-item">
        <el-input v-model="query.number"
                  :placeholder="t('input_number')"
                  clearable />
      </el-form-item>
      <el-form-item v-show="query.withCaptures"
                    :label="t('time_range')"
                    class="query-form-item">
        <el-date-picker v-model="query.timeRange"
                        type="datetimerange"
                        :range-separator="t('to')"
                        :start-placeholder="t('start_time')"
                        :end-placeholder="t('end_time')"
                        :shortcuts="shortcuts"
                        @change="changeTimeRange" />
      </el-form-item>
      <el-form-item v-show="query.withCaptures"
                    :label="t('index_range')"
                    class="query-form-item">
        <el-input-number v-model="query.capturesFrom"
                         :min="minCapturesFrom"
                         controls-position="right"
                         style="width:8rem" />
      </el-form-item>
      <el-form-item v-show="query.withCaptures"
                    :label="t('to')"
                    class="query-form-item">
        <el-input-number v-model="query.capturesTo"
                         :min="minCapturesTo"
                         :max="maxCapturesTo"
                         controls-position="right"
                         style="width:8rem;" />
      </el-form-item>
      <el-form-item v-show="query.withCaptures"
                    :label="t('fever')"
                    class="query-form-item">
        <el-select v-model="query.alarm"
                   :placeholder="t('select_alarm_level')"
                   clearable
                   style="width:110px">
          <el-option :label="t('yes')"
                     value="1" />
          <el-option :label="t('no')"
                     value="0" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item v-show="query.withCaptures"
                    :label="t('from')"
                    class="query-form-item">
        <el-input-number v-model="query.from"
                         :min="0"
                         controls-position="right"
                         style="width:6rem" />
      </el-form-item>
      <el-form-item v-show="query.withCaptures"
                    :label="t('to')"
                    class="query-form-item">
        <el-input-number v-model="query.to"
                         :min="0"
                         controls-position="right"
                         style="width:6rem" />
      </el-form-item> -->
      <!-- <el-form-item v-show="query.withCaptures"
                    :label="t('valid_time_range')"
                    prop="timeRange"
                    class="query-form-item">
        <el-date-picker v-model="query.timeRange"
                        type="datetimerange"
                        :range-separator="t('to')"
                        :start-placeholder="t('start_time')"
                        :end-placeholder="t('end_time')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="handleShowCapturesOptions"
                   :icon="Share" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary"
                   @click="handleSearch"
                   :icon="Search">
          {{ t('search') }}
        </el-button>
      </el-form-item>
      <!-- <el-form-item v-show="query.withCaptures"
                    class="query-form-item">
        <el-button type="danger"
                   :disabled="!query.timeRange"
                   @click="handleDeleteCapturesForTimeRange"
                   :icon="Delete">
          {{ t('delete')}}
        </el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent, defineEmits, defineExpose, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Search, Share } from '@element-plus/icons'
import { computed, watch } from '@vue/runtime-core'
import { MAX_DISPLAY_ENTRIES } from '@/constant/index'

const { t } = useI18n()
const route = useRoute()
const emit = defineEmits(['on-search', 'on-delete-captures'])

const query = ref({
  name: undefined,
  number: undefined,
  facesFrom: 0,
  facesTo: MAX_DISPLAY_ENTRIES - 1,
  withCaptures: false,
  faceId: null,
  begin: null,
  end: null,
  capturesFrom: 1,
  capturesTo: MAX_DISPLAY_ENTRIES,
  alarm: null,
  timeRange: null,
})

const shortcuts = ref([
  {
    text: t('last_week'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: t('last_month'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: t('last_3_months'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
])

const changeTimeRange = (timeRange) => {
  if (timeRange) {
    query.value.begin = Math.trunc(new Date(timeRange[0]).getTime() / 1000)
    query.value.end = Math.trunc(new Date(timeRange[1]).getTime() / 1000)
  } else {
    query.value.begin = null
    query.value.end = null
  }
}

const handleSearch = () => {
  if (
    ((route.query.name || query.value.name) &&
      route.query.name !== query.value.name) ||
    ((route.query.number || query.value.number) &&
      route.query.number !== query.value.number)
  ) {
    query.value.faceId = null
    query.value.facesFrom = 0
    query.value.facesTo = MAX_DISPLAY_ENTRIES - 1
    emit('on-search', true)
  } else {
    emit('on-search', false)
  }
}

const handleDeleteCapturesForTimeRange = () => {
  ElMessageBox.confirm(t('delete_selected_entries'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning',
  })
    .then(() => {
      emit('on-delete-captures', {
        begin: query.value.begin,
        end: query.value.end,
      })
    })
    .catch(() => {
      ElMessage.info(t('cancel'))
    })
}

const showCapturesOptions = () => {
  query.value.withCaptures = true
  // emit('show-captures', withCaptures.value)
}
const hideCapturesOptions = () => {
  query.value.withCaptures = false
}

const updateQuery = (newQuery) => {
  query.value.name = newQuery.name
  if (newQuery.from && newQuery.to) {
    query.value.facesFrom =
      Math.floor(newQuery.from / MAX_DISPLAY_ENTRIES) * MAX_DISPLAY_ENTRIES
    query.value.facesTo = query.value.facesFrom + MAX_DISPLAY_ENTRIES - 1
  } else {
    query.value.facesFrom = 0
    query.value.facesTo = MAX_DISPLAY_ENTRIES - 1
  }
}

const minCapturesFrom = computed(() => {
  return 1 //Math.max(1, query.value.capturesTo - 50 + 1)
})
// const maxCapturesFrom = computed(() => {
//   return query.value.capturesTo
// })
const minCapturesTo = computed(() => {
  return query.value.capturesFrom
})
const maxCapturesTo = computed(() => {
  return query.value.capturesFrom + 50 - 1
})

defineExpose({
  query,
  showCapturesOptions,
  hideCapturesOptions,
  updateQuery,
})
</script>

<style lang="scss">
.query-form-item .el-form-item__label {
  color: white;
  font-size: 1em;
  font-weight: bold;
}
#emp__header {
  width: 100%;
  // margin-top: 20px;
  .emp__header {
    // width: 1200px;
    // margin: 0 auto;
    // height: 70px;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
  }
  .search-input {
    width: 16em;
    height: 2.5rem;
    border-radius: 3px;
    text-indent: 1em;
    border: 1px solid #4b8df8;
    color: black;
    font-size: 1rem;
  }
}
.btn {
  display: inline-block;
}
.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
</style>
