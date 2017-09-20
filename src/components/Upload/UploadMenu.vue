<template lang="html">
  <div class="row">
    <div class="tile">

    </div>
    <div class="tile is-5">
      <form class="form is-inline">
        <div class="is-form-object">
          <router-link to="/photoboot" tag="button" class="button is-inverted">Sacarse una foto</router-link>
        </div>
        <div class="is-form-object">
          <button type="button" class="button is-inverted" @click="emitShowModal">Subir una foto</button>
        </div>
      </form>
    </div>
    <div class="tile">

    </div>
  </div>
</template>

<script>
import {eventBus} from '@/main'
import { checkMobile } from '@/utils/js'
export default {
  data () {
    return {
      showModal: false,
      checkMobile: null
    }
  },
  methods: {
    emitShowModal () {
      this.showModal = true
      eventBus.$emit('showingModal', this.showModal)
    }
  },
  created () {
    if (checkMobile()) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }
  }
}
</script>

<style lang="css">
</style>
