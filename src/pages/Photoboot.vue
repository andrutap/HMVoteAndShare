<template lang="html">
  <section class="main">
    <div class="box shadow is-default text is-center">
      <video-booth></video-booth>
    </div>
  </section>
</template>

<script>
import { cameraInit } from '@/utils/js'
import VideoBooth from '@/components/Video/VideoBooth'
export default {
  components: {
    VideoBooth
  },
  mounted () {
    cameraInit('#video')
  }
}
</script>

<style lang="css">
</style>
