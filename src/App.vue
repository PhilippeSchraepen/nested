<template>
  <div id="app">
    <nested :data="book"></nested>
  </div>
</template>

<script>
import Nested from './components/Nested'

export default {
  name: 'app',
  components: {
    Nested
  },
  created () {
    this.book = {
      id: 'parent',
      title: 'parent',
      status: 'unchecked',
      children: [
        {
          id: 'child1',
          title: '1. child',
          status: 'unchecked'
        },
        {
          id: 'child2',
          title: '2. child',
          status: 'unchecked',
          children: [
            {
              id: 'child21',
              title: '2.1. grandchild',
              status: 'unchecked',
              children: [
                {
                  id: 'child211',
                  title: '2.1.1 greatgrandchild',
                  status: 'unchecked'
                },
                {
                  id: 'child212',
                  title: '2.1.2 greatgrandchild',
                  status: 'unchecked'
                }
              ]
            }
          ]
        }
      ]
    }
    this.$store.commit('populateState', this.book)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
