<template lang="html">
  <div class="row">
    <div class="tile">
      <div class="video-mask" v-show="!snapShot">

      </div>
      <video id="video" class="video" v-show="!snapShot"></video>
      <canvas id="snapCanvas" width="400" height="400" v-show="snapShot" class="snap-canvas"></canvas>
    </div>
    <div class="tile is-12">
      <form class="form ">
        <div class="is-form-object">
          <button type="button" class="button is-primary" @click="snap" v-if="!snapShot">Sacar foto</button>
          <div class="button-list" v-else>
            <router-link to="/edit" tag="button" class="button is-primary">Usar</router-link>
            <button type="button" class="button is-flat" @click="reset">Tomar otra</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { cameraEnd, snap, cameraInit } from '@/utils/js'
export default {
  data () {
    return {
      snapShot: false
    }
  },
  methods: {
    snap () {
      snap('#snapCanvas')
      this.snapShot = true
      cameraEnd()
    },
    reset () {
      cameraInit('#video')
      this.snapShot = false
    }
  },
  updated () {
    var canvas = document.querySelector('#snapCanvas')
    var dataURL = canvas.toDataURL()
    localStorage.setItem('imagePreview', dataURL)
  }
}
</script>

<style lang="css">
</style>
