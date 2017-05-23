<template>
  <div class="nested">
    <div
    @click.stop='clickCheckbox'
    :class="'nested__checkbox--' + getStatus"
    class="nested__checkbox"></div>
    <div class="nested__content">
      <div class="nested__title">Title: {{data.title}}</div>
      <div class="nested__id">ID: {{data.id}}</div>
      <div class="nested__child">
        <nested
        class="nested__child__list"
        v-for='child in data.children'
        :data='child'
        :key='child'>
        </nested>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const statuses = {
  checked: 'checked',
  unchecked: 'unchecked'
}

const store = new Vuex.Store({
  state: {
    statuses: []
  },
  mutations: {
    updateStatus (state, component) {
      let existingComponent = state.statuses.find(status => status.id === component.id)
      if (existingComponent) {
        existingComponent.status = component.status
        return
      }
      state.statuses.push(component)
    }
  },
  getters: {
    getComponentStatus: state => componentId => {
      let component = state.statuses.find(component => component.id === componentId)
      if (component && component.status) {
        return component.status
      }
      return statuses.unchecked
    }
  }
})

export default {
  name: 'nested',
  props: ['data'],
  store,
  methods: {
    clickCheckbox: function () {
      if (store.getters.getComponentStatus(this.data.id) === statuses.unchecked) {
        store.commit('updateStatus', {id: this.data.id, status: statuses.checked})
      } else {
        store.commit('updateStatus', {id: this.data.id, status: statuses.unchecked})
      }
    }
  },
  computed: {
    getStatus () {
      return store.getters.getComponentStatus(this.data.id)
    }
  }

}
</script>

<style lang="scss" scoped>
.nested {
  background: lightgray;
  padding: 20px;

  &__child__list {
    padding-left: 20px;
  }

  &__checkbox {
    width: 10px;
    height: 10px;
    cursor: pointer;
    &--checked {
      background: green;
    }
    &--indetermined {
      background: yellow;
    }
    &--unchecked {
      background: red;
    }
  }
}

</style>
