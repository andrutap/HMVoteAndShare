<template lang="html">
  <section class="main pictures" id="pictures">
    <div class="box shadow is-default">
      <top></top>
      <div class="row">
        <div class="tile text is-center">
          <h5 class="text is-uppercase"><u>Vota por tu foto favorita</u></h5>
        </div>
      </div>
      <div class="row">
        <div class="tile">
          <div class="gallery">
            <ul class="horizontal-list">
              <li v-for="(pic, i) in galleryDb" key="pic" v-if="i < len">
                <card :id="pic.id">
                  <template slot="card-image">
                    <img class="is-card-image-source-big" :src="pic.src" :alt="pic.name" />
                  </template>
                  <template slot="card-name">
                    <span>{{ pic.name }}</span>
                  </template>
                  <template slot="card-votes">
                    {{ pic.votes }}
                  </template>
                </card>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="tile text is-center">
          <div class="button-list">
            <button class="button is-primary" @click="loadMore" id="loadButton">Cargar más fotos</button>
            <router-link to="/start" class="button is-flat" tag="button">Sube tu foto</router-link>
          </div>
        </div>
      </div>
    </div>
    <modal v-if="showModal">
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
    </modal>
  </section>
</template>

<script>
import {updateHeartCount, fixBody} from '@/utils/js'
import firebase from 'firebase'
import { db } from '@/utils/firebase'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      len: 12,
    }
  },
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
    updateHeartCount (e) {
      var holder = e.target;
      var counter = 0;
      if (holder.querySelectorAll('.heart, .counter')) {
        var heart = holder.querySelector('.heart');
        heart.classList.add('animated');
      }
    },
    loadMore (e) {
      if (this.galleryDb.length > this.len) {
        this.len += 12
        e.target.textContent = 'Cargar más fotos'
      } else {
        e.target.disabled = true;
        e.target.textContent = 'No hay más fotos'
      }
    },
    showLogin() {
      this.isShowingModal(true)
      this.isShowingModalLogin(true)
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
    }
  },
  mounted () {
      this.len = 12
      if(this.len === 12) {
        var btn = document.querySelector('#loadButton')
        btn.disabled = false;
        btn.textContent  = 'Cargar más fotos'
      }
    fixBody()
  },
  computed: {
    ...mapGetters([
      'didLogin',
      'showModal',
      'showModalLogin'
    ])
  }
}
</script>

<style lang="css">
</style>
