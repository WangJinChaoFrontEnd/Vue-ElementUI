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
      <div id="myChart5" :style="{width: '500px', height: '500px'}"></div> 
      <el-dialog title="充值明细" :visible.sync="dialogTableVisible" size="large">
        <el-table :data="gridData">
          <el-table-column property="orderno" label="订单号"></el-table-column>
          <el-table-column property="pay_content" label="支付内容"></el-table-column>
          <el-table-column property="pay_amount_real" label="支付金额"></el-table-column>
          <el-table-column property="pay_time" label="支付时间"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
        data () {
            return {
              value1:'',
              value2:'',
              cashAmount:'',
              czAmount:'',
              dialogTableVisible:false,
              gridData:[]
            }
        },
        methods: {
          drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart5 = this.$echarts.init(document.getElementById('myChart5'))
          var that=this
           // 绘制图表
          myChart5.setOption({
              tooltip: {},
              xAxis: {
                  data: ["充值明细","消费明细"]
              },
                grid: {
                left: '1%',
                right: '1%',
                bottom: '90%',
                top:'70%',
                containLabel: true
            },
              yAxis: {},
              series: [{
                  name: '数值',
                  type: 'bar',
                  data: [this.czAmount,this.cashAmount]
              }]
          });
          myChart5.on('click', function (params) {
            if(params.name=="充值明细"){
              that.ale()
              that.Recharge()
            }else if(params.name=="消费明细"){
              that.ale()
              that.consumption()
            }
          });
        },
          myclick(v){
            this.value1=v;
          },
          myclick2(v){
            this.value2=v;
          },
          ale(){
            this.dialogTableVisible=true
          },
          //按分类统计
          classify:function(){
            if(this.value1==""||this.value2==""){
              this.$message('请输入要搜索的条件');
            }else{
              this.$http.post(this.getHostUrl()+'/webCorpCashStat/stat.do',{
                  begindate:this.value1,
                  enddate:this.value2
                },{emulateJSON:true}).then(function(data){
                  this.cashAmount=data.body.cashAmount/100
                  this.czAmount=data.body.czAmount/100
                  this.drawLine()
                },function(error){})
            }
          },
          Recharge(){
            this.$http.post(this.getHostUrl()+'/webCorpCashStat/getCzDetail.do',{
              begindate:this.value1,
              enddate:this.value2
              },{emulateJSON:true}).then(function(data){
                this.gridData=data.body.list
                for(var i=0;i<this.gridData.length;i++){
                  this.gridData[i].pay_amount_real=this.gridData[i].pay_amount_real/100
                }
              },function(error){})
          },
          consumption(){
            this.$http.post(this.getHostUrl()+'/webCorpCashStat/getCashDetail.do',{
              begindate:this.value1,
              enddate:this.value2
              },{emulateJSON:true}).then(function(data){
                this.gridData=data.body.list
                for(var i=0;i<this.gridData.length;i++){
                  this.gridData[i].pay_amount_real=this.gridData[i].pay_amount_real/100
                }
              },function(error){})
          },
      },
       mounted(){
            this.drawLine();
          },
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
