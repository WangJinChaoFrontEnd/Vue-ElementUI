<template lang="html">
  <div class="hello">
        <ul class="header_box">
          <li :class="{active: isActive}" @click="JF_url"><a>员工管理首页</a></li>
          <li :class="{active: isActiveTwo}" @click="CZ_url"><a>员工信息管理</a></li>
          <li :class="{active: isActiveThr}" @click="SZ_url"><a>设置</a></li>
        </ul>
        <iframe :src="'/?#'+url" width="100%" height="600" scrolling="no"></iframe>
  </div>
</template>

<script>
export default {
  data(){
    return{
      url:'/sys/adminStaffHome',
      isActive:true,
      isActiveTwo:false,
      isActiveThr:false
    }
  },
  created(){
    if(this.$store.state.path=='1'){
      this.CZ_url()        
    }else if(this.$store.state.path=='2'){
      this.url='/sys/adminStaffInformation?addid=5'
      this.isActiveTwo=true
      this.isActive=false
      this.isActiveThr=false
    }
  },
  methods:{
    JF_url:function(){
      this.url='/sys/adminStaffHome'
      this.isActiveTwo=false
      this.isActive=true
      this.isActiveThr=false
    },
    CZ_url:function(){
      this.url='/sys/adminStaffInformation'
      this.isActiveTwo=true
      this.isActive=false
      this.isActiveThr=false
    },
    SZ_url:function(){
      this.url='/sys/adminStaffSet'
      this.isActiveTwo=false
      this.isActive=false
      this.isActiveThr=true
    }
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
</style>
