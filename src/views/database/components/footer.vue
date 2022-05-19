<template>
  <!-- <el-config-provider :locale="locale"> -->
  <el-pagination background
                 layout="prev, pager, next, jumper, ->, total, sizes"
                 :total="total"
                 :page-sizes="[MAX_FACES_PER_PAGE]"
                 :page-size="MAX_FACES_PER_PAGE"
                 :current-page="currentPage"
                 @update:current-page="handleChangePage"
                 @update:page-size="handleChangePageSize">
  </el-pagination>
  <!-- </el-config-provider> -->
</template>

<script setup lang="ts">
import { defineEmits, defineExpose, ref, watch } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { MAX_FACES_PER_PAGE } from '@/constant/index'
let currentPage = ref(1)
let total = ref(0)
const emit = defineEmits(['on-change-page'])
const locale = zhCn
defineExpose({
  currentPage,
  total,
})
watch(currentPage, (newValue, oldValue) => {
  console.log('currentPage:', currentPage)
})
const handleChangePage = (page) => {
  emit('on-change-page', page)
}
const handleChangePageSize = (pageSize) => {
  console.log(pageSize)
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}
</style>
