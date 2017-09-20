<template lang="html">
  <section class="main">
    <div class="box shadow is-default text is-center">
      <top></top>
      <div class="row">
        <div class="tile is-gapless">
          <h3 class="subheadline">¡Ellos ya están participando! ¡Solo faltas tú!</h3>
          <ul class="horizontal-list">
            <li v-for="(pic, i) in galleryDb" key="pic" v-if="i < 6">
              <card :id="pic.id">
                <img slot="card-image" class="is-card-image-source-big" :src="pic.src" :alt="pic.name"/>
                <span slot="card-name">{{ pic.name }}</span>
                <template slot="card-votes">
                  {{ pic.votes }}
                </template>
              </card>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="tile">
          <button class="button is-flat is-small" v-if="!didLogin" @click="showLogin">Mira más fotos</button>
          <button class="button is-flat is-small" v-if="didLogin" @click="goToVote">Vota aquí</button>
        </div>
      </div>
      <div class="row">
        <div class="tile">
          <button class="button is-flat is-small scrollable" @click="showInstructions">
            ¿Cómo participar?
          </button>
        </div>
      </div>
      <div class="row">
        <div class="tile">
          <button v-if="!didLogin" class="button is-primary" @click="showLogin">Participar</button>
          <button v-else class="button is-primary" @click="goToUpload">Subir foto</button>
        </div>
      </div>
    </div>
    <modal v-if="showModal" :class="{'is-big': !showModalLogin}">
      <template v-if="showModalLogin">
        <h2 slot="modal-heading" class="text is-serif is-light">Regístrate</h2>
        <template slot="modal-body">
          <form class="form is-inline">
            <legend>
              Participa ingresando con facebook o twitter
            </legend>
            <div class="is-form-object">
              <button class="button is-facebook is-small" @click="fbLogin">
                Ingresar con facebook
              </button>
            </div>
            <div class="is-form-object">
              <button type="button" class="button is-small is-twitter" @click="twLogin">Ingresar con twitter</button>
            </div>
          </form>
        </template>
      </template>
      <template v-else>
        <h2 slot="modal-heading" class="text is-light is-serif band">¿Cómo participar?</h2>
        <template slot="modal-body">
          <div class="row">
            <div class="tile">
              <ul class="horizontal-list ins-list">
                <li>
                  <span class="instructions-head">Sube tu foto</span> y participa por entradas dobles a nuestro evento VIP el miércoles 11 de octubre. Los dos (2) ganadores más votados serán los ganadores.
                </li>
                <li>
                  <span class="instructions-head">Vota por tu foto favorita</span> y entre todos los que voten sortearemos dos (2) entradas dobles para nuestro VIP el miércoles 11 de octubre.
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template slot="modal-footer">
          <div class="form is-inline">
            <div class="is-form-object">
              <button @click="goFromInstructions" class="button is-primary">Participar</button>
            </div>
          </div>
        </template>
      </template>
    </modal>
  </section>
</template>

<script>
import { eventBus } from '@/main'
import { fixBody, updateHeartCount } from '@/utils/js'
import { twLogin, checkLogin, Omer, fbLogin, statusChangeCallback, loginToFacebook } from '@/utils/login'
import { mapGetters, mapActions } from 'vuex'
import { firebase } from 'firebase'
import { db } from '@/utils/firebase'
export default {
  firebase: {
    galleryDb: db.ref('gallery')
  },
  methods: {
    ...mapActions([
      'comesFrom',
      'updateLogin',
      'isShowingModalLogin',
      'isShowingModal'
    ]),
    showLogin() {
      this.isShowingModal(true)
      this.isShowingModalLogin(true)
    },
    showInstructions () {
      this.isShowingModal(true)
      this.isShowingModalLogin(false)
    },
    fbLogin () {
      this.comesFrom('facebook')
      loginToFacebook()
      FB.getLoginStatus((response) => {
        if(response.status === 'connected') {
          this.updateLogin(true);
          this.isShowingModalLogin(false)
          this.$router.push('/form')
        } else {

        }
      })
    },
    twLogin () {
      this.comesFrom('twitter')
      window.open(this.$store.state.tw_login)
      this.getData();
    },
    getData () {
      var _this = this
      window.addEventListener('hashchange', function(){
        if(window.location.hash.indexOf('tw_ok') > 0 ) {
          _this.updateLogin(true)
          _this.isShowingModalLogin(false)
          _this.$router.push('form')
        //  window.location.hash = ''
        }
      })
    },
    goFromInstructions () {
      if (!this.$store.state.didLogin) {
        this.isShowingModalLogin(true)
      } else {
        this.$router.push('/form')
      }
    },
    goToUpload () {
      if (this.$store.state.formFilled) {
        this.$router.push('/start')
      } else {
        this.$router.push('/form')
      }
    },
    goToVote () {
      if (this.$store.state.formFilled) {
        this.$router.push('/vote')
      } else {
        this.$router.push('/form')
      }
    }
  },
  updated () {
    fixBody()
  },
  computed: {
    ...mapGetters([
      'didLogin',
      'showModalLogin',
      'showModal',
      'formFilled'
    ])
  }
}

</script>

<style lang="css">
</style>
