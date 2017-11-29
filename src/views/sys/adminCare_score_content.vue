<template lang="html">
  <div class="hello">
        <div class="score_head">
            <ul>
              <li>关爱积分总余额：<span>{{balance/100}}</span></li>
            </ul>
            <ul>
              <li><el-button @click="GiveIntegral">发放关爱积分</el-button></li>
              <li><a @click="dialogTable1Visible = true">发放记录</a></li>
            </ul>
        </div>
        <div class="score_content">
          <h1>账户管理</h1>
          <div class="score_am">
              <ul class="score_am_t">
                <li>基本户</li>
                <li></li>
              </ul>
              <ul class="score_am_am">
                <li>账户余额</li>
                <li>{{balance/100}}</li>
                <li>暂无默认审核人</li>
              </ul>
              <div class="score_time">创建日期：2017-06-06 15:36</div>
              <ul class="score_icon">
                  <li><i class="el-icon-document"></i></li>
                  <li><i class="el-icon-edit"></i></li>
              </ul>
          </div>
        </div>
        <!--弹出框-->
        <el-dialog title="发放记录" :visible.sync="dialogTable1Visible" size="full">
          <div class="inp_text_box">
            <ul class="inp_text_warp">
              <li>
                <ul>
                  <li>开始时间</li>
                  <li>
                    <el-date-picker
                      v-model="Record_begin_time"
                      type="date"
                      format="yyyy-MM-dd"
                      placeholder="选择日期" @change="starTime">
                    </el-date-picker>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li></li>
                  <li>
                  </li>
                </ul>
              </li>
            </ul>
             <ul class="inp_text_warp">
              <li>
                <ul>
                  <li>结束时间</li>
                  <li>
                    <el-date-picker
                      v-model="Record_End_time"
                      type="date"
                      format="yyyy-MM-dd"
                      placeholder="选择日期" @change="endTime">
                    </el-date-picker>
                  </li>
                </ul>
              </li>
              <li></li>
            </ul>
            <ul class="inp_text_warp">
              <li>
                <el-button type="primary" @click="serch">搜索</el-button>
              </li>
            </ul>
          </div>
        <el-table :data="gridData">
          <el-table-column property="id" label="ID" width="150"></el-table-column>
          <el-table-column property="orderno" label="订单编号" width="200"></el-table-column>
          <el-table-column property="pay_amount_real" label="支付金额"></el-table-column>
          <el-table-column property="pay_time" label="支付时间" width="150"></el-table-column>
          <el-table-column property="pay_content" label="支付内容" width="200"></el-table-column>
          <el-table-column property="pay_state" label="支付状态"></el-table-column>
          <el-table-column property="pay_type" label="支付类型"></el-table-column>
        </el-table>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value6:'',
      input:'',
      Record_name:'',
      Record_begin_time:'',
      Record_End_time:'',
      dialogTable1Visible: false,
      dialogTable2Visible:false,
      enddate:'',
      balance:0,
      begindate:'',
      gridData: [],
      value: ''
    }
  },
  created(){
    this.$http.post(this.getHostUrl()+'/webCash/getCashAmount.do',{
      },{emulateJSON:true}).then(function(data){
      this.balance=data.body.amount
      },function(error){
      })
      this.serch()
  },
  methods:{
    getDay(){
      var now=new Date()
      var y=now.getFullYear()
      var m=now.getMonth()+1
      var d=now.getDate()
      m=m<10?"0"+m:m
      d=d<10?"0"+d:d
      this.Record_End_time=y+"-"+m+"-"+d
      this.Record_begin_time=y+'-'+m+'-'+"01";
    },
    GiveIntegral(){
      this.$router.push({path:'/sys/adminOrga',query:{}})
    },
    starTime(data){
      this.Record_begin_time=data
    },
    endTime(data){
      this.Record_End_time=data
    },
  serch(){
     this.getDay()
     this.$http.post(this.getHostUrl()+'/webCash/getCashDetail.do',{
        begindate:this.Record_begin_time,
        enddate:this.Record_End_time,
        xm:this.Record_name
      },{emulateJSON:true}).then(function(data){
      this.gridData=data.data.list
      for(var i=0;i<this.gridData.length;i++){
        this.gridData[i].pay_amount_real=data.data.list[i].pay_amount_real/100
      }
      },function(error){
      })
  },
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
.el-dialog--small{
  width: 90%
}
</style>
