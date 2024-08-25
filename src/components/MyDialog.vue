<template>
  <el-dialog
    v-model="visible"
    :title="title"
    align-center
    width="500"
    :before-close="props.setVisible"
  >

    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      style="width:400px"
    >
      <el-form-item
        label="姓名"
        prop="username"
        :label-width="formLabelWidth"
        required
      >
        <el-input
          v-model="form.username"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :label-width="formLabelWidth"
        required
      >
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item
        label="性别"
        prop="sex"
        :label-width="formLabelWidth"
        required
      >
        <el-select
          v-model="form.sex"
          placeholder="请选择性别"
        >
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
        prop="phone"
        :label-width="formLabelWidth"
        required
      >
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
        :label-width="formLabelWidth"
        required
      >

        <el-select
          v-model="form.status"
          placeholder="请选择状态"
        >
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
          @click="handleSubmit"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>

import { addUser, updateUser } from '@/api/user';
import { defineProps, ref, onMounted, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus'

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
  },
  getUserList: {
    require: true
  },
  isAdd: {
    require: true
  }
  , userDetail: {
    type: Object,
    default: () => ({
      username: '',
      age: '',
      sex: '',
      phone: '',
      status: ''
    })
  }
})

const formLabelWidth = '140px'
const visible = ref(false);
const ruleFormRef = ref();
const form = ref({
  username: '',
  age: '',
  sex: '',
  phone: '',
  status: ''
})

const rules = reactive({
  username: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { max: 10, message: '姓名不能超过10个字', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { max: 10, message: '年龄不能超过10个数字', trigger: 'blur' },

  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },

    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
  ],

  status: [
    { required: true, message: '请选择状态', trigger: 'blur' },
  ],
})

watch(() => {
  visible.value = props.isVisible;
  if (props.isAdd) {
    form.value = {
      username: '',
      age: '',
      sex: '',
      phone: '',
      status: ''
    }
  } else {
    form.value = props.userDetail
  }

}, [props.isVisible, props.isAdd])
onMounted(() => {
  console.log(props.isVisible)
  visible.value = props.isVisible;
})

const handleAdd = async () => {
  const res = await addUser(form.value);
  console.log('add:', res);
  if (res.code == 200) {
    props.setVisible(false);
    props.getUserList();
    form.value = {
      username: '',
      age: '',
      sex: '',
      phone: '',
      status: ''
    }
    ElMessage({
      message: '新增成功',
      type: 'success',
      plain: true,
    })
  } else {
    ElMessage({
      message: '新增失败',
      type: 'error',
      plain: true,
    })

  }

}

const handleEdit = async () => {
  const res = await updateUser(form.value);
  console.log('add:', res);
  if (res.code == 200) {
    props.setVisible(false);
    props.getUserList();
    form.value = {
      username: '',
      age: '',
      sex: '',
      phone: '',
      status: ''
    }
    ElMessage({
      message: '修改成功',
      type: 'success',
      plain: true,
    })
  } else {
    ElMessage({
      message: '修改失败',
      type: 'error',
      plain: true,
    })

  }

}

const handleSubmit = async () => {
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      props.isAdd ? handleAdd() : handleEdit();
    }
  })
}


</script>

<style scoped>
:deep(.el-dialog__header) {
  display: flex !important;
}
</style>