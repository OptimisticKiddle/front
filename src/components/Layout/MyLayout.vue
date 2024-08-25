<template>
  <el-container class="container">
    <el-aside
      width="200px"
      class="side"
    >
      <el-menu class="menu">
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>用户列表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">

      </el-header>
      <el-main>
        <div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
          >
            <el-form-item label="姓名">
              <el-input
                v-model="formInline.username"
                placeholder="姓名"
                clearable
                maxlength="5"
                style="width:200px"
              />
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="formInline.sex"
                placeholder="请选择性别"
                clearable
                style="width:200px"
              >
                <el-option
                  label="男"
                  value="1"
                />
                <el-option
                  label="女"
                  value="0"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="formInline.status"
                placeholder="请选择状态"
                clearable
                style="width:200px"
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
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
              >查询</el-button>
              <el-button
                type="primary"
                @click="handleReset"
              >重置</el-button>
              <el-button
                type="primary"
                color="green"
                @click="handleReset"
              >新增</el-button>
              <el-button
                type="primary"
                color="red"
                @click="handleReset"
              >批量删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width:90%;margin:auto"
        >
          <el-table-column type="selection" />

          <el-table-column
            label="id"
            property="id"
          />
          <el-table-column
            property="name"
            label="姓名"
          />
          <el-table-column
            property="sex"
            label="性别"
          />
          <el-table-column
            property="年龄"
            label="age"
          />
          <el-table-column
            property="手机号"
            label="phone"
          />
          <el-table-column
            property="创建日期"
            label="createTime"
          />
          <el-table-column
            property="修改日期"
            label="updateTime"
          />
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template #default>
              <el-button
                link
                type="primary"
                size="small"
                @click="handleClick"
              >
                编辑
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            v-model:current-page="pageNum"
            v-model:page-size="pageSize"
            :page-sizes="[10, 50, 100, 150]"
            :size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="150"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <MyDialog
          :title="'新增用户'"
          :isVisible="isVisible"
        ></MyDialog>

      </el-main>
    </el-container>
  </el-container>

</template>

<script lang="js" setup>
import { onMounted,reactive,ref } from 'vue';
import MyDialog from '../MyDialog.vue';
const formInline = reactive({
  username: '',
  sex: '',
  status: '',
})
const multipleSelection = ref([])
const pageNum = ref(1);
const pageSize = ref(10);
const isVisible = ref(false);
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const tableData = [
  {
		id:1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

onMounted(()=>{


});

</script>

<style scoped >
.container {
  background-color: #f4f6fa;
}
.header {
  background-color: #ffffff;
}
.side {
  background-color: #30354f;
  /* margin-right: 10px; */
}
.menu {
  background-color: #30354f;
  border-right: 1px solid #30354f;
  color: white !important;
}
.pagination {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
  margin-right: 55px;
}
</style>