import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
//mock数组
const shopList=[
    {
        id:123,
        count:2
    },
    {
        id:456,
        count:3
    }
]
//定义store
//vuex中的状态是响应的
let store = new Vuex.Store({
    state:{
        count:12,//定义一个状态
        shopList
    },
    getters:{
        totals(state){
            return state.shopList.reduce((n,item)=>n+item.count,0)
        }
    },
    mutations:{
        updateCount(state,payload){//改变状态
            state.count +=payload.add;
        },
        updateCountById(state,payload){
            // let item = state.shopList.find(item=>item.id==payload.id)
            // item.count+=1;
            // setTimeout(()=>{
            //     let item = state.shopList.find(item=>item.id==payload.id)
            //     item.count+=1;
            // },1000)
            let item = state.shopList.find(item=>item.id==payload.id)
            item.count+=1;
        }

    },
    actions:{
        updateCountAction(store,params){
            setTimeout(()=>{
                store.commit('updateCountById',params)
            },1000)
        }
    }
})

export default store