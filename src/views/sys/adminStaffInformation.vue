<template>
  <div>
    <ul class="staff_infor_Import">
        <li><el-button type="primary" icon="plus" @click="add">添加新员工</el-button></li>
        <li><a @click="export_file">导入文件批量添加</a></li>
    </ul>
    <el-tabs v-model="editableTabsValue" type="card" >
      <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
      <component :is="item.components"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import adminAllStaff from "./adminAllStaff"
  import adminSign from "./adminSign"
  import adminNoSign from "./adminNoSign"
  export default{
    data(){
      return{
        editableTabsValue: '1',
        editableTabs: [{
          title: '全部员工',
          name: '1',
          components:adminAllStaff
        }, {
          title: '已登录员工',
          name: '2',
          components: adminSign
        }, {
          title: '未登录员工',
          name: '3',
          components: adminNoSign
        }],
        tabIndex: 3
      }
    },
    mounted(){
      if(this.$route.query.addid=="5"){
        this.$router.push({path: '/sys/adminEditStaffForm', query: {selected: '5'}});
      }else{
        return
      }
    },
    methods: {
      add(){
        this.$router.push({path: '/sys/adminEditStaffForm', query: {selected: '5'}});
      },
      export_file(){
        this.$router.push({path:'/sys/adminExportFile'})
      }
    }
  }  
</script>
<style>
@import '../../static/css/common.css';
</style>
