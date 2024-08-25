<template>
  <el-dialog
    v-model="visible"
    :title="title"
    align-center
    width="500"
  >
    <el-form :model="form">
      <el-form-item
        label="Promotion name"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="Zones"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.region"
          placeholder="Please select a zone"
        >
          <el-option
            label="Zone No.1"
            value="shanghai"
          />
          <el-option
            label="Zone No.2"
            value="beijing"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>

import { defineProps, ref, onMounted, reactive } from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: false,
  }
})
const formLabelWidth = '140px'
const visible = ref(false);
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

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