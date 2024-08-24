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
        <el-table></el-table>
      </el-main>
    </el-container>
  </el-container>

</template>

<script lang="js" setup>
import { onMounted } from 'vue';
// import { test } from '@/api/user';

// const getData = async (data)=>{
// 	const res = await test(data);
// 	console.log('123123',res);

// }
onMounted(()=>{
	// const data = {
	// 	page:1,
	// 	pageSize:10,
	// 	name:'',
	// }

	// 123getData(data);

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
</style>