<template>
  <el-dialog v-model="visible"
             width="100%"
             :title="status?t(status):''"
             :before-close="handleClose">
    <el-card shadow="hover"
             v-for="(info, index) in formInline"
             :key="index"
             style="position:relative">
      <el-form :ref="setFormRef"
               label-position="top"
               :inline="true"
               :model="info"
               :rules="uploadFormRules">
        <el-form-item prop="photoUri">
          <el-upload :before-upload="function(file){return handleBeforeUpload(file,index)}"
                     :on-success="handleUploadSuccess"
                     class="avatar-uploader"
                     :show-file-list="false"
                     accept="image/jpg,image/jpeg,image/bmp,image/png"
                     :on-change="changeFile"
                     action="#">
            <el-image :src="info.photoUri"
                      fit="cover"
                      class="avatar">
              <template #error>
                <el-icon class="avatar-uploader-icon">
                  <plus />
                </el-icon>
              </template>
            </el-image>
          </el-upload>
        </el-form-item>
        <el-form-item :label="t('name')"
                      prop="name">
          <el-input v-model="info.name"
                    :placeholder="t('input_name')"
                    style="width: 12rem;"
                    clearable />
        </el-form-item>
        <el-form-item :label="t('number')"
                      prop="number">
          <el-input v-model="info.number"
                    :placeholder="t('input_number')"
                    style="width: 12rem;"
                    clearable />
        </el-form-item>
        <el-form-item :label="t('identity')"
                      prop="identity">
          <el-input v-model="info.identity"
                    :placeholder="t('input_identity')"
                    style="width: 12rem;"
                    clearable />
        </el-form-item>
        <el-form-item :label="t('department')"
                      prop="department">
          <el-input v-model="info.department"
                    :placeholder="t('input_department')"
                    style="width: 12rem;"
                    clearable />
        </el-form-item>
        <el-form-item :label="t('position')"
                      prop="position">
          <el-input v-model="info.position"
                    :placeholder="t('input_position')"
                    style="width: 12rem;"
                    clearable />
        </el-form-item>
        <el-form-item :label="t('gender')"
                      prop="gender">
          <el-select v-model="info.gender"
                     style="width: 6rem;">
            <el-option :label="t('female')"
                       value="female" />
            <el-option :label="t('male')"
                       value="male" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('age')"
                      prop="age">
          <el-input-number v-model="info.age"
                           :min="0"
                           :max="100"
                           controls-position="right"
                           style="width:6rem" />
        </el-form-item>
        <el-form-item :label="t('valid_time_range')"
                      prop="timeRange">
          <el-date-picker v-model="info.timeRange"
                          type="datetimerange"
                          :disabled="!info.permission"
                          :range-separator="t('to')"
                          :start-placeholder="t('start_time')"
                          :end-placeholder="t('end_time')"
                          @change="(val) => { changeTimeRange(val, info) }" />
        </el-form-item>
        <el-form-item :label="t('permission')"
                      prop="permission">
          <el-switch v-model="info.permission"
                     active-color="#13ce66" />
        </el-form-item>
      </el-form>
      <el-button v-if="status=='add'"
                 :icon="CloseBold"
                 @click.stop="handleDelete(index)"
                 plain
                 circle
                 :disabled="formInline.length==1"
                 size="mini"
                 style="position:absolute;right:10px;bottom:10px;" />
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-if="status=='add'"
                   type="primary"
                   @click="handleAdd"
                   :disabled="formInline.length>=3">
          {{ t('add') }}
        </el-button>
        <el-button type="primary"
                   @click="handleConfirm">
          {{t('upload')}}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
import http from '@/utils/network/http'
import { dealResponseCode } from '@/utils/functions'
import { ref, defineEmits, defineExpose, onBeforeUpdate, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  CloseBold,
  Delete,
  Picture as IconPicture,
  PictureFilled,
  Plus,
} from '@element-plus/icons'

const { t } = useI18n()
const emit = defineEmits(['on-refresh'])
let visible = ref(false)
let status = ref('')
let formInline = ref([])
const labelPosition = ref('top')
const fileList = ref([])

const uploadFormRules = ref({
  name: [
    {
      required: true,
      message: t('input_name'),
      trigger: 'blur',
    },
  ],
  number: [
    {
      required: true,
      message: t('input_number'),
      trigger: 'blur',
    },
  ],
  photoUri: [
    {
      required: true,
      message: t('select_image'),
    },
  ],
})
const handleClose = (done) => {
  status.value = ''
  setTimeout(() => {
    uploadForm.value.forEach((el) => {
      el.clearValidate()
    })
  }, 30)
  done()
}

const changeFile = (file, fileList) => {
  console.log(file.size)
  // const isLt3MB = file.size < 3 * 1024 * 1024
  // if (!isLt3MB) {
  //   ElMessage.error(t('file_size_exceeds') + '3MB')
  //   return
  // }
}

const edit = (row) => {
  status.value = 'edit'
  formInline.value = []
  formInline.value.push(Object.assign({}, row))
  formInline.value[0]['permission'] = formInline.value[0]['permission'] == 1
  formInline.value[0]['timeRange'] = [
    new Date(formInline.value[0]['beginTime'] * 1000),
    new Date(formInline.value[0]['endTime'] * 1000),
  ]
  formInline.value[0].originalUri = formInline.value[0].photoUri
  delete formInline.value[0].registerTime
}
const add = () => {
  status.value = 'add'
  var date1 = new Date()
  var date2 = new Date(date1)
  date2.setFullYear(date1.getFullYear() + 10)
  formInline.value = [
    {
      age: 0,
      gender: 'male',
      beginTime: 1000,
      endTime: 10000,
      timeRange: [date1, date2],
      permission: true,
    },
  ]
}

