<template>
  <div class="nested" data="book">
    <div class="nested__title">Title: {{data.title}}</div>
    <div class="nested__title">ID: {{data.id}}</div>
    <div class="nested__child">Children:
      <nested
      class="nested__child__list"
      v-for='child in data.children'
      :data='child'
      :key='child'>
    </nested>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default {
  name: 'nested',
  props: ['data'],
  data () {
    return {
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nested {
  background: lightgray;
  padding: 20px;
}

.nested__child__list {
  padding-left: 20px;
}
</style>
