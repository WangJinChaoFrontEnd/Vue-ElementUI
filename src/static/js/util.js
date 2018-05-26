export default {
   install(Vue,options)
  {
    Vue.prototype.getHostUrl = function () {
      var hostUrl="";
      return hostUrl;
    },
    Vue.prototype.getHomeUrl = function () {
      var hostUrl="";
      return hostUrl;
    },
      Vue.prototype.getHomeNum = function () {
        var Num = 1;
        return Num;
      },
    Vue.prototype.getCodeArray=function(codeArray,key){
      var code = [];
			for(var i=0;i<codeArray.length;i++) {
				if(codeArray[i].cList == key) {
          code.push({
						name : codeArray[i].cText,
						code : parseInt(codeArray[i].cCode)
					});
				}
			}
			return code;
    }
  }
}
