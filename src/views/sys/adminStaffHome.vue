<template>
  <div>
      <div class="staff_home_warp">
          <div class="staff_home_title">员工信息概况</div>
          <ul class="staff_home_Survey">
              <li>所有员工：<a>{{staffCount}}</a>人</li>
              <li>未登录员工:<a>{{staffCount-staffLoginCount}}</a>人</li>
              <li>已登录员工<a>{{staffLoginCount}}</a>人<span>已经进行过首次登录的员工</span></li>
          </ul>
          <div class="staff_home_but">
            <el-button type="primary" icon="plus" @click="addStaff">添加新员工</el-button>
          </div>
          <div class="staff_add_warp">
            <ul>
                <li>最近新增员工</li>
            </ul>
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
          </div>
      </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                staffCount:'',
                staffLoginCount:'',
                tableData:[],
            }
        },
         created() {
                this.$http.post(this.getHostUrl()+'/webStaff/staffStatInfo.do').then(function(data){
                        this.staffCount=data.body.staffCount
                        this.staffLoginCount=data.body.staffLoginCount
                        this.tableData=data.body.list
                        for(var i=0;i<this.tableData.length;i++){
                            if(this.tableData[i].sex==1){
                                this.tableData[i].sex="男"
                            }else{
                                this.tableData[i].sex="女"
                            }
                        }
                },function(error){
                });
          },
          methods:{
                addStaff(){
                            this.$router.push({path: '/sys/adminEditStaffForm', query: {selected: '5'}});
                        },
                handleEdit(index,val){
                            this.$router.push({path: '/sys/adminEditStaff', query: {cont: val,fla:'1'}});
                        }
          }
    }
</script>
<style>
@import '../../static/css/common.css';
</style>
