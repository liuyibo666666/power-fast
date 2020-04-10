<template>
  <div class="layout-main-view">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'MainView'
    };
</script>

<style lang="scss" scoped>
  .layout-main-view {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
</style>
