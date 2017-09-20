<template lang="html">
  <section class="main">
    <div class="box shadow is-default text is-center">
      <div class="loader" v-show="loading">
        Cargando...
      </div>
      <div v-show="!loading">
        <canvas id="sharingCanvas" width="500" height="600" class="sharing-canvas"></canvas>
        <form class="form">
          <legend>
            ¡Vota por {{ name }}!
          </legend>
          <div class="is-form-object">
            <div class="button-list">
              <button class="button is-primary">Me gusta</button>
              <button class="button is-facebook">Compartir en facebook</button>
              <button class="button is-twitter">Compartir en twitter</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { firebase } from 'firebase'
import { db } from '@/utils/firebase'
export default {
  data () {
    return {
      loading: true,
      name: ''
    }
  },
  methods: {
    renderImage () {
      var ctx, _this = this
      var ref = db.ref('gallery')
      var photoId = this.$route.params.photoId
      var sharingCanvas = document.querySelector('#sharingCanvas')
      if (sharingCanvas != null) {
        ctx = sharingCanvas.getContext('2d')
      }
      var image = new Image()
      ref.orderByChild('id').equalTo(photoId).on('child_added', (snap) => {
        image.src = snap.val().src
        _this.name = snap.val().name
        image.onload = function () {
          _this.loading = false
          ctx.drawImage(image, 0, 0)
        }
      })
    }
  },
  mounted () {
    this.renderImage()
  },
  updated () {
    this.renderImage()
  }
}
</script>

<style lang="css">
</style>
