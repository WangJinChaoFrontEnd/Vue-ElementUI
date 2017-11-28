<template lang="html">
  <div class="">
    <div class="Recharge_time_head">
      <div class="Rechar_start_box">
       
        <div class="serch">

        </div>
      </div>
      <div class="Re_con">
        <div class="Re_con_tit">
          <h1>开票设置</h1>
          <ul>
            <li><a @click="addInvoice_title">新增发票抬头</a></li>
            <li><a @click="del">删除</a></li>
          </ul>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column  type="selection"></el-table-column>
          <el-table-column prop="invoice_title" label="发票抬头"></el-table-column>
          <el-table-column prop="tax_no" label="纳税人识别号"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="tax_type" label="是否为一般纳税人"></el-table-column>
          <el-table-column prop="bank_name" label="银行名称"></el-table-column>
          <el-table-column prop="bank_account" label="银行账号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
           <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--新增发票抬头弹出框-->
    <el-dialog
        title="新增发票抬头"
        :visible.sync="dialogVisible">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">发票抬头</div></el-col><span style="color:red">*</span>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="invoice_title" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">填写一般纳税人信息</div></el-col><span style="color:red">*</span>
          <el-col :span="9"><div class="grid-content bg-purple-light">
            <el-radio-group v-model="radio">
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">纳税人识别号</div></el-col><span style="color:red">*</span>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="tax_no" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">地址</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="address" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">电话</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="phone" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">开户银行</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="bank_name" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">银行账户</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="bank_account" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple"><h3>证件信息</h3></div></el-col>
        </el-row>
        <el-alert  type="warning" title="" show-icon>
          <p>1.若贵公司无单独的税务登记证，税务登记信息在营业执照副本上；</p>
          <p>2.若税务登记证副本上无加盖“一般纳税人”字样，需要提供以下任一增值税一般纳税人的证明文件；
支持上传2M以内的jpg、jpeg、gif、png格式的图片。</p>
        </el-alert>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            <h5>税务登记证副本或营业执照副本</h5>
            <div class="">
              <el-upload class="upload-demo" ref="upload" name="files" :action="acturl" :file-list="fileList" :before-upload="handlePreview" :on-success="uploadSuccess" :show-file-list="true" list-type="jpg/png/bmp/gif" :auto-upload="false" :data="uploadParamData"  :headers="uploadParamHeader">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">立即上传</el-button> -->
                    
              </el-upload>
            </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <h5>银行开户许可证</h5>
            <div class="">
              <el-upload class="upload-demo" ref="upload1" name="files" :multiple="multipleFile" :action="acturl" :file-list="fileList" :before-upload="handlePreview" :on-success="uploadSuccess" :show-file-list="true" :auto-upload="false" :data="uploadParamData"  :headers="uploadParamHeader">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">立即上传</el-button> -->
                    
                  </el-upload>
            </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <h5>一般纳税人资格认定书/其它证明文件</h5>
            <div class="">
              <el-upload class="upload-demo" ref="upload2" name="files" :multiple="multipleFile" :action="acturl" :file-list="fileList" :before-upload="handlePreview" :on-success="uploadSuccess" :show-file-list="true" :auto-upload="false" :data="uploadParamData"  :headers="uploadParamHeader">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">立即上传</el-button>
                    
                  </el-upload>
            </div>
          </div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="Add_invoice">确 定</el-button>
        </span>
      </el-dialog>
    <!--新增发票抬头弹出框-->
    <!--修改发票弹出框-->
    <el-dialog
        title="修改发票"
        :visible.sync="EditVisible">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">发票抬头</div></el-col><span style="color:red">*</span>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="invoice_title" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">填写一般纳税人信息</div></el-col><span style="color:red">*</span>
          <el-col :span="9"><div class="grid-content bg-purple-light">
            <el-radio-group v-model="radio">
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">纳税人识别号</div></el-col><span style="color:red">*</span>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="tax_no" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">地址</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="address" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">电话</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="phone" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">开户银行</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="bank_name" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">银行账户</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-input v-model="bank_account" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditVisible = false">取 消</el-button>
          <el-button type="primary" @click="Edit_invoice">确 定</el-button>
        </span>
      </el-dialog>
    <!--修改发票弹出框-->
  </div>
</template>

