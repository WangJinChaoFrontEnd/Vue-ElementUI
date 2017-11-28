<template lang="html">
<div class="Invoice_r">
      <h1>开票记录</h1>
      <el-table :data="invoice_list">
            <el-table-column property="contact_name" label="联系人"></el-table-column>
            <el-table-column property="contact_phone" label="联系电话"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
            <el-table-column property="invoice_title" label="发票抬头"></el-table-column>
            <el-table-column property="tax_no" label="纳税人识别号"></el-table-column>
            <el-table-column property="postcode" label="邮政编码"></el-table-column>
            <el-table-column property="invoiceType" label="发票类型"></el-table-column>
            <el-table-column property="taxType" label="是否一般纳税人"></el-table-column>
       </el-table>
</div>
</template>

<script>
export default {
    data(){
        return{
            invoice_list:[]
        }
    },
    created(){
        this.$http.post(this.getHostUrl()+'/webCorpInvoice/queryInvoiceDetailList.do').then(function(data){
        this.invoice_list=data.data.list
        },function(error){
        })
    }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
</style>
