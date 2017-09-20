import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Upload from '@/pages/Upload'
import Edit from '@/pages/Edit'
import Share from '@/pages/Share'
import Photoboot from '@/pages/Photoboot'
import Form from '@/pages/Form'
import Vote from '@/pages/Vote'
import Photo from '@/pages/Photo'
Vue.use(Router)

export default new Router({
  base: window.location.pathName,
  //mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/vote',
      name: 'Vote',
      component: Vote
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/start',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/share',
      name: 'Share',
      component: Share
    },
    {
      path: '/photoboot',
      name: 'Photoboot',
      component: Photoboot
    },
    {
      path: '/photo/:photoId',
      name: 'photo',
      component: Photo
    }
  ]
})
