<template lang="html">
  <div class="">
    <div style="width:60%">
      <el-form label-width="80px">
        <el-form-item label="账户余额:">
          <div style="color:#20a0ff">{{amount}}</div>
        </el-form-item>
        <el-form-item label="发放对象">
          <el-tag :key="tag.name" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">
{{tag.name}}
</el-tag>
          <a @click="staffList">请选择</a>
        </el-form-item>
        <el-form-item label="发放金额:">
          <el-input v-model="amount_f"></el-input>
        </el-form-item>
        <el-form-item label="发放原因:">
          <el-input v-model="reson"></el-input>
        </el-form-item>
        <el-form-item>
          <a @click="back">返回上一页</a>&nbsp;&nbsp;&nbsp;
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="选择员工" size="large" :visible.sync="dialogTableVisible">
      <el-row style="margin-bottom:10px">
        <el-col :span="1"><div class="grid-content bg-purple">姓名</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light"><el-input v-model="xm"></el-input></div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple" style="text-align:right">手机号:&nbsp;&nbsp;</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"><el-input v-model="mobile"></el-input></div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light">&nbsp;&nbsp;<el-button type="primary" @click="serch">搜索</el-button></div></el-col>
      </el-row>
      <el-table ref="table" :data="gridData" @selection-change="handleSelectionChange" style="margin-bottom:10px">
        <el-table-column  type="selection"  width="55"></el-table-column>
        <el-table-column property="uname" label="姓名" width="150"></el-table-column>
        <el-table-column property="mobile" label="手机号" width="200"></el-table-column>
        <el-table-column property="mail" label="邮箱"></el-table-column>
      </el-table>
      <el-pagination  layout="prev, pager, next" :total="totalPage" :page-size="pageSize" @current-change="nextPage"></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
          amount: '',
          dynamicTags: [],
          dialogTableVisible:false,
          amount_f:0,
          totalPage:0,
          pag:false,
          pageSize:0,
          pageNo:0,
          pageN:1,
          type: [],
          reson: '',
          xm:'',
          mobile:'',
          ids:'',
          gridData:[],
          list:[],
          idList:''
    }
  },
  mounted(){
      this.$http.post(this.getHostUrl()+'/webCash/getCashAmount.do').then(function(data){
        this.amount=data.body.amount/100
      },function(error){})
      this.queryList()
  },
  methods: {
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.idList=this.idList.replace(','+tag.id,"");
        for(var k=0;k<this.gridData.length;k++){
          if(this.gridData[k].id==tag.id)
          this.$refs.table.toggleRowSelection(this.gridData[k]);
        }
      },
    onSubmit(){
      if(this.idList==""){
        this.$message('请选择员工');
      }else if(this.amount_f==""){
        this.$message('请输入金额');
      }else{
        this.$http.post(this.getHostUrl()+'/webCash/delCash.do',{
          ids:this.idList,
          amount:this.amount_f*100,
          reson:this.reson
        },{emulateJSON:true}).then(function(data){
          if(data.body.code==0){
            this.$message({
            message: '恭喜你，提交成功',
            type: 'success'
            });
            this.back()
          }else if(data.body.code==-3){
            this.$message('余额不足');
          }else if(data.body.code==-4){
            this.$message('输入错误');
          }
        },function(error){})
      }
    },
      handleSelectionChange(data){
        this.dynamicTags=[]
        this.list=data
        for(var i=0;i<data.length;i++){
          this.dynamicTags.push({name:data[i].uname,id:data[i].id})
          if(data[i]==this.gridData[i])
          this.$refs.table.toggleRowSelection(this.gridData[i],true);
        }
        this.idList=''
        for(var j=0;j<this.dynamicTags.length;j++){
          this.idList+=","+this.dynamicTags[j].id
        }
      },
      back(){
        window.history.go(-1)
      },
      serch(){
        this.queryList()
      },
      nextPage(val){
          this.pageN=val
          this.queryList()
      },
      queryList(){
        this.$http.post(this.getHostUrl()+'/webStaff/searchList.do',{
          loginflag:0,
          xm:this.xm,
          start:this.pageN,
          mobile:this.mobile
        },{emulateJSON:true}).then(function(data){
          this.gridData=data.body.data
          this.pageSize=data.body.pageSize
          this.totalPage=data.body.totalPage
          this.pageNo=data.body.pageNo
        },function(error){})
      },
      staffList(){
        this.dialogTableVisible=true
      }
    }
}
</script>
<style lang="css">
.el-dialog--small{
  width: 50%
}
</style>