<script>
export default {
  data(){
    return{
      value1:'',
      dialogVisible:false,
      EditVisible:false,
      input:'',
      radio:1,
      invoice_title:'',
      tax_no:'',
      address:'',
      phone:'',
      bank_name:'',
      invoiceId:0,
      bank_account:'',
      fileList:[],
      multipleFile:true,
      uploadParamData:{},
      uploadParamHeader:{},
      value2:'',
      acturl:"",
      fileCode:'',
      loadingStatus: false,
      state_value:'',
      selectIds:'',
      tableData: []
    }
  },
   created(){
      this.query()
      this.fileCode=new Date().getTime();
      this.uploadParamHeader={"USER-TOKEN":window.localStorage.getItem("token")};
      this.uploadParamData={fileCode:this.fileCode};
      this.acturl=this.getHostUrl()+"/commonUploadOrDownload/uploadBackJson.do";
    },
    methods:{
      handleSelectionChange(val){
        this.selectIds=""
        for(var i=0;i<val.length;i++){
          this.selectIds+=","+val[i].id
        }
      },
      del(){
        if(this.selectIds.length<1){
          this.$message('请先选择要删除的发票');
        }else{
          this.$http.post(this.getHostUrl()+'/webCorpInvoice/delInvoice.do',{
          ids:this.selectIds
          },{emulateJSON:true}).then(function(data){
          this.query()
          },function(error){
          })
        }
      },
      addInvoice_title(){
        this.dialogVisible = true
        this.invoiceId=""
        this.invoice_title=""
        this.tax_no=""
        this.address=""
        this.phone=""
        this.bank_name=""
        this.bank_account=""
        this.EditVisible=""
        this.EditVisible=false
      },
      handleEdit(index,row){
        this.invoiceId=this.tableData[index].id
        this.invoice_title=this.tableData[index].invoice_title
        this.tax_no=this.tableData[index].tax_no
        this.address=this.tableData[index].address
        this.phone=this.tableData[index].phone
        this.bank_name=this.tableData[index].bank_name
        this.bank_account=this.tableData[index].bank_account
        this.EditVisible=true
      },
      Edit_invoice(){
        this.$http.post(this.getHostUrl()+'/webCorpInvoice/editInvoice.do',{
          invoiceId:this.invoiceId,
          invoice_title:this.invoice_title,
          tax_no:this.tax_no,
          address:this.address,
          phone:this.phone,
          bank_name:this.bank_name,
          bank_account:this.bank_account
        },{emulateJSON:true}).then(function(data){
        this.query()
        this.EditVisible=false
        },function(error){
        })
      },
      query(){
        this.$http.post(this.getHostUrl()+'/webCorpInvoice/invoiceList.do').then(function(data){
        this.tableData=data.data.list
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].tax_type==1){
            this.tableData[i].tax_type="是"
          }
        }
        },function(error){
        })
      },
      Add_invoice(){
          this.$http.post(this.getHostUrl()+'/webCorpInvoice/addInvoice.do',{
            invoice_title:this.invoice_title,
            tax_no:this.tax_no,
            address:this.address,
            phone:this.phone,
            bank_name:this.bank_name,
            bank_account:this.bank_account,
            fileCode:this.fileCode
          },{emulateJSON:true}).then(function(data){
            this.query()
            this.dialogVisible = false
          },function(error){
          })
      },
   
      submitUpload() {
          this.$refs.upload.submit();
          this.$refs.upload1.submit();
          this.$refs.upload2.submit();
        },
        handlePreview(file) {
            this.file=file;
            if(this.file.name.indexOf("jpg")>=0||this.file.name.indexOf("png")>=0||this.file.name.indexOf("bmp")>=0||this.file.name.indexOf("gif")>=0){
              
              return true;
            }else{
              this.$Notice.warning({
                  title: '文件格式不正确',
                  desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的文件。'
              });
              
              return false;
            }
        },
        uploadSuccess(res, file,fileList){
               this.fileCode=res.filecode
               if(res.code==0){
                   return true
               }else{
                 this.error()
               }
               this.$refs.upload.clearFiles();
               this.$refs.upload1.clearFiles();
               this.$refs.upload2.clearFiles();
               
               return;
          }
          }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
.el-alert__content{
  font-size: 12px;
  color: #999
}
.el-alert--warning {
    background-color: #FFFEEE;
    border: 1px solid #F4E0A4
}
.el-alert__icon{
  color: #57a6f8
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
