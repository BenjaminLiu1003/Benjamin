<template>
  <div class="faces-list-container">
    <list-header ref="listHeader"
                 @onSearch="handleSearch"
                 @onDeleteCaptures="deleteCaptures"
                 @showCaptures="showCaptures" />
    <list-body ref="listBody"
               v-if="!capturesVisibility"
               @onEdit="handleEdit"
               @onAdd="handleAdd"
               @onDeleteSuccess="handleDeleteSuccess"
               @onShowCaptures="handleShowCaptures" />
    <captures-body ref="capturesBody"
                   v-else
                   :initialQuery="listHeader.query"
                   @onSelect="handleSelectCaptures"
                   @onEdit="handleEdit"
                   @onAdd="handleAdd"
                   @onCloseCaptures="handleCloseCaptures"
                   @onDeleteCapturesSuccess="handleDeleteCapturesSuccess"
                   @onDeleteCaptures="deleteCaptures" />
    <list-footer ref="listFooter"
                 @onChangePage="handleChangePage"
                 style="position: absolute; bottom:30px;left:0;right:0;" />
    <edit-form ref="editForm"
               @onRefresh="refreshData" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import ListHeader from './components/header.vue'
import ListBody from './components/body.vue'
import CapturesBody from './components/capturesbody.vue'
import ListFooter from './components/footer.vue'
import EditForm from './components/form.vue'
import http from '@/utils/network/http'
import { MAX_DISPLAY_ENTRIES } from '@/constant/index'
import { dealResponseCode } from '@/utils/functions'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const editForm = ref(null)
const listHeader = ref(null)
const listFooter = ref(null)
const listBody = ref(null)
const capturesBody = ref(null)
const capturesVisibility = ref(false)

let query = {
  from: null,
  to: null,
  name: null,
  number: null,
}

const handleSearch = (isNewRoute) => {
  if (isNewRoute) {
    let url = '/database?'
    url += listHeader.value.query.name
      ? 'name=' + listHeader.value.query.name + '&'
      : ''
    url += listHeader.value.query.number
      ? 'number=' + listHeader.value.query.number + '&'
      : ''
    url +=
      'from=' +
      listHeader.value.query.facesFrom +
      '&to=' +
      listHeader.value.query.facesTo
    router.push(url)
  } else if (listHeader.value.query.withCaptures) {
    console.log('additional query captures...')
    queryCaptures()
  }
}

// let faceId = ref(null)
const handleShowCaptures = (id) => {
  // faceId.value = id
  listHeader.value.query.faceId = id
  listHeader.value.showCapturesOptions()
  capturesVisibility.value = true
  refreshData()
}

const handleSelectCaptures = (id) => {
  listHeader.value.query.faceId = id
  queryCaptures()
}

const handleCloseCaptures = () => {
  capturesVisibility.value = false
  listHeader.value.hideCapturesOptions()
  refreshData()
}

const handleEdit = (row) => {
  editForm.value.edit(row)
}
const handleAdd = () => {
  editForm.value.add()
}

const handleDeleteSuccess = () => {
  refreshData()
}

const handleChangePage = (page) => {
  const from = (page - 1) * MAX_DISPLAY_ENTRIES
  let url = '/database?'
  if (listHeader.value.query.name) {
    url += 'name=' + listHeader.value.query.name + '&'
  }
  if (listHeader.value.query.number) {
    url += 'number=' + listHeader.value.query.number + '&'
  }
  url += 'from=' + from + '&to=' + (from + MAX_DISPLAY_ENTRIES - 1)
  router.push(url)
  // query.from = (page - 1) * MAX_FACES_PER_PAGE
  // query.to = query.from + MAX_FACES_PER_PAGE - 1
  // console.log('Change to: ', query)
  // router.push({ path: '/database', query: query })
}

const handleDeleteCapturesSuccess = () => {
  ElMessage.success(t('delete') + t('success'))
  queryCaptures()
}

const performDeleteCaptures = (query) => {
  http.delete1('captures/faces/data', query).then((response) => {
    dealResponseCode(
      response,
      function successHandler() {
        // capturesBody.value.startQueryDeleteCapturesStatus()
        handleDeleteCapturesSuccess()
      },
      function failHandler() {
        ElMessage.error(response.msg)
      }
    )
  })
}

