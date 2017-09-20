<template>
  <div id="app">
    <navigation></navigation>
    <keep-alive>
    <router-view>Cargando...</router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   window.fbAsyncInit = function() {
   FB.init({
     appId      : '1196810757132230',
     xfbml      : true,
     version    : 'v2.10'
   });
   FB.AppEvents.logPageView();
 }
  }
}
</script>

<style>

</style>