const handleAdd = () => {
  uploadForm.value = []
  var date1 = new Date()
  var date2 = new Date(date1)
  date2.setFullYear(date1.getFullYear() + 10)
  formInline.value.push({
    age: 0,
    gender: 'male',
    beginTime: 1000,
    endTime: 10000,
    timeRange: [date1, date2],
    permission: true,
  })
}

const handleDelete = (index) => {
  formInline.value.splice(index, 1)
  console.log('formInline:', formInline.value.length)
  uploadForm.value = []
}

const uploadForm = ref([])
const setFormRef = (el) => {
  if (el) uploadForm.value.push(el)
}
const handleConfirm = () => {
  let allValid = true
  uploadForm.value.forEach((el) => {
    el.validate((valid) => {
      if (!valid) {
        allValid = false
      }
    })
  })
  if (!allValid) {
    ElMessage.error(t('complete_necessary_message'))
    return
  }

  if (status.value == 'add') {
    let uploadData = new FormData()
    uploadData.append('total', formInline.value.length)
    formInline.value.forEach((info) => {
      let newInfo = Object.assign({}, info)
      newInfo.permission = newInfo.permission ? 1 : 0
      if (!newInfo.timeRange) {
        delete newInfo.beginTime
        delete newInfo.endTime
      } else {
        newInfo.beginTime = new Date(newInfo.timeRange[0]).getTime() / 1000
        newInfo.endTime = new Date(newInfo.timeRange[1]).getTime() / 1000
      }

      delete newInfo.photoUri
      delete newInfo.timeRange
      delete newInfo.image

      uploadData.append('image', info['image'])
      uploadData.append('info', JSON.stringify(newInfo))
    })
    http.postForm('faces/registry/batch', uploadData).then((response) => {
      dealResponseCode(
        response,
        function successHandler() {
          ElMessage.success(t(status.value) + t('success'))
          emit('on-refresh')
        },
        function failHandler() {
          ElMessage.error(t(status.value) + t('failure') + ':' + response.msg)
          if (response.data.registerNum > 0) {
            emit('on-refresh')
          }
        }
      )
    })
  } else {
    formInline.value.forEach((info) => {
      let newInfo = Object.assign({}, info)
      newInfo.permission = newInfo.permission ? 1 : 0
      if (!newInfo.timeRange) {
        delete newInfo.beginTime
        delete newInfo.endTime
      } else {
        newInfo.beginTime = new Date(newInfo.timeRange[0]).getTime() / 1000
        newInfo.endTime = new Date(newInfo.timeRange[1]).getTime() / 1000
      }

      delete newInfo.timeRange
      delete newInfo.faceId
      delete newInfo.photoUri
      delete newInfo.originalUri

      // 从本地选择过图片更新
      if (info.photoUri !== info.originalUri) {
        let uploadData = new FormData()
        for (let key in newInfo) {
          if (newInfo[key]) uploadData.append(key, newInfo[key])
        }
        http
          .putForm('faces/imagesinfos/' + info.faceId, uploadData)
          .then((response) => {
            dealResponseCode(
              response,
              function successHandler() {
                ElMessage.success(t(status.value) + t('success'))
                emit('on-refresh')
              },
              function failHandler() {
                ElMessage.error(
                  t(status.value) + t('failure') + ':' + response.msg
                )
              }
            )
          })
      } else {
        http.put('faces/infos/' + info.faceId, newInfo).then((response) => {
          dealResponseCode(
            response,
            function successHandler() {
              ElMessage.success(t(status.value) + t('success'))
              emit('on-refresh')
            },
            function failHandler() {
              ElMessage.error(
                t(status.value) + t('failure') + ':' + response.msg
              )
            }
          )
        })
      }
    })
  }
}

const handleBeforeUpload = (file, index) => {
  const isFormatValid =
    file.type in { 'image/jpeg': '', 'image/png': '', 'image/bmp': '' }
  if (!isFormatValid) {
    ElMessage.error(t('invalid_file_format'))
    return false
  }

  const isSizeValid = file.size / 1024 / 1024 <= 3
  if (!isSizeValid) {
    ElMessage.error(t('file_size_exceeds') + '3MB')
    return false
  }

  let url = window.URL.createObjectURL(file)
  formInline.value[index]['image'] = file
  formInline.value[index]['photoUri'] = url

  return false
}

const handleUploadSuccess = (response, file, fileList) => {
  console.log('success')
  let url = window.URL.createObjectURL(file)
  formInline.value[0]['photoUri'] = url
  console.log(url)
}

onBeforeUpdate(() => {
  uploadForm.value = []
})
watch(status, (newValue, oldValue) => {
  if (newValue == 'edit' || newValue == 'add') {
    visible.value = true
  }
})
defineExpose({
  edit,
  add,
})

const changeTimeRange = (timeRange, info) => {
  console.log('changeTimeRange')
  // if (timeRange === null) {
  //   info.beginTime = 0
  //   info.endTime = 0
  // } else {
  //   info.beginTime = new Date(timeRange[0]).getTime() / 1000
  //   info.endTime = new Date(timeRange[1]).getTime() / 1000
  // }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 5px dashed #d9d9d9;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 8rem;
  height: 6rem;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: calc((6rem - 28px) / 2 - 1px);
}
.avatar {
  width: 8rem;
  height: 6rem;
  display: block;
}
</style>