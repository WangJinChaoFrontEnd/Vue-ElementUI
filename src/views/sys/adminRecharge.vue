<template lang="html">
  <div class="hello">
        <ul class="header_box">
          <li :class="{active: isActive}" @click="JF_url"><a>充值到关爱积分</a></li>
          <li :class="{active: isActiveTwo}" @click="CZ_url"><a>充值记录</a></li>
        </ul>
        <iframe :src="'/?#'+url" width="100%" height="600" scrolling="no"></iframe>
  </div>
</template>

<script>
export default {
  data(){
    return{
      url:'/sys/Recharge_integral',
      isActive:true,
      isActiveTwo:false
    }
  },
  mounted(){
    eventAdd.$on("a-ok", function (a) {
                if(a=='充值成功'){
                  console.log("dsad")
                }
           }.bind(this));
  },
  methods:{
    JF_url:function(){
      this.url='/sys/Recharge_integral'
      this.isActiveTwo=false
      this.isActive=true
    },
    CZ_url:function(){
      this.url='/sys/adminConsumption'
      this.isActiveTwo=true
      this.isActive=false
    }
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
</style>
