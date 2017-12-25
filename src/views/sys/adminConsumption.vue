<template lang="html">
  <div class="">
    <div class="Recharge_time_head">
      <div class="Rechar_start_box" style="margin-top:10px">
        <ul class="Rechar_start">
          <li>充值时间:</li>
          <li>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期" format="yyyy-MM-dd" @change="myclick">
            </el-date-picker>
          </li>
        </ul>
        <ul class="Rechar_start">
          <li>结束时间:</li>
          <li>
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期" format="yyyy-MM-dd" @change="myclick2">
            </el-date-picker>
          </li>
        </ul>
        <div class="serch">
          <el-button type="primary" @click="serch"><i class="el-icon-search"></i>搜索</el-button>
        </div>
      </div>
      <div class="Re_con">
        <h1>充值记录</h1>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="orderno"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pay_content"
            label="支付内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pay_amount_real"
            label="支付金额">
          </el-table-column>
          <el-table-column
            prop="pay_time"
            label="支付时间">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value1:'',
      value2:'',
      state_value:'',
      tableData: []
    }
  },
  mounted(){
    this.serch()
  },
  methods:{
    myclick(v){
      this.value1=v;
    },
    myclick2(v){
      this.value2=v;
    },
    getDay(){
      var now=new Date()
      var y=now.getFullYear()
      var m=now.getMonth()+1
      var d=now.getDate()
      m=m<10?"0"+m:m
      d=d<10?"0"+d:d
      this.value2=y+"-"+m+"-"+d
      this.value1=y+'-'+m+'-'+"01";
    },
    serch(){
      this.getDay()
      if(this.value1==""||this.value2==""){
        this.$message('请输入要搜索的条件');
      }else{
        this.$http.post(this.getHostUrl()+'/webCorpCashStat/getCzDetail.do',{
            begindate:this.value1,
            enddate:this.value2
            },{emulateJSON:true}).then(function(data){
              this.tableData=data.body.list
               for(var i=0;i<data.body.list.length;i++){
                this.tableData[i].pay_amount_real=data.body.list[i].pay_amount_real/100
              }
            },function(error){})
          }
    },
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
</style>
