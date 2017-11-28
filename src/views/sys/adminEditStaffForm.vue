<template>
  <div>
    <div class="tips_staff"><i class="el-icon-information" style="color:#20a0ff;margin-left:10px"></i>为便于员工获取初始密码，“手机”或“电子邮箱”必须填写其中之一</div>
    <el-form ref="form"  label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="userName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="sex" placeholder="请选择性别" @change="sexQue">
          <el-option v-for="item in sexlist" key="" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="mobile"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="deptId" placeholder="请选择部门" @change="deptQue">
          <el-option v-for="item in deptlist" key="" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker @change="birQue" format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="birthDay" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="入职日期">
        <el-col :span="11">
          <el-date-picker@change="inQue" format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="inDay"  style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="mail"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="certType" placeholder="请选择类型" @change="certQue">
          <el-option v-for="item in certlist" key="" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="userState" placeholder="用户状态" @change="stateQue">
          <el-option v-for="item in statelist" key="" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号">
        <el-input v-model="certNo"></el-input>
      </el-form-item>
            <el-form-item label="备注">
        <el-input type="textarea" v-model="memo"></el-input>
      </el-form-item>
      <el-form-item>
      
        <el-button type="primary" @click="addStaff">保存</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        dialogTableVisible:false,
        flag:'0',
        userName:'',
        sex:1,
        mobile:'',
        deptId:'',
        birthDay:'',
        inDay:'',
        mail:'',
        certType:'',
        certNo:'',
        memo:'',
        userId:'',
        content:{},
        deptlist:[],
        sexlist:[],
        certlist:[],
        statelist:[],
        userState:''
      }
    },
    created(){
      this.flag=this.$route.query.selected
      this.content=this.$route.query.con
      this.userId=this.$route.query.userId
      if(this.flag==9){
            this.userName=this.content.uname,
            this.sex=this.content.sex,
            this.mobile=this.content.mobile,
            this.deptId=this.content.deptId,
            this.birthDay=this.content.birthday,
            this.inDay=this.content.inday,
            this.mail=this.content.mail,
            this.certType=this.content.cert_type,
            this.certNo=this.content.cert_no,
            this.memo=this.content.memo,
            this.userState=this.content.userState
      }else{
            this.userName=""
            this.sex=""
            this.mobile=""
            this.deptId=""
            this.birthDay=""
            this.inDay=""
            this.mail=""
            this.certType=""
            this.certNo=""
            this.memo=""
            this.userState=""
      }
      this.$http.post(this.getHostUrl()+'/api/common/getSysCode.do').then(function(data){
      var codelist=eval(data.body.data);
      this.deptlist=this.getCodeArray(codelist,'DEPTTYPE');
      this.sexlist=this.getCodeArray(codelist,'SEX');
      this.certlist=this.getCodeArray(codelist,'CERT_TYPE');
      this.statelist=this.getCodeArray(codelist,'STATE');
      },function(error){
      });
    },
    methods:{
      deptQue(val){
        this.deptId=val
      },
      sexQue(val){
        this.sex=val
        console.log(val)
      },
      certQue(val){
        this.certType=val
      },
      stateQue(val){
        this.userState=val
      },
      birQue(val){
        this.birthDay=val
      },
      inQue(val){
        this.inDay=val
      },
      addStaff(){
        if(this.flag==5){
          this.$http.post(this.getHostUrl()+'/webStaff/add.do',{
            userName:this.userName,
            sex:this.sex,
            mobile:this.mobile,
            deptId:this.deptId,
            birthDay:this.birthDay,
            inDay:this.inDay,
            mail:this.mail,
            certType:this.certType,
            certNo:this.certNo,
            memo:this.memo,
            userState:this.userState
          },{emulateJSON:true}).then(function(data){
            window.history.go(-1)
          },function(error){
          });
        }else if(this.flag==9){
          //修改
          this.$http.post(this.getHostUrl()+'/webStaff/edit.do',{
            userId:this.userId,
            userName:this.userName,
            sex:this.sex,
            mobile:this.mobile,
            deptId:this.deptId,
            birthDay:this.birthDay,
            inDay:this.inDay,
            mail:this.mail,
            certType:this.certType,
            certNo:this.certNo,
            memo:this.memo,
            userState:this.userState
          },{emulateJSON:true}).then(function(data){
            this.back()
          },function(error){
          });
        }
      },
      Choice(){
        this.dialogTableVisible=true
      },
      back(){
        window.history.go(-2)
      },
       onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
@import '../../static/css/common.css';
</style>
