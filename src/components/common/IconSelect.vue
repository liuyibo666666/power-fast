<template>
  <div class="icon-select">
    <el-row>
      <el-col :span="21">
        <div class="icon-input-wrapper">
          <input type="text" v-bind="$attrs"
                 :disabled="disabled"
                 ref="iconInput"
                 @input="$emit('input', $event.target.value)">
        </div>
      </el-col>
      <el-col :span="3">
        <el-popover
          width="800"
          popper-class="icon-select-popper"
          placement="left-end"
          v-model="isShowPopover"
          title="图标选择"
          trigger="click">
          <div class="icon-list-wrapper" @click="onSelectClick">
            <div class="icon"
                 v-for="(item, index) in iconList"
                 :data-value="item"
                 :class="item"
                 :key="index"></div>
          </div>
          <el-button slot="reference" :disabled="disabled" icon="el-icon-s-tools"></el-button>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'IconSelect',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShowPopover: false,
        iconList: [
          'el-icon-platform-eleme',
          'el-icon-eleme'
        ]
      };
    },
    methods: {
      onSelectClick(event) {
        this.isShowPopover = false;
        this.$emit('handleSelect', event.target.dataset.value);
      }
    }
  };
</script>

<style lang="scss">
  @import "~@/assets/styles/global";

  .icon-select-popper {
    max-height: 300px;
  }

  .icon-input-wrapper {
    width: 100%;
    height: 32px;
    input {
      width: 100%;
      height: 100%;
      padding-left: 15px;
      background: transparent;
      border: 1px solid #ccc;
      border-radius: 5px;
      color: #606266;
      &:focus {
        outline: $colorBlue solid 1px;
      }
      &:disabled{
        background-color: #F5F7FA;
        border-color: #E4E7ED;
        color: #C0C4CC;
        cursor: not-allowed;
      }
    }
  }

  .icon-list-wrapper {
    width: 100%;
    max-height: 300px;
    @include scroll;
    .icon {
      font-size: 20px;
      border: 1px solid #ccc;
      color: #555;
      margin: 5px;
      padding: 5px;
      cursor: pointer;
      &:hover {
        background: #555;
        color: #fff;
      }
    }
  }

  .el-button {
    border-left: none;
  }
</style>
