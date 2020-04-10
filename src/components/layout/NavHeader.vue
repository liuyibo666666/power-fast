<template>
  <div class="nav-header">
    <div class="nav-left">
      <div class="menu-fold-icon-wrapper" @click="sidebarCollapse">
        <span class="el-icon-s-fold"></span>
      </div>
      <div class="welcom-text-wrapper">
        <span class="welcom-text">{{ $t('layout.welcomText') }}</span>
      </div>
    </div>
    <div class="nav-right">
      <div class="nav-search">
        <div class="nav-search-icon-wrapper" :class="{'icon-position':isShowSearch }">
          <span class="el-icon-search" @click="toggleSearch"></span>
        </div>
        <transition name="el-zoom-in-center">
          <div class="nav-search-input-wrapper" v-show="isShowSearch">
            <div class="nav-search-input">
              <input :placeholder="$t('layout.searchMenu')" type="text"
                     v-model="searchMenu"
                     @click="handleFocus"
                     @input="onInputChange"
                     ref="navSearchInput">
            </div>
            <el-autocomplete
              class="nav-search-input-hiden"
              v-model="searchMenu"
              size="large"
              :fetch-suggestions="querySearch"
              placeholder="搜索菜单"
              @select="doSearch"
              ref="elAutocomplete">
            </el-autocomplete>
          </div>
        </transition>
      </div>
      <el-dropdown class="user-dropdown-wrapper" trigger="click"
                   @command="handleDropdown">
        <div class="user-wrapper">
          <div class="avatar-wrapper">
            <el-avatar class="avatar-img" :size="'medium'"
                       :src="userInfo.avatar"></el-avatar>
          </div>
          <div class="username">
            <span>{{ userInfo.realName }}</span>
          </div>
          <div class="icon-wrapper">
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <el-dropdown-menu class="user-dropdown-menu" slot="dropdown">
          <el-dropdown-item icon="el-icon-setting"
                            class="user-dropdown-menu-item"
                            command="1">{{ $t('layout.dropdownMenu.systemSetting') }}
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button"
                            class="user-dropdown-menu-item"
                            command="2">{{ $t('layout.dropdownMenu.logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--系统设置对话框-->
      <div class="system-settings-dialog">
        <el-dialog :title="$t('layout.dropdownMenu.systemSetting')" :visible.sync="systemSettingsDialogVisible">
          <div class="language-wrapper">
            <language></language>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import { layoutMixin, userMixin } from '@/utils/mixin';
  import {
    removeAccessToken,
    getAccessToken,
    removeUserInfo,
    removePermissionList,
    getUserInfo
  } from '@/utils/localStorage';
  import { searchMenuList } from '@/api/user';
  import { findMenuByProperty } from '@/utils/utils';
  import Language from '@/components/common/Language';

  export default {
    name: 'NavHeader',
    components: { Language },
    mixins: [ layoutMixin, userMixin ],
    data() {
      return {
        menus: [],
        searchMenu: '',
        isShowSearch: false,
        systemSettingsDialogVisible: false
      };
    },
    methods: {
      sidebarCollapse() {
        this.setSideCollapse(!this.sideCollapse);
      },
      /**
       * 注销登录
       */
      logout() {
        this.$confirm(this.$t('layout.logoutConfirm.logoutConfirmText'),
          this.$t('layout.logoutConfirm.title'), {
            confirmButtonText: this.$t('user.yes'),
            cancelButtonText: this.$t('user.cancel'),
            type: 'warning'
          }).then(() => {
          // 清除 token
          removeAccessToken();
          // 清除缓存的用户信息
          removeUserInfo();
          // 清空权限菜单列表
          removePermissionList();
          this.setPermissionList(null);
          this.$router.push({
            path: '/user/login',
            query: {
              redirect: '/'
            }
          });
        }).catch(() => {
        });
      },
      handleDropdown(item) {
        switch (Number(item)) {
          case 1:
            this.systemSettingsDialogVisible = true;
            break;
          case 2:
            this.logout();
            break;
          default:
            break;
        }
      },
      /**
       * 显示搜索框
       */
      toggleSearch() {
        if (!this.isShowSearch) {
          this.searchMenu = '';
          this.isShowSearch = true;
          return;
        }
        this.hideSearch();
      },
      /**
       * 隐藏搜索框
       */
      hideSearch() {
        setTimeout(() => {
          this.isShowSearch = false;
        }, 100);
      },
      handleFocus() {
        this.$refs.elAutocomplete.handleFocus();
      },
      onInputChange() {
        this.$refs.elAutocomplete.getData(this.searchMenu);
      },
      /**
       * 搜索建议
       * @param queryString
       * @param cb
       */
      querySearch(queryString, cb) {
        var menus = this.menus;
        var results = queryString ? menus.filter(this.createFilter(queryString)) : menus;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (menu) => {
          return (menu.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadSearchMenuPropose() {
        const token = getAccessToken();
        searchMenuList({
          token
        }).then(response => {
          this.menus = response.data.data;
        });
      },
      doSearch(item) {
        const menu = findMenuByProperty(item.id, 'id');
        if (menu) {
          this.setCurrentTab(menu);
          this.tabs.pushWithoutDuplicate([ menu ], 'id');
        }
      }
    },
    created() {
      this.loadSearchMenuPropose();
      if (this.userInfo) {
        return;
      }
      this.setUserInfo(getUserInfo());
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global.scss";

  .nav-header {
    width: 100%;
    height: 100%;
    background: $colorBlue;
    @include leftAndRight;
    .nav-left {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      .menu-fold-icon-wrapper {
        width: 50px;
        height: 100%;
        font-size: 25px;
        color: #fff;
        font-weight: lighter;
        @include center;
        .el-icon-s-fold {
          padding: 10px;
          &:hover {
            background: $hoverBackground;
          }
        }
      }
      .welcom-text-wrapper {
        height: 100%;
        margin-left: 10px;
        color: #fff;
        font-size: 14px;
        @include center;
      }
    }
    .nav-right {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      padding-right: 50px;
      .nav-search {
        width: 240px;
        position: relative;
        .nav-search-icon-wrapper {
          width: 40px;
          height: 100%;
          font-size: 16px;
          color: #fff;
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 150;
          transition: right $animationTime $animationType;
          @include center;
          &.icon-position {
            right: 200px;
            bottom: 0;
          }
          .el-icon-search {
            padding: 10px;
            &:hover {
              background: $hoverBackground;
            }
          }
        }
        .nav-search-input-wrapper {
          height: 100%;
          position: relative;
          @include right;
          .nav-search-input {
            position: absolute;
            z-index: 100;
            width: 200px;
            height: 30px;
            background: $colorBlue;
            border-bottom: 1px solid #fff;
            border-radius: 10px;
            input {
              width: 100%;
              height: 100%;
              padding: 10px;
              border: none;
              background: transparent;
              cursor: pointer;
              color: #fff;
              &:focus {
                outline: none;
              }
              &::-webkit-input-placeholder {
                color: #fff;
              }
            }
          }
          .nav-search-input-hiden {
            position: absolute;
            z-index: 0;
            opacity: 0;
            pointer-events: none;
          }
        }
      }
      .user-dropdown-wrapper {
        &:hover {
          background: $hoverBackground;
          cursor: pointer;
        }
        .user-wrapper {
          padding: 0 10px;
          height: 100%;
          @include center;
          .avatar-wrapper {
            height: 100%;
            padding: 0 10px;
            @include center;
          }
          .username {
            height: 100%;
            color: #fff;
            padding: 0 10px;
            @include center;
          }
          .icon-wrapper {
            height: 100%;
            width: 5px;
            color: #fff;
            @include center;
          }
        }
      }
    }
  }

  .user-dropdown-menu {
    padding: 10px;
    .user-dropdown-menu-item {
      width: 100%;
      height: 30px;
      padding: 5px;
      margin: 5px;
      @include left;
    }
  }
</style>
