<template>
    <el-drawer
        v-model="visible"
        title="All Entries"
        direction="rtl"
        size="33%">
        <el-table :data="data">
            <el-table-column property="first.pg" label="Program" width="150" />
            <el-table-column property="first.host" label="Host" />
            <el-table-column property="first.pid" label="Pid" /> 
        </el-table>
    </el-drawer>
</template>

<script lang="ts" setup>
import { defineExpose, ref, watch } from 'vue'

let visible = ref(false)
let data = ref([])

watch(data, (newValue, oldValue) => {
  if (data.value.length > 0) {
    visible.value = true
    console.log("changed")
  }
})

const show = (entries) => {
    data.value = Object.assign({}, entries)
    console.log("entries:", entries)
    console.log("data:", data.value)
}

defineExpose({
    show
})
</script>
