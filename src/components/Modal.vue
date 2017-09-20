<template lang="html">
  <div class="modal">
    <div class="is-modal-container">
      <span class="is-modal-close" @click="closeModal">
      </span>
      <div class="is-modal-heading">
        <slot name="modal-heading">

        </slot>
      </div>
      <div class="is-modal-body">
        <slot name="modal-body">

        </slot>
      </div>
      <div class="is-modal-footer">
        <slot name="modal-footer">

        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal () {
      this.$store.dispatch('isShowingModal', false)
    }
  }
}
</script>

<style lang="css">
</style>
