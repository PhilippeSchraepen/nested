import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const statuses = {
  checked: 'checked',
  unchecked: 'unchecked',
  undetermined: 'undetermined'
}

function findNode (id, currentNode) {
  if (id === currentNode.id) {
    return currentNode
  } else if (!currentNode.children) {
    return false
  } else {
    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    for (let i = 0; i < currentNode.children.length; i += 1) {
      let currentChild = currentNode.children[i]
      currentChild.parentId = currentNode.id
      // Search in the current child
      let result = findNode(id, currentChild)
      // Return the result if the node has been found
      if (result !== false) {
        return result
      }
    }
    // The node has not been found and we have no more options
    return false
  }
}

function updateChildStatuses (currentNode) {
  if (!currentNode.children) return
  for (let i = 0; i < currentNode.children.length; i += 1) {
    let currentChild = currentNode.children[i]
    currentChild.status = currentNode.status
    updateChildStatuses(currentChild)
  }
}

function updateParentStatuses (currentNode, tree) {
  if (!currentNode.parentId) return
  let parentNode = findNode(currentNode.parentId, tree)
  if (parentNode.children.every(child => child.status === statuses.checked)) {
    parentNode.status = statuses.checked
  } else if (parentNode.children.every(child => child.status === statuses.unchecked)) {
    parentNode.status = statuses.unchecked
  } else {
    parentNode.status = statuses.undetermined
  }
  updateParentStatuses(parentNode, tree)
}

export default new Vuex.Store({
  state: {
    tree: []
  },
  mutations: {
    populateState (state, data) {
      state.tree = data
    },
    updateStatus (state, component) {
      var result = findNode(component.id, state.tree)
      if (!result) return
      result.status = component.status
      updateChildStatuses(result)
      updateParentStatuses(result, state.tree)
    }
  },
  getters: {
    getComponentStatus: state => componentId => {
      let result = findNode(componentId, state.tree)
      if (result && result.status) {
        return result.status
      }
      return statuses.unchecked
    }
  }
})
