<template>
  <el-container class="layout-container">
    <!--侧边栏-->
    <el-aside class="layout-left-side" :width="sideCollapse ? '100' : '200'">
      <!--logo-->
      <div class="side-logo-wrapper">
        <logo :color="'#fff'" :size="'small'"
              :fontWeight="true" :isShowLogoText="!sideCollapse"></logo>
      </div>
      <!--侧边栏菜单-->
      <el-container class="layout-inner-container">
        <div class="side-menu-wrapper">
          <sidebar :data="permissionList"></sidebar>
        </div>
      </el-container>
    </el-aside>
    <el-container class="layout-right-container">
      <!--头部 navbar-->
      <el-header height="60px" class="layout-header">
        <nav-header></nav-header>
      </el-header>
      <el-container class="layout-inner-container">
        <!--主体部分-->
        <el-main class="layout-main">
          <tabs></tabs>
          <main-view></main-view>
        </el-main>
        <!--底部版权-->
        <el-footer class="layout-footer">
          <copyright-footer></copyright-footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>

</template>

<script>
  import NavHeader from '@/components/layout/NavHeader';
  import Sidebar from '@/components/layout/Sidebar';
  import CopyrightFooter from '@/components/common/CopyrightFooter';
  import Logo from '@/components/common/Logo';
  import { layoutMixin, userMixin } from '@/utils/mixin';
  import Tabs from '@/components/layout/Tabs';
  import MainView from '@/components/layout/MainView';

  export default {
    name: 'index',
    mixins: [ layoutMixin, userMixin ],
    data() {
      return {
      };
    },
    methods: {},
    components: {
      MainView,
      Tabs,
      Logo,
      CopyrightFooter,
      NavHeader,
      Sidebar
    }
  }
  ;
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global.scss";

  .layout-container {
    width: 100%;
    height: 100%;
    background: $coloGrey;
    .layout-left-side {
      position: relative;
      height: 100%;
      overflow: visible;
      background: #fff;
      padding-top: 60px;
      .side-logo-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        background: $colorBlue;
        @include center;
      }
    }
    .layout-right-container {
      .layout-header {
        padding: 0;
      }
      .layout-main {
        height: 100%;
        padding: 0;
        overflow: visible;
      }
      .layout-footer {
        margin-top: 50px;
        padding: 60px 0;
      }
    }
    .layout-inner-container {
      width: 100%;
      height: 100%;
      @include scroll;
    }
  }
</style>
