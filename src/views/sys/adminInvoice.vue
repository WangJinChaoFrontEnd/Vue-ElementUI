<template lang="html">
  <div class="hello">
        <ul class="header_box">
          <li :class="{active: isActive}" @click="JF_url"><a>开票记录</a></li>
          <li :class="{active: isActiveTwo}" @click="CZ_url"><a>开票设置</a></li>
        </ul>
        <iframe :src="'/?#'+url" width="100%" height="600"  scrolling="no"></iframe>
  </div>
</template>

<script>
export default {
  data(){
    return{
      url:'/sys/adminInvoice_record',
      isActive:true,
      isActiveTwo:false
    }
  },
  methods:{
    JF_url:function(){
      this.url='/sys/adminInvoice_record'
      this.isActiveTwo=false
      this.isActive=true
    },
    CZ_url:function(){
      this.url='/sys/adminInvoice_Setting'
      this.isActiveTwo=true
      this.isActive=false
    }
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
</style>
