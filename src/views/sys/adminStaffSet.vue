<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="员工离职时企业发放的积分：">
          <el-radio-group v-model="radio2" @change="radioAll">
            <el-radio class="radio" v-model="radio" label="0" @change="radio">不回收</el-radio>
            <el-radio class="radio" v-model="radio" label="1">回收</el-radio>
            <el-radio class="radio" v-model="radio" label="2">未登录回收</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        user:'',
        region:'',
        radio: '',
        radio2: ''
      }
    },
    created(){
      this.$http.post(this.getHostUrl()+'/webStaff/getRecyRule.do').then(function(data){
        this.radio2=String(data.body.rule)
      },function(error){})
    },
    methods:{
      radioAll(val){
        this.radio2=val
      },
      submit(){
        this.$http.post(this.getHostUrl()+'/webStaff/setRecyRule.do',{
          recyRule:this.radio2
        },{emulateJSON:true}).then(function(data){
          this.$message('设置成功');
      },function(error){})
      }
    }
  }  
</script>
<style>

.demo-form-inline{
  margin-top: 20px
}
</style>
