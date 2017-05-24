<template>
  <div id="app">
    <h1>The qubit-list</h1>
    <qubit :data="book"></qubit>
  </div>
</template>

<script>
import qubit from './components/qubit'

export default {
  name: 'app',
  components: {
    qubit
  },
  created () {
    this.book = {
      id: 'parent',
      title: 'Trunk',
      status: 'unchecked',
      children: [
        {
          id: 'child1',
          title: '1. First branch',
          status: 'unchecked'
        },
        {
          id: 'child2',
          title: '2. Second branch',
          status: 'unchecked',
          children: [
            {
              id: 'child21',
              title: '2.1. Sub-branch',
              status: 'unchecked',
              children: [
                {
                  id: 'child211',
                  title: '2.1.1. First leaf',
                  status: 'unchecked'
                },
                {
                  id: 'child212',
                  title: '2.1.2. Second leaf',
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

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  width: 500px;
  background: lightgray;
  padding: 20px;

  h1 {
    margin-top: 0;
  }
}
</style>
