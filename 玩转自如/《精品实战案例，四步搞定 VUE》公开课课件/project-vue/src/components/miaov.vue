<template>
  <div>
      <h2>我是miaov组件</h2>
      <p>{{$store.state.count}}</p>
      <button @click="changeCount">改变Count</button>

      <h2>统计总数:{{$store.getters.totals}}</h2>
  </div>
</template>
<script>
export default {
  methods:{
      changeCount(){
          this.$store.commit('updateCount',{
              add:10
          })
      }
  }
}
</script>

