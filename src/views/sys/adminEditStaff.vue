<template>
  <div>
    <table  width="100%" cellpadding="0" cellspacing="1" class="gridtable">
        <tr>
          <td>id</td>
          <td>{{list.id}}</td>
          <td>姓名</td>
          <td>{{list.uname}}</td>
        </tr>
        <tr>
          <td>性别</td>
          <td>{{list.sex}}</td>
          <td>出生日期</td>
          <td>{{list.birthday}}</td>
        </tr>
        <tr>
          <td>电子邮箱</td>
          <td>{{list.mail}}</td>
          <td>入职日期</td>
          <td>{{list.inday}}</td>
        </tr>
        <tr>
          <td>手机</td>
          <td>{{list.mobile}}</td>
          <td>证件类型</td>
          <td>{{list.cert_type_name}}</td>
        </tr>
        <tr>
          <td>证件号码</td>
          <td>{{list.cert_no}}</td>
          <td>备注</td>
          <td>{{list.memo}}</td>
        </tr>
      </table>
      <el-button @click="Edit">修改</el-button>
      <el-button @click="del">删除</el-button>
      <a @click="back"><<返回上一页</a>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        list:'',
        userId:''
      }
    },
    created(){
      this.userId=this.$route.query.cont.id
      this.list=this.$route.query.cont
      if(this.list.sex==0){
        this.list.sex='男'
      }else{
        this.list.sex='女'
      }
    },
    methods:{
      Edit:function(){
        this.$router.push({path: '/sys/adminEditStaffForm', query: {userId:this.userId,selected:'9',con:this.list}});
      },
      del(){
         this.$http.post(this.getHostUrl()+'/webStaff/del.do',{
           ids:this.list.id
         },{emulateJSON:true}).then(function(data){
           this.back()
      },function(error){
      });
      },
      back(){
        window.history.go(-1)
      }
    }
  }  
</script>
<style>
table.gridtable {
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
	border-collapse: collapse;
}
table.gridtable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}
table.gridtable td:nth-child(odd) {
	background-color: #e6e6e6
}
</style>
