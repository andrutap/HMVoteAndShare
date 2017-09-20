import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: '',
    didLogin: false,
    comesFrom: '',
    formFilled: false,
    tw_login: "https://apps.mingadigital.com/tw_login/",
    showModal: false,
    showModalLogin: false
  },
  getters: {
    showModal: state => {
      return state.showModal
    },
    showModalLogin: state => {
      return state.showModalLogin
    },
    didLogin: state => {
      return state.didLogin
    },
    comesFrom: state => {
      return state.comesFrom
    },
    userName: state => {
      return state.user
    },
    formFilled: state => {
      return state.formFilled
    }
  },
  mutations: {
    comesFrom: (state, payload) => {
      state.comesFrom = payload
    },
    updateLogin: (state, payload) => {
      state.didLogin = payload
    },
    getUserName: (state, payload) => {
      state.user = payload
    },
    isShowingModal: (state, payload) => {
      state.showModal = payload
    },
    isShowingModalLogin: (state, payload) => {
      state.showModalLogin = payload
    },
    formIsFilled: (state, payload) => {
      state.formFilled = payload
    }
  },
  actions: {
    comesFrom: ({ commit }, payload) => {
      commit('comesFrom', payload)
    },
    updateLogin: ({ commit }, payload) => {
      commit('updateLogin', payload)
    },
    getUserName: ({ commit }, payload) => {
      commit('getUserName', payload)
    },
    isShowingModal: ({ commit }, payload) => {
      commit('isShowingModal', payload)
    },
    isShowingModalLogin: ({ commit }, payload) => {
      commit('isShowingModalLogin', payload)
    },
    formIsFilled: ({ commit }, payload) => {
      commit('formIsFilled', payload)
    }
  }
})