const deleteCaptures = (query) => {
  if (!query.faceId) {
    delete query.faceId
  }
  if (listHeader.value.query.begin && listHeader.value.query.end) {
    query = Object.assign(
      {
        begin: listHeader.value.query.begin,
        end: listHeader.value.query.end,
      },
      query
    )
  }
  if (Object.keys(query).length === 0) {
    ElMessageBox.confirm(t('delete_first_1000_entries'), t('warning'), {
      confirmButtonText: t('confirm'),
      cancelButtonText: t('cancel'),
      type: 'warning',
    })
      .then(() => {
        performDeleteCaptures(query)
      })
      .catch(() => {
        ElMessage.info(t('cancel'))
      })
    return
  } else {
    performDeleteCaptures(query)
  }

  // http.get('captures/faces/infos', query).then((response) => {
  //   dealResponseCode(
  //     response,
  //     function successHandler() {
  //       capturesBody.value.totalToDelete = response.data.total
  //       if (response.data.total > 0) {
  //         http.delete1('captures/faces/data', query).then((response) => {
  //           dealResponseCode(
  //             response,
  //             function successHandler() {
  //               capturesBody.value.startQueryDeleteCapturesStatus()
  //             },
  //             function failHandler() {
  //               ElMessage.error(response.msg)
  //             }
  //           )
  //         })
  //       } else {
  //         ElMessage.success(t('no_data'))
  //       }
  //     },
  //     function failHandler() {
  //       ElMessage.error(response.msg)
  //     }
  //   )
  // })
}

const queryCaptures = () => {
  let query = Object.assign({}, listHeader.value.query)
  query.from = query.capturesFrom - 1
  query.to = query.capturesTo - 1

  delete query.facesFrom
  delete query.facesTo
  delete query.withCaptures
  delete query.capturesFrom
  delete query.capturesTo
  delete query.timeRange

  if (!query.name) {
    delete query.name
  }
  if (!query.number) {
    delete query.number
  }
  if (!query.alarm) {
    delete query.alarm
  }
  if (!query.begin || !query.end) {
    delete query.begin
    delete query.end
  }
  if (!query.faceId) {
    delete query.faceId
  }
  http.get('captures/faces/infos', query).then((response) => {
    dealResponseCode(
      response,
      function successHandler() {
        capturesBody.value.setCaptures(response)
      },
      function failHandler() {
        ElMessage.error(response.msg)
      }
    )
  })
}

const refreshData = () => {
  let url = 'faces/infos'
  let query = Object.assign({}, listHeader.value.query)
  query.from = query.facesFrom
  query.to = query.facesTo

  if (!query.name) {
    delete query.name
  }
  if (!query.number) {
    delete query.number
  }
  delete query.begin
  delete query.end
  delete query.timeRange
  delete query.withCaptures
  delete query.capturesFrom
  delete query.capturesTo
  delete query.facesFrom
  delete query.facesTo

  http.get(url, query).then((response) => {
    listBody.value
      ? listBody.value.setData(response.data, query.from)
      : capturesBody.value.setData(response.data, query.from)
    if (capturesBody.value) {
      queryCaptures()
    }
    listFooter.value.total = parseInt(response.data.total)
    listFooter.value.currentPage = query.from
      ? Math.ceil((query.from + 1) / MAX_DISPLAY_ENTRIES)
      : 1
  })
  // if (
  //   (Reflect.has(query, 'from') && Reflect.has(query, 'to')) ||
  //   Reflect.has(query, 'name') ||
  //   Reflect.has(query, 'number')
  // ) {
  //   let url = 'faces/infos'
  //   if (query.from && query.to) {
  //     query.from =
  //       Math.floor(query.from / MAX_FACES_PER_PAGE) * MAX_FACES_PER_PAGE
  //     query.to = query.from + MAX_FACES_PER_PAGE - 1
  //   }
  //   http.get(url, query).then((response) => {
  //     listBody.value
  //       ? listBody.value.setData(response.data, query.from)
  //       : capturesBody.value.setData(response.data, query.from)
  //     listFooter.value.total = parseInt(response.data.total)
  //     listFooter.value.currentPage = query.from
  //       ? Math.ceil((query.from + 1) / MAX_FACES_PER_PAGE)
  //       : 1
  //     // listHeader.value.query = {
  //     //   name: query.name ? query.name : '',
  //     //   number: query.number ? query.number : '',
  //     // }
  //   })
  // } else {
  //   http
  //     .get('faces/infos', { from: 0, to: MAX_FACES_PER_PAGE - 1 })
  //     .then((response) => {
  //       listBody.value
  //         ? listBody.value.setData(response.data, 0)
  //         : capturesBody.value.setData(response.data, 0)
  //       listFooter.value.total = parseInt(response.data.total)
  //       listFooter.value.currentPage = 1
  //     })
  // }
}

watch(
  () => router,
  (newValue, oldValue) => {
    // query = newValue.currentRoute.value.query
    setTimeout(() => {
      listHeader.value.updateQuery(newValue.currentRoute.value.query)
      console.log('watch router:', Object.keys(query).length == 0)
      refreshData()
    }, 500)
  },
  { immediate: true }
)

onBeforeRouteUpdate((to) => {
  console.log('route to: ', to)
  listHeader.value.updateQuery(to.query)
  // query = to.query
  refreshData()
})
</script>

<style lang="scss" scoped>
.faces-list-container {
  // position: relative;
  width: 100%;
  padding-top: 20px;
  // background-color: red;
}
</style>