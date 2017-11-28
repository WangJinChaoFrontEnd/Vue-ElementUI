<template lang="html">
  <div class="">
    <div class="Recharge_time_head">
      <div class="Rechar_start_box">
        <ul class="Rechar_start">
          <li>充值时间:</li>
          <li><el-date-picker  v-model="value1"  type="date"  placeholder="选择日期"></el-date-picker></li>
          <li>&nbsp;&nbsp;—&nbsp;&nbsp;</li>
          <li><el-date-picker  v-model="value2"  type="date"  placeholder="选择日期"></el-date-picker></li>
        </ul>
        <ul class="Rechar_start">
          <li>状态:</li>
          <li>
            <el-select v-model="state_value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <ul class="Rechar_start">
          <li>充值类型:</li>
          <li>
            <el-select v-model="state_value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <ul class="Rechar_start">
          <li>完成时间:</li>
          <li><el-date-picker  v-model="value1"  type="date"  placeholder="选择日期"></el-date-picker></li>
          <li>&nbsp;&nbsp;—&nbsp;&nbsp;</li>
          <li><el-date-picker  v-model="value2"  type="date"  placeholder="选择日期"></el-date-picker></li>
        </ul>
        <div class="serch">
          <el-button type="primary"><i class="el-icon-search"></i>搜索</el-button>
        </div>
      </div>
      <div class="Re_con">
        <h1>充值记录</h1>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
</style>
