<template>
<div>
    hello！一起学习vue！
    <!-- <P>{{n}}</P> -->
    <P>{{m}}</P>
    <button  @click="changeCount">改变状态</button>

    <div :key="item.id" v-for="item in shopList">
        <button @click="add(item.id)">+</button>
        <span>{{item.count}}</span>
        <button>-</button>
    </div> 
    
</div>
</template>
  
</template>

<script>
export default {
    // data(){
    //     return {
    //         n:this.$store.state.count//n的初始值从vuex的state中拿
    //     }
    // },
    computed:{
        m(){
            return this.$store.state.count;
        },
        shopList(){
          return this.$store.state.shopList;  
        }
    },
    methods:{
        changeCount(){
            this.$store.commit('updateCount',{
                add:20
            })
        },
        add(id){
            // this.$store.commit('updateCountById',{
            //     id
            // })
            this.$store.dispatch('updateCountAction',{
                id
            })
        }
    }
}
</script>

<style>

</style>
