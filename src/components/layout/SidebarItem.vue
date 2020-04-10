<template>
  <div class="sidebar-item">
    <sidebar-item-submenus :data="data" v-if="data.submenuList && data.submenuList.length > 0">
    </sidebar-item-submenus>
    <sidebar-item-menu :data="data" v-else></sidebar-item-menu>
  </div>
</template>

<script>
  import SidebarItemMenu from '@/components/layout/SidebarItemMenu';
  import SidebarItemSubmenus from '@/components/layout/SidebarItemSubmenus';

  export default {
    name: 'SidebarItem',
    components: { SidebarItemSubmenus, SidebarItemMenu },
    props: {
      data: Object
    }
  };
</script>

<style scoped>

</style>
