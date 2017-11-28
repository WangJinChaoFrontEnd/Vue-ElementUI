<template>
  <div class="title_top">
    <div class="box">
      <ul class="butt_right">
          <li style="line-height:35px">日期：</li>
          <li><el-date-picker v-model="value1" type="date" placeholder="选择日期" :editable='false' format="yyyy-MM-dd" @change="myclick"></el-date-picker></li>
          <li style="line-height:35px">--</li>
          <li><el-date-picker v-model="value2" type="date" placeholder="选择日期" :editable='false' format="yyyy-MM-dd" @change="myclick2"></el-date-picker></li>
          <li><button type="button" name="button" @click="classify">搜索</button></li>
      </ul>
      </div>
      <ul class="tit">
        <li></li>
        <li><h1>关爱积分充值与积分统计</h1></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
        data () {
            return {
              value1:'',
              value2:'',
            }
        },
          created() {
            
          },
        methods: {
          myclick(v){
            this.value1=v;
          },
          myclick2(v){
            this.value2=v;
          },
          //按分类统计
          classify:function(){
           
          }
        }
    }
</script>
<style media="screen">
.ivu-modal-wrap .ivu-modal{
  width: 800px
}
@import '../../static/css/style.css';
.ivu-modal-body{
  height: 400px
}
.ivu-modal-content{
  width: 800px
}
h1{
  font-size: 18px
}
.tit{
  overflow: hidden;
  margin-top: 10px
}
.tit li{
  float: left;
  line-height: 30px
}
.tit li:nth-child(1){
  width: 10px;
  height: 30px;
  background-color: #2d8cf0;
  margin:0 10px
}
</style>
