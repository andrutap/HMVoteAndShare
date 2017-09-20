<template lang="html">
<main>
  <main-section></main-section>
</main>
</template>

<script>
import { fixBody } from '@/utils/js'
import MainSection from '@/components/Home/MainSection'
export default {
  components: {
    'main-section': MainSection
  },
  mounted () {
    fixBody()
  }
}
</script>

<style lang="css">
</style>
