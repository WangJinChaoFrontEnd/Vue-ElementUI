<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" >
      <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
      <component :is="item.components"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import adminConsumptionAmount from "./adminConsumptionAmount"
  export default{
    data(){
      return{
        editableTabsValue: '1',
        editableTabs: [{
          title: '消费金额统计',
          name: '1',
          components:adminConsumptionAmount
        }],
        tabIndex: 3
      }
    },
    created(){
      //this.$router.push({path: '/sys/adminEditStaffForm', query: {selected: '5'}});
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
