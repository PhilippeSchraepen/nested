import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const statuses = {
  checked: 'checked',
  unchecked: 'unchecked',
  undetermined: 'undetermined'
}

export default new Vuex.Store({
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
