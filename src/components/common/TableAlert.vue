<template>
  <div class="table-alert">
    <span v-html="selected"></span>
    <el-button size="medium" type="text" @click="onClear">{{ $t('system.clear') }}</el-button>
  </div>
</template>

<script>
  import { systemMixin } from '@/utils/mixin';

  export default {
    name: 'TableAlert',
    mixins: [ systemMixin ],
    computed: {
      selected() {
        const nmb = this.multipleSelection.length;
        if (nmb === 1) {
          return this.$t('system.selected1').replace('$1', `<span style="color: #1890ff;">${nmb}</span>`);
        }
        return this.$t('system.selected2').replace('$1', `<span style="color: #1890ff;">${nmb}</span>`);
      }
    },
    data() {
      return {};
    },
    methods: {
      onClear() {
        this.$emit('clear-select');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global";

  .table-alert {
    width: 100%;
    height: 40px;
    border: 1px solid #91d5ff;
    border-radius: 5px;
    padding-left: 30px;
    font-size: 15px;
    background: #e6f7ff;
    color: #4d4d4d;
    line-height: 40px;
    .number {
      color: $colorBlue;
    }
    .el-button {
      margin-left: 30px;
      font-size: 15px;
    }
  }
</style>
