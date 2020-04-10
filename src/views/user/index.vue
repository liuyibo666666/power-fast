<template>
<div class="user">
  <router-view/>
</div>
</template>

<script>
    export default {
        name: 'index'
    };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .user {
    width: 100%;
    height: 100%;
    @include scroll;
  }
</style>
