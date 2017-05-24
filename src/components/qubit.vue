<template>
  <div class="qubit">
    <div
    @click.stop='clickCheckbox'
    :class="'qubit__checkbox--' + getStatus"
    class="qubit__checkbox"></div>
    <div class="qubit__title">{{data.title}}</div>
    <div class="qubit__child">
      <qubit
      class="qubit__child__list"
      v-for='child in data.children'
      :data='child'
      :key='child'>
    </qubit>
    </div>
  </div>
</template>

<script>

const statuses = {
  checked: 'checked',
  unchecked: 'unchecked',
  undetermined: 'undetermined'
}

export default {
  name: 'qubit',
  props: ['data'],
  methods: {
    clickCheckbox: function () {
      if (this.$store.getters.getComponentStatus(this.data.id) === statuses.unchecked) {
        this.$store.commit('updateStatus', {id: this.data.id, status: statuses.checked})
        return
      }
      this.$store.commit('updateStatus', {id: this.data.id, status: statuses.unchecked})
    }
  },
  computed: {
    getStatus () {
      return this.$store.getters.getComponentStatus(this.data.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.qubit {
  padding-top: 20px;

  &__title {
    display: inline-block;
    vertical-align: middle;
  }

  &__checkbox {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    cursor: pointer;
    &--checked {
      background-image: url('../assets/checkbox-checked.svg');
    }
    &--undetermined {
      background-image: url('../assets/checkbox-undetermined.svg');
    }
    &--unchecked {
      background-image: url('../assets/checkbox-unchecked.svg');
    }
  }

  &__child {
    padding-left: 50px;
  }
}

</style>
