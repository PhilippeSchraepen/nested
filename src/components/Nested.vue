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

const statuses = {
  checked: 'checked',
  unchecked: 'unchecked',
  undetermined: 'undetermined'
}

export default {
  name: 'nested',
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
    &--undetermined {
      background: yellow;
    }
    &--unchecked {
      background: red;
    }
  }
}

</style>
