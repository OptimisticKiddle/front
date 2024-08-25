<template>
  <el-container class="container">
    <el-aside
      width="200px"
      class="side"
    >
      <el-menu
        class="menu"
        default-active="1"
      >
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
                @click="handleQuery"
              >查询</el-button>
              <el-button
                type="primary"
                @click="handleReset"
              >重置</el-button>
              <el-button
                type="primary"
                color="green"
                @click="handleAdd"
              >新增</el-button>
              <el-button
                type="primary"
                color="red"
                @click="handleDelete(ids)"
                :disabled="ids.length == 0"
              >批量删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width:95%;margin:auto"
        >
          <el-table-column type="selection" />

          <el-table-column
            label="id"
            property="id"
          />
          <el-table-column
            property="username"
            label="姓名"
          />
          <el-table-column
            property="sex"
            label="性别"
          >
            <template #default="scope">
              <div>{{ scope.row.sex == "1" ? '男' : '女' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            property="age"
            label="年龄"
          />
          <el-table-column
            property="phone"
            label="手机号"
          />

          <el-table-column
            property="status"
            label="状态"
          >
            <template #default="scope">
              <div>{{ scope.row.status == "1" ? '启用' : '禁用' }}</div>
            </template>
          </el-table-column>

          label="创建日期"
          property="createTime"
          />
          <el-table-column
            label="修改日期"
            property="updateTime"
          />
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="()=>{
									userDetail = {...scope.row}
									isVisible = true
									isAdd = false
								}"
              >
                编辑
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="handleDelete([scope.row.id])"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            v-model:current-page="pageNum"
            v-model:page-size="pageSize"
            :page-sizes="[5,10, 50, 100, 150]"
            :size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <MyDialog
          :title="isAdd ? '新增用户' : '编辑用户'"
          :isVisible="isVisible"
          :setVisible="setVisible"
          :getUserList="getUserList"
          :isAdd="isAdd"
          :userDetail="userDetail"
        ></MyDialog>

      </el-main>
    </el-container>
  </el-container>

</template>

<script lang="js" setup>
import { onMounted,reactive,ref,computed } from 'vue';
import MyDialog from '../MyDialog.vue';
import { deleteUsers, getUser } from '@/api/user';
import { ElMessageBox,ElMessage } from 'element-plus'
const formInline = reactive({
  username: '',
  sex: '',
  status: '',
})
const multipleSelection = ref([])
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);
const isVisible = ref(false);
const isAdd = ref(false);
const userDetail = ref({});
const handleSelectionChange = (val) => {
  multipleSelection.value = val
	console.log("select:",multipleSelection.value)
}
const handleSizeChange = (val) => {
	pageSize.value = val;
	pageNum.value = 1;
	getUserList();
}
const handleCurrentChange = (val) => {
  pageNum.value = val;
  getUserList();
}
const tableData = ref([]);

const handleQuery = ()=>{
	pageNum.value = 1;
	getUserList();
}

const handleReset = ()=>{
	formInline.username = '';
  formInline.sex = '';
  formInline.status = '';
  pageNum.value = 1;
  getUserList();
}

const handleAdd = ()=>{
	isAdd.value = true;
	isVisible.value = true;
}

const ids = computed(()=>{
	return multipleSelection.value.map(item=>item.id).join(',');
})

const handleDelete = async (ids)=>{
	console.log("ids:",ids)
		ElMessageBox.confirm(
		'确认删除？',
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		}
	).then(async () => {
		const res = await deleteUsers(ids);
		if(res.code == 200) {
			ElMessage({
				message: '删除成功',
				type: 'success',
				plain: true,
    })
		pageNum.value = 1;
		getUserList();
		}
	}).catch(() => {
		console.log('取消')
	})

}

const setVisible = ()=>{
	isVisible.value = false;
}

const getUserList = async ()=>{
	const res = await getUser(pageNum.value,pageSize.value,formInline);
	console.log('res:',res);
	tableData.value = res.data.records || [];
	total.value = res.data.total || 0; 
}

onMounted(()=>{
	getUserList();
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