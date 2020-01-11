<template>
  <div id="app">
    <router-link to="/">Go to Foo</router-link>
    <br/>
    <router-link to="/foo">Go to Bar</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>