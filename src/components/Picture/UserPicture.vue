<template lang="html">
  <div class="tile">
    <canvas id="canvas" width="400" height="400" class="edit-canvas" :style="{ 'border-color': chosenBorder }"></canvas>
  </div>


</template>

<script>
import { eventBus } from '@/main'
import { loadOnCanvas, saveDataURL } from '@/utils/js'
export default {
  data () {
    return {
      chosenBorder: ''
    }
  },
  mounted () {
    loadOnCanvas('imagePreview');
    eventBus.$on('frameWasChosen', (chosen) => {
      this.chosenBorder = chosen
    })
  },
  updated () {
    var canvas = document.querySelector('#canvas')
    var dataURL = canvas.toDataURL()
    localStorage.setItem('editedImage', data)
  }
}
</script>

<style lang="css">
</style>
