<template lang="html">
  <div class="controls">
    <article>
      <h3>Escoge tu filtro</h3>
      <div class="list">
        <canvas v-for="(cvn, i) in 5" width="100" height="100" :id="'cv' + i" class="element filter-preview" @click="addFilter" :key="cvn.id"></canvas>
      </div>
    </article>
    <article>
      <h3>Escoge el marco</h3>
      <div class="list">
        <img v-for="preview in polaroidPreview" :src="preview.src" :alt="'preview for ' + preview.name + ' polaroid'" class="element" @click="setActive(preview)" :class="{'is-active': isActive(preview)}" />
      </div>
    </article>
    <form class="form">
      <div class="is-form-object">
        <router-link to="/share" tag="button" type="button" class="button is-primary">Guardar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { loadDataURL } from '@/utils/js'
import { makeGradient, render, clearCanvas, saveFinalCanvas, renderNormal } from '@/utils/filters'
import { eventBus } from '@/main'
export default {
  data () {
    return {
      filterActive: false,
      elementActive: false,
      chosenFrame: 'rgb(255, 255, 255)',
      finalFrame: 'white',
      activeItem: null,
      polaroidPreview: [
        { src: 'static/images/polaroids/whitePreview.jpg', name: 'white', color:'#fcfcfc' },
        { src: 'static/images/polaroids/blackPreview.jpg', name: 'black', color: '#000000' },
        { src: 'static/images/polaroids/redPreview.jpg', name: 'red', color: '#e00026' }
      ]
    }
  },
  methods: {
    addFilter (event) {
      switch (event.target.id) {
        case 'cv1':
          render('#canvas', makeGradient(400, 400, '#804e0f', '#630a6b'), 400, 400)
          break;
        case 'cv2':
          render('#canvas', makeGradient(400, 400, '#3ceab3',  '#000000'), 400, 400)
          break;
        case 'cv3':
          render('#canvas', makeGradient(400, 400, '#670e77', '#d3bf15'), 400, 400)
          break;
        case 'cv0':
          renderNormal('#canvas', 400, 400)
          break;
        case 'cv4':
          render('#canvas', makeGradient(400, 400, '#315685', '#8a2a2a'), 400, 400)
          break;
      }
    },
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
      this.chosenFrame = menuItem.color
      this.finalFrame = menuItem.name
      eventBus.$emit('frameWasChosen', this.chosenFrame)
    }
  },
  mounted () {
    var images = document.querySelectorAll('.filter-preview')
    var dataURL = localStorage.getItem('imagePreview')
    var image = new Image()
    image.src = dataURL
    image.onload = function(){
      for (var i = 0; i < images.length; i++) {
        var ctx = images[i].getContext('2d')
          ctx.drawImage(image, 0, 0, 100, 100)
      }
      renderNormal('#cv0', 100, 100)
      render('#cv1', makeGradient(100, 100, '#804e0f', '#630a6b'), 100, 100)
      render('#cv2', makeGradient(100, 100, '#3ceab3', '#000000'), 100, 100)
      render('#cv3', makeGradient(100, 100, '#670e77', '#d3bf15'), 100, 100)
      render('#cv4', makeGradient(100, 100, '#315685', '#8a2a2a'), 100, 100)
    }

    // render(makeGradient(400, 400, '#ff0000', '#ffff00'))
  },
  beforeDestroy() {
    eventBus.$emit('finalFrameChosen', this.finalFrame)
  }
}
</script>

<style lang="css">
</style>
