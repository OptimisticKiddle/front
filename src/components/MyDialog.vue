<template>
  <el-dialog
    v-model="visible"
    :title="title"
    align-center
    width="500"
    :before-close="props.setVisible"
  >
    <el-form :model="form">
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.username"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="年龄"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item
        label="性别"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.sex">
          <el-option
            label="女"
            value="0"
          />
          <el-option
            label="男"
            value="1"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item
        label="状态"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.status">
          <el-option
            label="启用"
            value="1"
          />
          <el-option
            label="禁用"
            value="0"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>

import { defineProps, ref, onMounted, reactive, watch } from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  setVisible: {
    require: true,
  }
})

const formLabelWidth = '140px'
const visible = ref(false);
const form = reactive({
  username: '',
  age: '',
  sex: '',
  phone: '',
  status: ''
})



watch(() => {
  visible.value = props.isVisible;
}, [props.isVisible])
onMounted(() => {
  console.log(props.isVisible)
  visible.value = props.isVisible;
})


</script>

<style scoped>
:deep(.el-dialog__header) {
  display: flex !important;
}
</style>