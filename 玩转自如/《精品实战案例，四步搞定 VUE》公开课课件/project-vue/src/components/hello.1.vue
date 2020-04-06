<template>
<div>
    hello！一起学习vue！
    <P>{{n}}</P>
    <P>{{m}}</P>
    <button @click="changeCount">改变状态</button>
</div>
</template>
  
</template>

<script>
export default {
    data(){
        return {
            n:this.$store.state.count//n的初始值从vuex的state中拿
        }
    },
    computed:{
        m(){
            return this.$store.state.count;
        }
    },
    methods:{
        changeCount(){
            this.$store.commit('updateCount',{
                add:20
            })
        }
    }
}
</script>

<style>

</style>
