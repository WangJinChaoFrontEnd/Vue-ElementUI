import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  // state: {
  //   author:'',
  //   path:''
  // },
  mutations:{
    newAuthor(state,msg){
      state.path=msg
    }
  }
})

export default store
