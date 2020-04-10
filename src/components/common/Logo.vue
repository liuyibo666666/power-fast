<template>
  <div class="logo" :style="{'height':imgSize}">
    <img class="logo-img" src="../../assets/logo.png">
    <transition name="el-zoom-in-center">
    <span class="logo-text" v-show="isShowLogoText"
          :style="{'font-size':fontSize,
                    'color': color,
                    'font-weight': fontWeight ? 'bold' : 'normal'}">Power-fast</span>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      color: {
        type: String,
        default: '#000'
      },
      size: {
        type: String,
        default: 'large'
      },
      fontWeight: {
        type: Boolean,
        default: false
      },
      isShowLogoText: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      fontSize() {
        if (this.size === 'small') {
          return '16px';
        } else {
          return '30px';
        }
      },
      imgSize() {
        if (this.size === 'small') {
          return '32px';
        } else {
          return '45px';
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global.scss";

  .logo {
    width: 100%;
    @include center;
    .logo-img {
      height: 100%;
      margin-right: 10px;
    }
  }
</style>
