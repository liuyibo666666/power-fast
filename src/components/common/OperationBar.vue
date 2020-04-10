<template>
  <div class="operation-bar">
    <div class="operation-btn-wrapper" v-if="operationAdd">
      <el-button type="primary" size="small"
                 @click="onAddClick"
                 icon="el-icon-plus">{{ $t('system.newAdd') }}
      </el-button>
    </div>
    <div class="operation-btn-wrapper" v-if="operationDelete && multipleSelection.length > 0">
      <el-button type="danger" size="small"
                 @click="onDeleteClick"
                 icon="el-icon-delete">{{ $t('system.batchdelet') }}
      </el-button>
    </div>
  </div>
</template>

<script>
  import { systemMixin } from '@/utils/mixin';

  export default {
    name: 'OperationBar',
    mixins: [ systemMixin ],
    props: {
      operationAdd: {
        type: Boolean,
        default: false
      },
      operationDelete: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onAddClick() {
        this.setDrawerTitle(this.$t('system.newAdd'));
        this.setIsShowDrawer(true);
      },
      onDeleteClick() {
        this.$confirm(this.$t('system.deleteTips'), this.$t('system.tipsTitle'), {
          confirmButtonText: this.$t('user.yes'),
          cancelButtonText: this.$t('user.cancel'),
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach(select => {
            this.setPropertyDataList({
              dataList: this.propertyDataList.dataList.filter(item => item.id !== select.id)
            });
          });
          this.setMultipleSelection([]);
          this.$message({
            type: 'success',
            message: this.$t('system.deleteSuccess')
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('system.deleteCancel')
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global";

  .operation-bar {
    width: 100%;
    @include left;
    .operation-btn-wrapper {
      margin: 0 20px 20px 0;
    }
  }
</style>
