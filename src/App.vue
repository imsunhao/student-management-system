<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style>
@import '~normalize.css';
@import '~element-ui/lib/theme-chalk/index.css';
</style>

<script>
export default {
  name: 'App',
}
</script>
