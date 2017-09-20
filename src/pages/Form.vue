<template lang="html">
  <section class="main">
    <div class="box shadow is-default text is-center">
      <top></top>
      <div class="row">
        <div class="tile">
          <form class="form">
            <legend>
              Completa el formulario para participar
            </legend>
            <div class="is-form-object">
              <label>Nombre:</label>
              <input type="text" name="first_name" placeholder="Ej. María González" required v-model="user"/>
            </div>
            <div class="is-form-object">
              <label>Rut:</label>
              <input type="text" name="rut" placeholder="12345678-9" required  v-model="rut" @input="valida" />
            </div>
            <div class="is-form-object">
              <label>Email:</label>
              <input type="mail" name="email" placeholder="tucorreo@email.com" required v-model="email" />
            </div>
            <div class="is-form-object">
              <label>Teléfono:</label>
              <input type="tel" name="phone" placeholder="912345678" required v-model="phone"/>
            </div>
            <div class="is-form-object">
              <label><input type="checkbox" v-model="checked"/> Acepto <a href="#">Términos y Condiciones</a></label>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="tile is-gapless">
        </div>
        <div class="tile is-7 shadow is-default">
          <div class="row">
            <div class="tile">
              <button @click="goToUpload" class="button is-primary" disabled>Participa subiendo tu foto</button>
              <small><span class="instructions-head">Sube tu foto</span> y participa por entradas dobles a nuestro evento VIP el miércoles 11 de octubre. Los dos (2) más votados serán los ganadores.</small>
            </div>
            <div class="tile">
              <button @click="gotToVote" class="button is-primary" disabled>Participa votando</button>
              <small><span class="instructions-head">Vota por tu foto favorita.</span> Y entre todos los que voten sortearemos dos (2) entradas dobles para nuestro VIP el miércoles 11 de octubre.</small>
            </div>
          </div>
        </div>
        <div class="tile">

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus } from '@/main'
import { fixBody } from '@/utils/js'
import { Omer, statusChangeCallback } from '@/utils/login'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      checked: null,
      rut: undefined,
      email: undefined,
      phone: undefined,
      rutValid: false
    }
  },
  methods: {
    ...mapActions([
      'getUserName',
      'formIsFilled'
    ]),
    goToUpload () {
      if(this.user != null && this.rutValid && this.email != null && this.phone != null && this.checked) {
        this.formIsFilled(true)
        this.disableInputs()
        this.fixModal()
        this.$router.push('/start')
      } else {
        if (this.rutValid === false) {
          alert('hay un error en el rut')
        }
      }
    },
    gotToVote () {
      var _this = this
      if(this.user != null && this.rutValid && this.email != null && this.phone != null && this.checked) {
        this.formIsFilled(true)
        this.disableInputs()
        this.fixModal()
        this.$router.push('/vote')
      } else {
        if (this.rutValid === false) {
          alert('hay un error en el rut')
        }
      }
    },
    disableInputs () {
      var inputs = document.querySelectorAll('input')
      var len = inputs.length
      for(var i = 0; i < len; i++) {
        inputs[i].disabled = true
      }
    },
    fixModal () {
      this.$store.dispatch('isShowingModal', false)
    },
    validaRut (rut) {
      if (!/^[0-9]+[–|-]{1}[0-9kK]{1}$/.test(rut)) {
        return false
      }
      var tmp = rut.split('-')
      var dV = tmp[1]
      var rt = tmp[0]
      if (dV == 'K') {
        dV == 'k'
      }
      return (this.ver(rt) == dV)
    },
    ver (T) {
      var M = 0, S = 1
      for(; T ; T = Math.floor(T/10)) {
        S = (S + T % 10 * (9 - M++%6)) % 11
      }
      return S ? S - 1 : 'k'
    },
    valida (e) {
      this.rutValid = this.validaRut(e.target.value)
    }
  },
  mounted () {
    fixBody()
    var _this = this
    if(this.$store.state.comesFrom === 'facebook') {
      FB.getLoginStatus((response) => {
        if (response.status = 'connected') {
          FB.api('/me', {fields: 'id, link, picture, first_name, last_name, email'}, (resp) => {
            _this.getUserName(resp.first_name + ' ' + resp.last_name)
            _this.email = resp.email
          })
        } else {

        }
      })
    } else if (this.$store.state.comesFrom === 'twitter') {
      var test = new Omer(this.$store.state.tw_login + 'profile.php?callback=ajpRsp', {})
      test.then(function(data){
          _this.user = data.first_name
        }).catch(function(error) {
          console.error('Failed!', error);
      })
    }
  },
  updated () {
    var buttons = document.querySelectorAll('.button')
    for (var i  = 0; i < buttons.length; i++) {
      if (this.user != null && this.rut != null && this.email != null && this.phone != null && this.checked) {
        buttons[i].disabled = false;
      } else {
        buttons[i].disabled = true;
      }
    }
  },
  computed: {
    ...mapGetters([
      'didLogin',
      'comesFrom',
      'userName',
      'formFilled'
    ]),
    user: {
      get() {
        return this.$store.getters.userName
      },
      set(user) {
        this.getUserName(user)
      }
    }
  }
}
</script>

<style lang="css">
</style>
