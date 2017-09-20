<template lang="html">
  <section class="main">
    <div class="box shadow is-default text is-center">
      <top></top>
      <div class="row">
        <div class="tile">

          <canvas id="canvas" width="400" height="400"></canvas>
          <form class="form reset text is-center">
            <div class="is-form-object" v-show="uploaded">
              <img style="display:none" class="image-preview" alt="preview image"/>
            </div>
            <div class="is-form-object">
              <div class="button-list">
                <button @click="beforeGo" type="button" class="button is-primary" v-if="uploaded">Usar foto</button>
                <span class="button file-upload" :class="{'is-flat': uploaded, 'is-primary': !uploaded}">
                  <label for="uploadFile">Sube <template v-if="uploaded">otra</template> <template v-else>tu foto</template></label>
                  <input type="file" id="uploadFile" capture="camera" @change="prevImage" accept="image/*"/>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UploadMenu from '@/components/Upload/UploadMenu'
import { eventBus } from '@/main'
import { previewImage, loadDataURL, fixBody, checkMobile, saveDataURL, loadOnCanvas } from '@/utils/js'
export default {
  components: {
    'upload-menu': UploadMenu
  },
  data () {
    return {
      showModal: false,
      uploaded: false,
      isMobile: null
    }
  },
  methods: {
    prevImage (e) {
      previewImage(e)
      this.uploaded = true
    },
    beforeGo () {
      var canvas = document.querySelector('#canvas')
      var dataURL = canvas.toDataURL()
      localStorage.setItem('finalImage', dataURL)
      this.$router.push('/share')
    }
  },
  mounted () {
    fixBody()
    console.log(this.$store.state.user)
  },
}
</script>

<style lang="css">
</style>
