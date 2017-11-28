<template>
  <div>
      <div class="tips_staff"><i class="el-icon-information" style="color:#20a0ff;margin-left:10px"></i>为便于员工获取初始密码，“手机”或“电子邮箱”必须填写其中之一</div>
      <ul class="export_file_title">
          <li>导入文件批量添加新员工</li>
          <li><a @click="back"><<返回上一页</a></li>
      </ul>
      <div class="upload_but">
        <el-upload class="upload-demo" ref="upload" name="userExcel" :action="acturl" :file-list="fileList" :before-upload="handlePreview" :on-success="uploadSuccess" :show-file-list="true" list-type="xls/xlsx" :auto-upload="false" :data="uploadParamData"  :headers="uploadParamHeader">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">立即上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xls或.xlsx文件，且不超过10M<br/>{{ loadingStatus ? '上传中....' : '' }}</div>
        </el-upload>
      </div>
      <dl class="export_file_memo">
        <dt>导入方法</dt>
        <dd>1. 导入文件的格式为EXCEL格式，后缀名为.xls或.xlsx</dd>
        <dd>2. 导入的数据应放在文件的第一个工作表中</dd>
        <dd>3. 工作表结构如下</dd>
        <dd><img src="../../static/images/cn-employee.jpg"></dd>
        <dd>4. "工号"、"姓名"是必须填写的列，其他列可选</dd>
        <dd>5. "证件类型"：身份证、护照，如果"证件类型"不为空，则"证件号码"必填</dd>
        <dd><el-button type="primary">下载模板</el-button></dd>
      </dl>
  </div>       
</template>
<script>
export default{
    data(){
        return{
            acturl:"",
            fileList:[],
            uploadParamData:{},
            uploadParamHeader:{},
            loadingStatus: false
        }
    },
    created() {
            this.uploadParamHeader={"USER-TOKEN":window.localStorage.getItem("token")};
            this.uploadParamData={};
            this.acturl=this.getHostUrl()+"/webStaff/adminUserUploadImport.do";
          },
    methods:{
        back(){
            window.history.go(-1)
        },
        submitUpload() {
              this.$refs.upload.submit();
          },
          handlePreview(file) {
              this.file=file;
              if(this.file.name.indexOf("jpg")>=0||this.file.name.indexOf("xls")>=0||this.file.name.indexOf("xlsx")>=0){
                this.loadingStatus=true;
                return true;
              }else{
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 xls 或 xlsx 格式的文件。'
                });
                this.loadingStatus=false;
                return false;
              }
          },
          uploadSuccess(res, file,fileList){
                 if(res.code==0){
                   this.$message({
                    message: '上传成功',
                    type: 'success'
                    });
                 }else{
                   this.$vux.alert.show({
                     title: '提示',
                     content: '上传失败'
                   });
                 }
                 this.$refs.upload.clearFiles();
                 this.loadingStatus=false;
                 return;
            }
          }
}    
</script>
<style>
@import '../../static/css/common.css';
</style>
