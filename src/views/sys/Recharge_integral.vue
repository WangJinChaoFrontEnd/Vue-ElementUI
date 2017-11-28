<template lang="html">
  <div class="">
    <div class="jindu_box">
      <el-steps :active="active" finish-status="success" space="650px">
        <el-step title="填写充值信息"></el-step>
        <el-step title="填写开票信息"></el-step>
      </el-steps>
    </div>
    <!--第一步start-->
    <div class="content_box" v-show='model1'>
      <h1>充值信息</h1>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">汇款方式:</div></el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple-light">
            <span style="color:#f00;font-size:16px">*&nbsp;&nbsp;</span>
            <el-select v-model="Remittance_mode" placeholder="请选择">
              <el-option  v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
            </el-select>
            <span style="color:#999;font-size:12px">&nbsp;&nbsp;为了您的充值能尽快处理，建议使用银行转账方式汇款.</span>
          </div>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">收款方信息:</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">公司：河北狼腾贸易有限公司</div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple">电话：021-34014622</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">&nbsp;</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">公司：河北狼腾贸易有限公司</div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple">电话：021-34014622</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">&nbsp;</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">公司：河北狼腾贸易有限公司</div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple">电话：021-34014622</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">充值账户类型：</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">关爱积分</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">充值账户：</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">
            <span style="color:#f00;font-size:16px">*&nbsp;&nbsp;</span>
            <el-checkbox v-model="checked3" label="基本户" border @change="account"></el-checkbox>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">充值金额：</div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-input v-model="Recharge_amount"  placeholder="请输入金额" width="10"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <span style="color:rgb(153, 153, 153)">&nbsp;&nbsp;为了您的充值能尽快处理，请每次申请的金额对应一笔汇款金额</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">备注：</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="textarea3">
          </el-input>
        </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:50px">
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">&nbsp;</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light"><el-button type="primary" @click="next_o">下一步</el-button></div></el-col>
      </el-row>
    </div>
    <!--第一步END-->
    <!--第二步start-->
    <div class="content_box" v-show='model2'>
      <el-row class="amount">
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title"><h4>开票金额:</h4></div></el-col>
        <el-col :span="15"><div class="grid-content bg-purple-light amount_n">{{Recharge_amount_val}}.00</div></el-col>
        <el-col :span="6"><div class="grid-content" style="text-align:right"><a>查看销售方信息</a></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">发票类型:</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">增值税普通发票</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">发票抬头</div></el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple-light">
            <span style="color:#f00;font-size:16px">*&nbsp;&nbsp;</span>
            <span>{{invoice_tit_text}}</span>&nbsp;&nbsp;
            <a @click="message">新增纳税人信息</a>&nbsp;&nbsp;
            <a @click="dialogAdminVisible=true">管理</a>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">发票内容：</div></el-col>
        <el-col :span="21"><div class="grid-content bg-purple-light">
            <span style="color:#f00;font-size:16px">*&nbsp;&nbsp;</span>
            <!-- <el-radio-group v-model="radio3" @change="invoice_c">
              <el-radio-button label="服务费"></el-radio-button>
              <el-radio-button label="福利费"></el-radio-button>
              <el-radio-button label="其他"></el-radio-button>
              <el-radio-button label="EAP服务费"></el-radio-button>
              <el-radio-button label="体验服务费(专款专用)"></el-radio-button>
            </el-radio-group> -->
            <el-select v-model="radio3" placeholder="请选择" @change="invoice_c">
              <el-option
                v-for="item in listType"
                key=""
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">发票寄送地址：</div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span style="color:#f00;font-size:16px">*&nbsp;&nbsp;</span>
            <span>{{addressName}}</span>&nbsp;
            <a @click="NewsAddress">使用新地址</a>
            <a @click="addressVisible=true" v-if="addresstableData.length<1"></a>
            <a @click="addressVisible=true" v-if="addresstableData.length>0">管理 </a>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:50px">
        <el-col :span="3"><div class="grid-content bg-purple grid-content-title">&nbsp;</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light"><el-button type="primary" @click="next_t">确定</el-button>&nbsp;&nbsp;<a @click="back">返回</a></div></el-col>
      </el-row>
    </div>
    <!--第二步END-->
    <!--寄送地址弹出框-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="收货人" :label-width="formLabelWidth">
              <el-input v-model="contact" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="街道地址" :label-width="formLabelWidth">
              <el-input v-model="address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码" :label-width="formLabelWidth">
              <el-input v-model="postcode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="contact_mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="设为默认地址" :label-width="formLabelWidth">
              <el-switch v-model="address_default" on-text="是" off-text="否">
            </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddAdress">确 定</el-button>
          </div>
        </el-dialog>
        <!--寄送地址弹出框END-->
        <!--地址列表弹出框-->
        <el-dialog title="收货地址" :visible.sync="addressVisible">
            <el-table
            :data="addresstableData"
            highlight-current-row
            style="width: 100%" @current-change="handleaAddressChange">
          </el-table-column>
            <el-table-column
              prop="contact_name"
              label="联系人"
              >
            </el-table-column>
            <el-table-column
              prop="contact_phone"
              label="联系人电话"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              >
            </el-table-column>
            <el-table-column
              prop="postcode"
              label="邮编">
            </el-table-column>
            <el-table-column
              prop="default"
              label="是否是默认地址">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="handleaddressEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                  size="small"
                  @click="handleaddressDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            
            <el-button @click="addressVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddAdressList">确 定</el-button>
          </div>
        </el-dialog>
        <!--地址列表弹出框END-->
        <!--管理弹出框-->
            <el-dialog title="管理"  :visible.sync="dialogAdminVisible">
              <div class="Admin_invoice">
                <el-table
                  highlight-current-row
                 :data="tableData"
                 style="width: 100%" @current-change="handleSelectionChange">
                 <el-table-column
                   prop="invoice_title"
                   label="发票抬头"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="tax_no"
                   label="纳税人识别号"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="tax_type"
                   label="是否一般纳税人">
                 </el-table-column>
                 <el-table-column
                   prop="address"
                   label="地址">
                 </el-table-column>
               </el-table>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdminVisible = false">取 消</el-button>
                <el-button type="primary" @click="invoice_tit">确 定</el-button>
              </div>
            </el-dialog>
            <!--管理弹出框END-->
  </div>
