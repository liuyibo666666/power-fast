<template>
  <el-submenu :index="data.id">
    <template slot="title">
      <i :class="data.icon"></i>
      <span slot="title" :class="{'hiden': sideCollapse}">{{ data.menuName }}</span>
    </template>
    <el-menu-item-group>
      <div class="submenu-item"  v-for="item in data.submenuList" :key="item.id">
        <sidebar-item-menu :data="item"></sidebar-item-menu>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
  import { layoutMixin } from '@/utils/mixin';
  import SidebarItemMenu from '@/components/layout/SidebarItemMenu';

  export default {
    name: 'SidebarItemSubmenus',
    components: { SidebarItemMenu },
    mixins: [ layoutMixin ],
    props: {
      data: Object
    }
  };
</script>

<style lang="scss" scoped>
  span.hiden {
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
</style>
