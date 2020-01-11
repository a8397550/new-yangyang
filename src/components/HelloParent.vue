<template>
  <component-a v-bind:msg="xxx" />
</template>

<script>
import Hello from './HelloWorld.demo.vue';

export default {
  name: 'HelloWorld',
  data: function (){
    return {
      xxx: '888'
    }
  },
  components: {
    'component-a': Hello
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
