<template lang="html">
  <section class="main">
    <div class="box shadow is-default text is-center">
      <div class="row">
        <div class="tile">
          <canvas id="sharingCanvas" width="500" height="600" class="sharing-canvas"></canvas>
          <form class="form">
            <legend>
              {{ user }}, comparte tu foto para participar
            </legend>
            <div class="is-form-object">
              <button type="button" class="button is-facebook">Compartir en facebook</button>
            </div>
            <div class="is-form-object">
              <button type="button" class="button is-twitter">Compartir en twitter</button>
            </div>
            <div class="is-form-object">
              <router-link tag="button" to="/vote" class="button is-flat">O Vota aquí por tu foto favorita</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      ff: ['red', 'black'],
      fC: '',
      user: this.$store.state.user
    }
  },
  created () {
    var i = Math.floor(Math.random() * this.ff.length)
    this.fC = this.ff[i]
  },
  mounted () {
    const sharingCanvas = document.querySelector('#sharingCanvas')
    const ctx = sharingCanvas.getContext('2d')
    const background = new Image()
    const dataURL = localStorage.getItem('finalImage')
    const editedImage = new Image()
    editedImage.src = dataURL
    background.src = 'static/images/polaroids/' + this.fC + '.png'
    editedImage.onload = function () {
      background.onload = function () {
        ctx.drawImage(editedImage, 50, 50, 400, 400)
        ctx.drawImage(background, 0, 0)
      }
    }
  }
}
</script>

<style lang="css">
</style>
