<template lang="html">
    <div>
        <div class="enterprise_box">
            <div class="enterprise">
              <div class="title_box">
                <div class="title_zs"></div>
                <div class="title_text color1">企业账户</div>
              </div>
              <div class="company_box">
                  <ul class="company_name">
                    <li class="color1">河北狼腾贸易有限公司&nbsp;&nbsp;<a>账户设置</a></li>
                  </ul>
                  <ul class="company_contact">
                    <li  class="color1">企业联系人&nbsp;&nbsp;<span class="color2">李春</span></li>
                    <li  class="color1">企业用户名&nbsp;&nbsp;<span class="color2">河北狼腾贸易有限公司</span></li>
                    <li  class="color1">平台名称&nbsp;&nbsp;<span class="color2">员工关爱平台</span></li>
                  </ul>
              </div>
            </div>
            <div class="Personnel_matters">
              <div class="title_box">
                <div class="title_zs title_zs1"></div>
                <div class="title_text color1">人事中心</div>
              </div>
              <div class="company_box">
                  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
                  <ul class="staff_num color2">
                    <li class="">全部员工</li>
                    <li><span>{{log_in}}</span>人</li>
                    <li><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未登录员工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{Not_log}}</span>人</li>
                    <li><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已登录员工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{log_in}}</span>人</li>
                  </ul>
              </div>
            </div>
            <ul class="staff">
              <li @click="send"><Icon type="ios-people-outline" color="white" size="60"></Icon></br><span>员工信息管理</span></li>
              <li @click="addStaff"><Icon type="ios-personadd-outline" color="white" size="60"></Icon></br><span>添加新员工</span></li>
              <li><Icon type="ios-bell-outline" color="white" size="60"></Icon></br><span>员工通知</span></li>
            </ul>
        </div>
        <div class="enterprise_box">
            <div class="enterprise Assets">
              <div class="title_box">
                <div class="title_zs title_zs2"></div>
                <div class="title_text color1">资产中心</div>
              </div>
                  <div class="company_box Assets_box">
                      <ul class="company_name">
                        <li class="color2 Assets_title" style="font-size:12px;line-height:20px">关爱积分可用余额:{{amount}}</li>
                        <li class="cz" v-if="amount<0">当前可用余额不足，请先充值&nbsp;&nbsp;<span><Icon type="social-usd" color="white" size="30"></Icon></span></li>
                      </ul>
                      <ul class="company_name">
                        <li  class="color1 Assets_title" style="font-size:12px;line-height:20px"><span class="color2">企业充值与发放积分数据<br/><a @click="see_more">查看更多</a></span></li>
                        <li><div id="myChart1" :style="{width: '300px', height: '300px'}"></div></li>
                      </ul>
                      <ul class="company_name">
                        <li  class="color1 Assets_title" style="font-size:12px;line-height:20px"><span class="color2">员工消费金额<br/><a @click="staff_more">查看更多</a></span></li>
                        <li><div id="myChart2" :style="{width: '340px', height: '300px'}"></div></li>
                      </ul>
                  </div>
            </div>
            <ul class="staff Recharge">
              <li @click="Rech"><Icon type="android-apps" color="white" size="60"></Icon></br><span>关爱积分管理</span></li>
              <li @click="CZ_Re"><Icon type="social-usd" color="white" size="60"></Icon></br><span>充值</span></li>
              <li><Icon type="android-more-horizontal" color="white" size="60"></Icon></br><span>敬请期待</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      Not_log:0,
      log_in:0,
      chargeCount:0,
      castCount:0,
      amount:0,
    }
  },

  methods: {
    send(){
      this.$store.commit('newAuthor','1')
      eventBus.$emit("a-msg", '员工信息管理');
    },
    addStaff(){
      this.$store.commit('newAuthor','2')
      eventBus.$emit("a-msg", '员工信息管理');
    },
    Rech(){
      eventBus.$emit("a-msg", '关爱积分管理');
    },
    CZ_Re(){
      eventBus.$emit("a-msg", '充值');
    },
    see_more(){
      eventBus.$emit("a-msg", '查看更多');
    },
    staff_more(){
      eventBus.$emit("a-msg", '员工数据');
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表

        myChart1.setOption({
          color: ['#6ebbe1'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '5%',
              right: '4%',
              bottom: '20%',
              top:'10%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  data : ['已充值', '已发放'],
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'单位(元)',
                  type:'bar',
                  barWidth: '60%',
                  data:[this.chargeCount, this.castCount]
              }
          ]
        });
        myChart2.setOption({
          color: ['#6ebbe1'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '10%',
              right: '4%',
              bottom: '20%',
              top:'10%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'直接访问',
                  type:'bar',
                  barWidth: '60%',//10, 52,10, 52,10, 52,10, 52,10, 52,10, 52
                  data:[]
              }
          ]
        });
        myChart.setOption({
          title : {
                      x:'center'
                  },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'left',

                      data: ['已登录员工','未登录员工']
                  },
                  series : [
                      {
                          name: '访问来源',
                          type: 'pie',
                          radius : '55%',
                          center: ['55%', '60%'],
                          data:[
                            {name:'未登录员工',value:this.log_in},
                            {name:'已登录员工',value:this.Not_log}
                          ],
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
        });
    }
  },
  mounted(){
    this.drawLine();//data.data.staffCount
    this.$http.post(this.getHostUrl()+'/webIndex/index.do').then(function(data){
          this.Not_log=data.data.staffLoginCount
          this.log_in=data.data.staffCount
          this.castCount=data.data.castCount/100
          this.chargeCount=data.data.chargeCount/100
          this.amount=data.data.amount/100
          this.drawLine()
     },function(error){
     });
  },
}
</script>
<style lang="css">
.color1{
  color: #666
}
.company_box{
  font-size: 14px
}
.color2{
  color: #999;
}
.enterprise_box{
  overflow: hidden;
  width: 96%;
  margin: auto;
  margin-bottom: 20px
}
.enterprise,.Personnel_matters,.staff{
  float: left;
  height: 350px
}
.enterprise,.Personnel_matters{
  width: 44%
}
.Personnel_matters{
  margin: 0 1%
}
.staff{
  width: 10%;
  height: 322px;
  margin-top: 28px
}
.title_box{
  height: 18px;
  overflow: hidden;;
  line-height: 18px;
}
.title_zs{
  width: 12px;
  height: 18px;
  float: left;
  background-color: #f60
}
.title_text{
  float: left;
  margin-left: 10px;
  font-size: 16px;
  color: 666
}
.company_box{
  margin-top: 10px;
  height: 322px;
  background-color: #fafafa;
  border: solid 1px #eee;
  border-radius: 4px
}
.company_name{
  height: 160px;
  padding: 30px 20px 16px;
  border-bottom: solid 1px #eee;
}
.company_name li:nth-child(1){
  font-size: 16px;
  line-height:60px;
}
.company_name li:nth-child(1) a{
  font-size: 12px
}
.company_name li:nth-child(2){
  font-size: 12px;
}
.company_contact li{
  line-height: 45px
}
.company_contact{
      padding: 10px 20px 10px 20px;
}
.title_zs1{
  background-color: #c23531
}
.staff li{
  width: 100px;
  height: 100px;
  background-color:#c23531;
  border-radius: 4px;
  color: white;
  text-align: center;
  padding-top: 4px
}
.staff li:nth-child(2){
  margin: 5px 0
}
#myChart{
  float: left
}
.staff_num{
  float: right;
  width: 35%;
  text-align: center;
  margin-top: 90px
}
.staff_num li:nth-child(2){
  font-size: 26px;
  font-weight: bold;
  margin: 10px 0
}
.staff_num li:nth-child(3) span:nth-child(1),.staff_num li:nth-child(4) span:nth-child(1){
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
}
.staff_num li:nth-child(3) span:nth-child(1){
  background-color: #2f4554;
}
.staff_num li:nth-child(4) span:nth-child(1){
  background-color: #c23531;
}
.staff_num li:nth-child(3),.staff_num li:nth-child(4){
  line-height: 20px
}
.Assets{
  width: 89%;
  margin-right: 1%
}
.title_zs2{
  background-color: #6ebbe1
}
.Recharge li{
  background-color: #6ebbe1
}
.Assets_box ul{
  float: left;
  width: 32%;
  height: 322px
}
.Assets_box ul:nth-child(1){
  border:none
}
.Assets_box ul:nth-child(2){
  border-left: 1px solid #eee;
  border-right: 1px solid #eee
}
.Assets_box .Assets_title{
  font-size: 12px;
  text-align: center;
}
.Assets .Assets_box .company_name .cz{
  display: block;
  width: 80%;
  margin:auto;
  margin-top: 100px
}
.cz span{
  display: inline-block;
  width: 44px;
  height: 44px;
  background-color: #6ebbe1;
  border-radius: 4px;
  text-align: center;
  padding-top: 8px;
  cursor: pointer;
}
.cz span:hover{
  background-color: #78d0fa
}
</style>
