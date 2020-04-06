<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <hello></hello>
    <hr>
    <miaov/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import hello from './components/hello'
import miaov from './components/miaov'

export default {
  name: 'App',
  components: {
    HelloWorld:HelloWorld,
    Hello:hello,
    miaov:miaov,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
