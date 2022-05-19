<template>
  <div>
    <el-row :gutter="10" v-for="row in 8" :key="row" style="margin-top:6px">
      <el-col :span="3" v-for="col in 8" :key="col">
        <el-container 
            v-if="(row - 1) * 8 + col - 1 < entries.length" 
            class="thumbnail-box"
            style="background-color:white"
            @click="showDrawer">
           <el-header height="36px">
              <el-tag type="success">
                  {{ entries[(row - 1) * 8 + col - 1].first.pg }}
              </el-tag>
              <el-tag type="info" style="margin-left: 6px">
                  {{ entries[(row - 1) * 8 + col - 1].first.host }}
              </el-tag>
           </el-header>
           <el-main>
            <time class="time">
              {{ entries[(row - 1) * 8 + col - 1].second.startTime }}
            </time>
            <el-popover placement="top-start" title="Orders" trigger="hover">
                <template #reference>
                    <el-badge :value="entries[(row - 1) * 8 + col - 1].second.orders" :max="10000000" class="item" type="primary"/>
                </template>
            </el-popover>
            <el-popover placement="top-start" title="Trades" trigger="hover">
                <template #reference>
                    <el-badge :value="entries[(row - 1) * 8 + col - 1].second.trades" :max="10000000" class="item" type="primary"/>
                </template>
            </el-popover>
            <el-popover placement="top-start" title="Fails" trigger="hover">
                <template #reference>
                    <el-badge :value="entries[(row - 1) * 8 + col - 1].second.fails" :max="10000000" class="item" type="danger"/>
                </template>
            </el-popover>
            <!-- <el-badge :value="entries[(row - 1) * 8 + col - 1].second.orders" class="item">
              <el-button bg text>orders</el-button>
            </el-badge>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.trades" class="item">
              <el-button bg text>trades</el-button>
            </el-badge>
            <el-badge :value="entries[(row - 1) * 8 + col - 1].second.fails" class="item">
              <el-button bg text>fails</el-button>
            </el-badge> -->
           </el-main>
        </el-container>
        <el-container v-else class="thumbnail-box empty">
        </el-container>
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
  </div>
  <el-drawer
        v-model="visible"
        title="All Entries"
        direction="rtl"
        size="60%">
        <el-table :data="entries"
            :row-class-name="tableRowClassName">
            <!-- <el-table-column v-for="key in entries_keys" :key="key" :property="key" :label="key" width="150" /> -->
            <el-table-column property="first.host" label="Host" width="150"/>
            <el-table-column property="first.pg" label="Program" width="150" />
            <el-table-column property="first.pid" label="Pid" />
            <el-table-column property="second.name" label="Name" width="150" />
            <el-table-column property="second.orders" label="Orders" />
            <el-table-column property="second.trades" label="Trades" />
            <el-table-column property="second.fails" label="Fails" />
            <el-table-column property="second.startTime" label="Since" width="150"/>
            <el-table-column property="second.currGMV" label="Curr GMV" />
            <el-table-column property="second.maxGMV" label="Max GMV" />
            <el-table-column property="second.symbols" label="Symbols" />
            <el-table-column property="second.engaged" label="engaged" />
        </el-table>
    </el-drawer>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'
// import EntryDrawer from './components/entrydrawer.vue'
import http from '@/utils/network/http'

// const currentDate = ref(new Date())
// let entry_drawer = ref(null)
let visible = ref(false)
let queryTimer = ref(null)
let query = {
  from: null,
  to: null,
  name: null,
  number: null,
}

const entries = ref([])
let entries_keys = ref([])

onBeforeUnmount(() => {
  stopQueryStatus()
})

const tableRowClassName = ({ row, rowIndex }) => {
    console.log("row....", row.second.fails, row.second.fails > 300)
  if (row.second.fails > 300) {
    return 'error-row'
  } else if (row.second.since == '') {
    return 'warning-row'
  }
  return ''
}

const startQueryStatus = () => {
    console.log("query...")
//   let url = 'quoter/all'
  query.from = 0
  query.to = "jump trading"

  http.get('quoter/all', query, Object).then((response) => {
    entries.value = response.data.quoters
  })
}

const stopQueryStatus = () => {
  clearInterval(queryTimer.value)
  queryTimer.value = null
}

// const handleClickCard = (row, col) => {
//     console.log(row, col)
// }

const showDrawer = () => {
    console.log('clicked')
    visible.value = true
    // entry_drawer.value.show(entries)
}

queryTimer.value = setInterval(startQueryStatus, 10000)

startQueryStatus()
</script>

<style lang="scss">
.el-table .warning-row {
    // --el-table-tr-bg-color: var(--el-color-warning-light-9);
    background-color: red;
}

.el-table .error-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.thumbnail-box {
  height: 110px;
  margin-bottom: 10px;
  border-radius: 6px;
//   .el-card__body {
//       padding: 0;
//   }
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
  display:flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

</style>