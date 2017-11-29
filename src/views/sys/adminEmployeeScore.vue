<template>
  <div>
    <iframe :src="'/?#'+'/sys/adminConsumptionAmount'" width="100%" height="600px" scrolling="no"></iframe>
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
