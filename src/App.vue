<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import help from './help'

export default {
  name: 'app',

  created() {
        help.$on('toggleLoading', (show) => {
                if(show){
                  this.$vux.loading.show({
                     text: '正在处理。。。'
                    })
                }else{
                  this.$vux.loading.hide();
                }
            });
        help.$on('toggleErrDialog', (show,errcode) => {
            if(errcode==200||!show){
              return;
            }
            var errDialogText;
            if(errcode==404){
              errDialogText="请求找不到";
            }
            if(errcode==403){
              errDialogText="请求未授权";
            }
            if(errcode==500){
              errDialogText="处理失败";
            }
            this.$vux.alert.show({
              title: '提示',
              content:errDialogText
            });
        });
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 62.5%;

}
#app{
  height: 100%
}
.nav{
  overflow-y:scroll;
  overflow-x:hidden;
}
.el-submenu .el-menu-item{
  min-width: 0
}
::-webkit-scrollbar-track-piece {
background-color:#f8f8f8;
}
::-webkit-scrollbar {
width:9px;
height:9px;
}
::-webkit-scrollbar-thumb {
background-color:#dddddd;
background-clip:padding-box;
min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
background-color:#bbb;
}

</style>
