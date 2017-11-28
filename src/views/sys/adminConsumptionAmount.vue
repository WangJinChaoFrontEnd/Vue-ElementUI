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
      <el-table :data="tableData" style="width: 100%"><el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额">
        </el-table-column>
        <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">消费统计</el-button>
      </template>
    </el-table-column>
      </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width="800">
          <el-table :data="gridData">
            <el-table-column property="id" label="id"></el-table-column>
            <el-table-column property="orderno" label="订单号"></el-table-column>
            <el-table-column property="pay_amount_real" label="支付内容"></el-table-column>
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
              tableData: [],
              userid:0,
              dialogTableVisible:false,
              gridData: []
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
          handleEdit(index){
            this.dialogTableVisible=true
            this.userid=this.tableData[index].id
            this.$http.post(this.getHostUrl()+'/webCorpUserCashStat/getCashDetail.do',{
                begindate:this.value1,
                enddate:this.value2,
                userid:this.userid
                },{emulateJSON:true}).then(function(data){
                  this.gridData=data.body.list
                  for(var i=0;i<this.gridData.length;i++){
                    this.gridData[i].pay_amount_real=this.gridData[i].pay_amount_real/100
                  }
                },function(error){})
          },
          //按分类统计
          classify:function(){
            if(this.value1==""||this.value2==""){
              this.$message('请输入要搜索的条件');
            }else{
              this.$http.post(this.getHostUrl()+'/webCorpUserCashStat/stat.do',{
                begindate:this.value1,
                enddate:this.value2
                },{emulateJSON:true}).then(function(data){
                  this.tableData=data.body.list
                  for(var i=0;i<this.tableData.length;i++){
                    this.tableData[i].pay_amount_real=this.tableData[i].pay_amount_real/100
                  }
                },function(error){})
              }
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
