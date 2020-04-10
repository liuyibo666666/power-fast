<template>
  <el-menu-item class="side-bar-menu-item" :index="data.id">
    <i :class="data.icon?data.icon : 'no-icon'"></i>
    <span slot="title">{{ data.menuName }}</span>
  </el-menu-item>
</template>

<script>
  export default {
    name: 'SidebarItemMenu',
    props: {
      data: Object
    }
  };
</script>

<style lang="scss" scoped>
  .side-bar-menu-item{
    .no-icon{
      display: inline-block;
      width: 10px;
    }
  }
</style>
