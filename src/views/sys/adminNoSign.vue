<template>
    <div>
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="mobile" placeholder="手机号"></el-input>
        </el-form-item>
         <el-form-item label="姓名">
          <el-input v-model="xm" placeholder="姓名"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="uname"
                label="姓名">
            </el-table-column>
             <el-table-column
                prop="sex"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="birthday"
                label="出生日期">
            </el-table-column>
            <el-table-column
                prop="inday"
                label="入职日期">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="mail"
                label="邮箱">
            </el-table-column>
            <el-table-column label="操作">
            <template scope="scope">
                <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            </template>
            </el-table-column>
            </el-table>
    <el-button type="primary" @click="export_info">导出员工该信息</el-button>
    <el-pagination v-show="pag" layout="prev, pager, next" :total="totalPage" :page-size="pageSize" @current-change="nextPage"></el-pagination>
    </div>
</template>
<script>
  export default{
    data(){
      return{
          user: '',
          region: '',
          value1:'',
          value2:'',
          xm:'',
          mobile:'',
          totalPage:0,
          pag:false,
          pageSize:0,
          pageNo:0,
          pageN:1,
          tableData: []
      }
    },
   created(){
     //this.$router.push({path: '/sys/adminEditStaffForm', query: {selected: '5'}});
     this.onSubmit()
   },
    methods: {
      onSubmit() {
        this.$http.post(this.getHostUrl()+'/webStaff/searchList.do',{
          loginflag:2,
          xm:this.xm,
          start:this.pageN,
          mobile:this.mobile
        },{emulateJSON:true}).then(function(data){
          this.tableData=data.body.data
          this.pageSize=data.body.pageSize
          this.totalPage=data.body.totalPage
          this.pageNo=data.body.pageNo
          this.pag=true
        },function(error){})
      },
      nextPage(val){
          this.pageN=val
          this.onSubmit()
      },
      handleEdit(index,val){
        this.$router.push({path: '/sys/adminEditStaff', query: {cont: val,fla:'1'}});
      },
      export_info(){
        this.$http.post(this.getHostUrl()+'/webStaff/exportUsers.do').then(function(data){
        },function(error){})
      }
    }
  }
</script>
<style>

</style>
