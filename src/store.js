import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const statuses = {
  checked: 'checked',
  unchecked: 'unchecked',
  undetermined: 'undetermined'
}

function findNode (id, currentNode) {
  let i
  let currentChild
  let result

  if (id === currentNode.id) {
    return currentNode
  } else if (!currentNode.children) {
    return false
  } else {
    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    for (i = 0; i < currentNode.children.length; i += 1) {
      currentChild = currentNode.children[i]
      // Search in the current child
      result = findNode(id, currentChild)
      // Return the result if the node has been found
      if (result !== false) {
        return result
      }
    }
    // The node has not been found and we have no more options
    return false
  }
}

export default new Vuex.Store({
  state: {
    statuses: []
  },
  mutations: {
    populateState (state, data) {
      state.statuses = data
    },
    updateStatus (state, component) {
      var result = findNode(component.id, state.statuses)
      if (result) {
        result.status = component.status
      }
    }
  },
  getters: {
    getComponentStatus: state => componentId => {
      let result = findNode(componentId, state.statuses)
      if (result && result.status) {
        return result.status
      }
      return statuses.unchecked
    }
  }
})
