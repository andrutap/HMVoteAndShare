<template lang="html">
  <section class="main">
    <div class="box">
      <div class="row">
        <user-picture></user-picture>
        <div class="tile">
          <edit-picture></edit-picture>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fixBody } from '@/utils/js'
import UserPicture from '@/components/Picture/UserPicture'
import EditPicture from '@/components/Picture/EditPicture'
export default {
  components: {
    'user-picture': UserPicture,
    'edit-picture': EditPicture
  },
  mounted () {
    fixBody()
  }
}
</script>

<style lang="css">
</style>
