<template>
    <div>
      <!--外围DIV-->
      <!--top_title-->
      <div class="layout">
        <div class="header">你好：<span>{{userinfo.uName}}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span @click="Sign_out" class="sign">退出</span></div>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"><img src="../static/images/logo1.png"></div>
                <div class="layout-text">
                      <Icon type="android-apps"></Icon>
                      后台管理系统
                </div>
            <div class="layout-nav">
                <span class="">企业热线：400-888-9999</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      帮助中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>常见问题</el-dropdown-item>
                      <el-dropdown-item>操作培训</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      在线客服<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>在线咨询</el-dropdown-item>
                      <el-dropdown-item>意见建议</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
            </div>
        </Menu>
    </div>
      <!--top_title-END-->
        <div class="nav">
            <!-- <Menu theme="dark" @on-select="addTabs">
                <Submenu v-for="item in menu" v-if="item.pId==1" :name="item.mKey" key="">
                    <template slot="title" v-if="item.pId==1">{{item.mName}}</template>
                    <MenuItem v-for="item2 in menu" v-if="item.pId==1&&item2.pId==item.mId" :name="item2.mKey" key="">{{item2.mName}}</MenuItem>
                </Submenu>
            </Menu> -->
            <el-row class="tac">
            <el-col :span="12">
              <el-menu default-active="2" class="el-menu-vertical-demo" @select="addTabs"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
                <el-submenu  v-for="item in menu" :index="item.index" key="">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item-group >
                      <el-menu-item v-for="item1 in item.child" :index="item1.name" key="" :ref="item1.ref">{{item1.name}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </div>
        <div class="pane">
           <el-tabs v-model="activeTabName" type="card" editable  @tab-remove="closeTab">
              <el-tab-pane  key=""  v-for="item in tabList"  :label="item.label"  :name="item.name">
                <component :is="item.component"></component>
              </el-tab-pane>
          </el-tabs>
          <!-- <Tabs v-model="activeTabName" type="card" closable @on-tab-remove="closeTab">
              <TabPane v-for="item in tabList" :label="item.label" :name="item.name" :closable="item.closable" key="">
                <component :is="item.component"></component>
              </TabPane>
          </Tabs> -->
        </div>
        <!--外围DIV-END-->
    </div>
</template>
<script>
import "../static/js/iconfont.js"
 const Home = resolve => require(['./Home'], resolve)
export default {
    name: 'Home',
    data(){
      return {
        show:false,
        a:'',
        userinfo:{
          uName:'',
        },
        menu:[
          {
            name:'资产中心',
            index:'2',
            child:[
              {
              name:'充值',
              mUrl:'/sys/adminRecharge',
              ref:'adminRecharge'
              },
              {
              name:'关爱积分管理',
              mUrl:'/sys/Care_score',
              ref:'Care_score'
              },
              {
              name:'发票管理',
              mUrl:'/sys/adminInvoice',
              ref:'adminInvoice'
              }
            ]
          },
          {
            name:'人事中心',
            index:'3',
            child:[
              {
              name:'员工管理',
              mUrl:'/sys/adminStaffConsumption',
              ref:'adminStaffConsumption'
              }
            ]
          },
          {
            name:'应用中心',
            index:'4',
            child:[
              {
              name:'应用管理',
              mUrl:'/sys/adminRecharge',
              ref:'adminRecharge'
              }
            ]
          },
          {
            name:'数据中心',
            index:'5',
            child:[
              {
              name:'企业积分数据',
              mUrl:'/sys/adminEnterpriseScore',
              ref:'adminEnterpriseScore'
              },
              {
              name:'员工积分数据',
              mUrl:'/sys/adminEmployeeScore',
              ref:'adminEmployeeScore'
              }
            ]
          },
          {
            name:'员工服务平台',
            index:'6',
            child:[
              {
              name:'个人中心设置',
              mUrl:'/sys/adminRecharge',
              ref:'adminRecharge'
              }
            ]
          }
        ],
        tabList:[{
            label: '主页',
            name: 'home',
            disabled: false,
            closable: false,
            component: Home
        }],
        activeTabName:'home'
      }
    },
    
    mounted() {
      // if(this.$store.state.path=="员工信息管理"){
      //   addTabs("员工管理")
      // }
      eventBus.$on("a-msg", function (a) {
                if(a=='员工信息管理'){
                  this.addTabs('员工管理')
                }else if(a=='关爱积分管理'){
                  this.addTabs('关爱积分管理')
                }else if(a=="充值"){
                  this.addTabs('充值')
                }
           }.bind(this));
        this.$http.post(this.getHostUrl()+'/webLogin/getLoginInfo.do').then(function(data){
              if(data.body.data==null||data.body.data.length<7){
                return;
              }else{
                this.userinfo=data.body.data
              }
         },function(error){
         });         
    },
    methods:{
      //退出当前账号
      Sign_out:function(){
        this.$http.post(this.getHostUrl()+'/webLogin/logout.do').then(function(data){
              if(data.body.code==0){
                this.$router.push({path: '/Login'})
              }
        },function(error){
        })
      },
      toggle:function(){
        this.show=!this.show
      },
      addTabs:function(name){
        var viewname="";
        for(var i=0;i<this.menu.length;i++){
          for(var j=0;j<this.menu[i].child.length;j++){
           if(this.menu[i].child[j].name==name){
             viewname=this.menu[i].child[j].mUrl;
            if (this.tabList.filter(f => f.name == name) == 0) {
                let component = resolve => require([`../views${viewname}`], resolve)
                this.tabList.push({
                    label: this.menu[i].child[j].name,
                    name: this.menu[i].child[j].name,
                    disabled: false,
                    closable: true,
                    component: component
                });
            }
            break;
           }
           }
        }
        this.activeTabName=name;
      },
      closeTab:function(name) {
        if(name=="home"){
          this.$message('已经是主页了');
        }else{
        let tab = this.tabList.filter(f => f.name == name)[0];
        let index = this.tabList.indexOf(tab);
        this.tabList = this.tabList.filter(f => f.name != name);
        // if (index != this.tabList.length - 1) {
        //   this.activeTabName = this.tabList[index + 1].name;
        // } else {
        //   this.activeTabName = this.tabList[index - 1].name;
        // }
        this.activeTabName = this.tabList[this.tabList.length-1].name;
        }
      }
    }
}
</script>
<style>
.bounce-enter-active {
  animation: bounce-in 0.5s linear;
}
.bounce-leave-active {
  animation: bounce-out 0.5s linear;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
body{
  margin:0
}
.nav {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #e4e8f1;
    margin-top:90px;
    width: 180px;
}
.layout-text{
  float: left;
  color: #7bae5f;
  line-height: 80px;
  margin-left: 10px
}
.nav .ivu-menu-submenu{
  width: 150px
}

.pane {
    position: absolute;
    left: 17rem;
    top: 0;
    bottom: 0;
    right: 0;
    margin-top: 100px;
}
.el-menu--dark{
  background-color:#495060;
}
.ivu-menu-dark{
border-bottom: solid 1px #edeff2
}
.el-menu--dark .el-submenu .el-menu{
  background-color: #363e4f
}
/*top_title*/
.layout{
        background: #f5f7f9;
        height: 60px;
        height: 60px;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 999
    }
    .layout-logo{
        width: 160px;
        height: 50px;
        float: left;
        position: relative;
        top: 4px;
        left: 20px;
        line-height: 0
    }
    .layout-logo img{
      width: 100%;
      height: 100%;
      margin: 0
    }
    .layout-nav{
        float: right;
        color: #666;
        margin-right: 20px;
    }
    .flex_box{
      width: 100px;
      height: 80px;
      background-color: #495060;
      position: absolute;
      right: 0;
      bottom: -90px;
    }
    .flex_box div{
      color: white;
      line-height: 40px;
      text-align: center;
      border-bottom: solid 1px white
    }
    .ivu-avatar.ivu-avatar-icon{
        margin-top: 6px;
        margin-left: 12px;
    }
    .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
      padding-left: 10px
    }
    .ivu-menu-dark{
      background-color: #fff
    }
    .header{
      text-align: right;
      height: 30px;
      line-height: 30px;
      padding-right: 20px;
      border-bottom: solid 1px #edeff2;
      border-top: solid 1px #edeff2
    }
    .header .sign{
      cursor: pointer;
    }
    .header .sign:hover{
      text-decoration: underline;
    }
    .el-col-12{
      width: 100%;
    }
    .el-menu-item{
      border-bottom: solid 1px #e5e5e5
    }
    .el-submenu__title{
      border-bottom: solid 1px #e5e5e5;
    }
    .el-menu-item-group__title{
      padding: 0
    }

    /*top_title_END*/
</style>
