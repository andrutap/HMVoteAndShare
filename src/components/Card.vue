<template lang="html">
  <div class="card">
    <div class="is-card-image" @click="goToUnique">
      <slot name="card-image">

      </slot>
    </div>
    <div class="is-card-overlay">
      <div class="is-card-name">
        <slot name="card-name">

        </slot>
      </div>
      <div class="is-card-heart">
        <span class="heartCounter" @click="updateHeartCount">
          <span class="heart">
            ❤&#xFE0E;
          </span>
          <span class="counter text">
              <slot name="card-votes">

              </slot>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateHeartCount } from '@/utils/js'
export default {
  methods: {
    updateHeartCount (e) {
      if (this.$store.state.didLogin) {
        updateHeartCount(e)
      } else {
        this.$store.dispatch('isShowingModalLogin', true)
        this.$store.dispatch('isShowingModal', true)
      }
    },
    goToUnique (e) {
      if (this.$store.state.didLogin) {
        var id = e.target.parentNode.parentNode.id
        console.log(id)
        this.$router.push({ name: 'photo', params: { photoId: id }})
      } else {
        this.$store.dispatch('isShowingModal', true)
        this.$store.dispatch('isShowingModalLogin', true)
      }

    }
  },
  computed: {
    ...mapGetters([
      'didLogin',
      'showModal',
      'showModalLogin'
    ])
  }
}
</script>

<style lang="css">
</style>
