<template>
  <div class="footer">
    <div class="copyright-text">test © 2020
      <a href="https://www.baidu.com/" target="_blank">{{ $t('footer.copyrightText') }}</a></div>
  </div>
</template>

<script>
  export default {
    name: 'CopyrightFooter'
  };
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    .copyright-text {
      width: 100%;
      font-size: 14px;
      color: #999;
      text-align: center;
      a{
        color: #1890ff;
        text-decoration: none;
      }
    }
  }
</style>
