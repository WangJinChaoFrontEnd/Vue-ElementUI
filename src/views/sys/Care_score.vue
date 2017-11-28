<template lang="html">
  <div class="hello">
    <iframe :src="this.getHomeUrl()+'/?#'+url" width="100%" height="600px"></iframe>
  </div>
</template>
<script>
export default {
  data(){
    return{
      url:'/sys/adminCare_score_content'
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style lang="css">
iframe{
  border: none
}
</style>
