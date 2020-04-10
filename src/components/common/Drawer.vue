<template>
  <el-drawer
    :title="drawerTitle"
    :before-close="handleClose"
    :visible.sync="isShowDrawer"
    direction="rtl"
    size="50%"
    custom-class="drawer-wrapper"
    ref="drawer">
    <div class="drawer-content">
      <slot></slot>
      <div class="drawer-footer">
        <el-button @click="cancelForm">{{ $t('user.cancel') }}</el-button>
        <el-button type="primary" @click="onSave"
                   :loading="isBtnLoading"
                   :disabled="formDisabled">
          {{ isBtnLoading ? $t('system.submitting') : $t('user.yes') }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  import { systemMixin } from '@/utils/mixin';

  export default {
    name: 'Drawer',
    mixins: [ systemMixin ],
    data() {
      return {};
    },
    methods: {
      /**
       * 保存
       */
      onSave() {
        this.$emit('save-click');
      },
      /**
       * 关闭
       * @param done
       */
      handleClose(done) {
        if (this.isBtnLoading) {
          return;
        }
        this.setIsShowDrawer(false);
      },
      /**
       * 取消
       */
      cancelForm() {
        this.setIsShowDrawer(false);
      }
    }
  };
</script>

<style lang="scss">
  @import "~@/assets/styles/global";

  .el-drawer__header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 0;
    span {
      color: #333;
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
  }

  .el-drawer__body {
    @include scroll;
    .drawer-content {
      width: 100%;
      height: 100%;
      margin: 20px;
      padding: 30px;
      border: 1px solid #eee;
      .drawer-footer {
        width: 100%;
        height: 60px;
        padding: 0 20px 20px 0;
        @include right;
      }
    }
  }
</style>
