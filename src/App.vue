<template>
  <div class="app-container">
    <Header />
    <div style="margin-top: 16px;"></div>
    <TypeNav v-if="$route.path.startsWith('/home')" />
    <router-view /> 
    <Footer v-show="$route.meta?.showFoot !== false" />
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
import TypeNav from '@/pages/Home/TypeNav/index.vue'
import Map from '@/pages/Map/index.vue'

export default {
  name: 'App',
  components: { Header, Footer, TypeNav ,Map }
}
</script>

<style>


</style>