</template>

<script>
export default {
  data(){
    return{
      Remittance_mode:'银行转账',
      tableData: [],
      addresstableData:[],
      flag:1,
      dialogFormVisible: false,
      dialogAdminVisible: false,
      addressVisible:false,
      checked:false,
      invoiceId:0,
      invoice_tit_text:'暂无默认',
      content:'',
      formLabelWidth: '120px',
      active:0,
      address:'',
      contact:'',
      contact_mobile:'',
      postcode:'',
      listType:[],
      address_default:false,
      checked3: false,
      textarea3: '',
      radio3:'',
      input: '',
      label_value:'',
      address_defaultNum:0,
      Recharge_amount:'',
      Recharge_amount_val:'',
      Next_Num:0,
      addressName:'暂无默认',
      addressNameDef:'',
      model1:true,
      model2:false,
      options: [{
          value: '银行转账',
          label: '银行转账'
        }, {
          value: '支票',
          label: '支票'
        }, {
          value: '现金',
          label: '现金'
        }],
        value: ''
    }
  },
  created(){
    this.$http.post(this.getHostUrl()+'/api/common/getSysCode.do').then(function(data){
      var codelist=eval(data.body.data);
      this.listType=this.getCodeArray(codelist,'TAXCONTENT_TYPE');
      },function(error){
      });
    this.$http.post(this.getHostUrl()+'/webCorpInvoice/invoiceList.do').then(function(data){
      this.tableData=data.body.list
      },function(error){
      })
    this.$http.post(this.getHostUrl()+'/webCorpAddress/addressList.do').then(function(data){
      this.addresstableData=data.body.list
      for(var i=0;i<this.addresstableData.length;i++){
        if(this.addresstableData[i].default==1){
          this.addressName=this.addresstableData[i].address
          this.addressId=this.addresstableData[i].id
        }
      }
      },function(error){
      })
  },
  methods:{
    NewsAddress(){
      this.dialogFormVisible=true
      this.address=""
      this.contact=""
      this.contact_mobile=""
      this.postcode=""
      this.address_default=0
      this.checked=0
      this.flag=2
    },
    handleaddressDel(index){
      this.addressId=this.addresstableData[index].id
      this.$http.post(this.getHostUrl()+'/webCorpAddress/delAddress.do',{
        ids:this.addressId
      },{emulateJSON:true}).then(function(data){
        this.adress_list()
        if(this.addresstableData.length<1){
          this.invoice_tit_text="暂无默认"
        }
      },function(error){
      })
    },
    handleaddressEdit(index){
      this.flag=1
      this.dialogFormVisible=true
      this.address=this.addresstableData[index].address
      this.contact=this.addresstableData[index].contact_name
      this.contact_mobile=this.addresstableData[index].contact_phone
      this.postcode=this.addresstableData[index].postcode
      this.address_defaultNum=this.addresstableData[index].address_default
      if(this.address_defaultNum==1){
        this.address_default=true
      }else if(this.address_defaultNum==0){
        this.address_default=false
      }
    },
    handleaAddressChange(val){
      if(val){
        this.addressNameDef=val.address
        this.addressId=val.id
      }
      
    },
    AddAdressList(){
      this.addressName=this.addressNameDef
      this.addressVisible=false
    },
    message(){
      this.$message('请到‘发票管理’——>‘开票设置’中新增发票抬头');
    },
    AddAdress(){
      if(this.flag==1){
        if(this.address_default==true){
        this.address_defaultNum=1
        }else if(this.address_default==false){
          this.address_defaultNum=0
        }
        this.$http.post(this.getHostUrl()+'/webCorpAddress/editAddress.do',{
            addressId:this.addressId,
            address:this.address,
            contact:this.contact,
            contact_mobile:this.contact_mobile,
            postcode:this.postcode,
            address_default:this.address_defaultNum
          },{emulateJSON:true}).then(function(data){
            this.dialogFormVisible = false
            this.$http.post(this.getHostUrl()+'/webCorpAddress/addressList.do').then(function(data){
            this.addresstableData=data.body.list
            },function(error){
            })
          },function(error){
          })
      }else if(this.flag==2){//添加的方法
          if(this.address_default==true){
            this.address_defaultNum=1
          }else if(this.address_default==false){
            this.address_defaultNum=0
          }
          this.$http.post(this.getHostUrl()+'/webCorpAddress/addAddress.do',{
            address:this.address,
            contact:this.contact,
            contact_mobile:this.contact_mobile,
            postcode:this.postcode,
            address_default:this.address_defaultNum
          },{emulateJSON:true}).then(function(data){
            this.dialogFormVisible = false
            this.address=""
            this.contact=""
            this.contact_mobile=""
            this.postcode=""
            this.address_default=false
            this.checked=0
          },function(error){
          })
      }
    },
    // adress_list(){
    //   this.addressVisible=true
    //   this.$http.post(this.getHostUrl()+'/webCorpAddress/addressList.do').then(function(data){
    //   this.addresstableData=data.body.list
    //   },function(error){
    //   })
    // },
    invoice_tit(){
      if(this.invoiceId==""||this.invoiceId.length>1){
        this.$message('请选择发票抬头并且只能选择一个');
      }else{
        this.invoice_tit_text=this.invoice_tit_text_sele
        this.dialogAdminVisible = false
      }
    },
    handleSelectionChange(val){
      this.invoiceId=val.id
      this.invoice_tit_text_sele=val.invoice_title
    },
    invoice_c(data){
      this.content=data
    },
    account(label){
      this.label_value=label.srcElement.defaultValue
    },
    back(){
      this.model1=true
      this.model2=false
      this.active=0
    },
    next_o(){
      this.Next_Num=1
      if(this.Next_Num==1){
        if(this.label_value==""||this.Recharge_amount==""){
          this.$message({message: '请选择充值账户和充值金额'});
        }else{
          this.model1=false
          this.model2=true
          this.Recharge_amount_val=this.Recharge_amount
          this.active=1
        }
      }
    },
    next_t(){
      this.Next_Num=2
      if(this.Next_Num==2){
        if(!this.Recharge_amount_val==""&&!this.invoiceId==""&&!this.addressId==""){
          this.$http.post(this.getHostUrl()+'/webCash/addCashApply.do',{
          amount:this.Recharge_amount_val,
          amountreal:this.Recharge_amount_val,
          content:'充值',
          orderno:new Date().getTime(),
          invoiceId:this.invoiceId,
          invoiceType:this.content,
          addressId:this.addressId,
          invoiceMemo:this.textarea3
          },{emulateJSON:true}).then(function(data){
            this.$message({message: '充值成功'});
            this.active=2
          },function(error){
          })
        }else{
          this.$message({message: '请补充完整信息后提交'});
        }
          

      }
    }
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
.el-dialog--small{
  width: 80%
}
</style>
