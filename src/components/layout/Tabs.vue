<template>
  <el-tabs v-model="currentTabId" type="card" class="layout-tabs" @tab-remove="closeTab">
    <el-tab-pane v-for="(item, index) in tabs"
                 :label="item.menuName"
                 :name="item.id"
                 :closable="index !== 0"
                 :key="item.id"></el-tab-pane>
  </el-tabs>
</template>

<script>
  import { layoutMixin } from '@/utils/mixin';

  export default {
    name: 'Tabs',
    mixins: [ layoutMixin ],
    computed: {
      currentTabId: {
        get() {
          return this.currentTab.id;
        },
        set(value) {
          this.setCurrentTab(this.findMenu(value));
        }
      }
    },
    watch: {
      currentTabId(t) {
        this.$router.push({
          path: this.findMenu(t).path
        });
      }
    },
    data() {
      return {};
    },
    methods: {
      /**
       * 关闭标签页
       * @param tabName
       */
      closeTab(tabName) {
        const tabs = this.tabs;
        for (let i = 0; i < tabs.length; i++) {
          if (tabName === tabs[ i ].id) {
            if (tabName === this.currentTab.id) {
              this.setCurrentTab(tabs[ i + 1 ] || tabs[ i - 1 ]);
            }
            // 说明 tabs 是 this.tabs(即 vuex 中 tabs)的引用,
            // 所以直接改变他的值, vuex 中的值也会相应的变化
            tabs.splice(i, 1);
            return;
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .layout-tabs {
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    width: 100%;
    height: 41px;
    /*padding: 0 20px;*/
    background: #fff;
  }

</style>
