<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical"
             :collapse="sideCollapse"
             @select="onMenuSelect"
             :unique-opened="true"
             :default-active="currentTab.id">
      <div class="menu-item" v-for="item in data" :key="item.id">
        <sidebar-item :data="item"></sidebar-item>
      </div>
    </el-menu>

  </div>
</template>

<script>
  import { layoutMixin } from '@/utils/mixin';
  import SidebarItem from '@/components/layout/SidebarItem';

  export default {
    name: 'index',
    components: { SidebarItem },
    mixins: [ layoutMixin ],
    props: {
      data: Array
    },
    data() {
      return {};
    },
    methods: {
      onMenuSelect(key) {
        const menu = this.findMenu(key);
        this.setCurrentTab(menu);
        this.tabs.pushWithoutDuplicate([ menu ], 'id');
      }
    }
  };
</script>

<style scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
