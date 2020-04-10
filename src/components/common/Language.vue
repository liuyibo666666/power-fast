<template>
  <div class="language">
    <span class="language-text">{{ $t('user.language')}}</span>
    <el-switch
      v-model="language"
      active-color="#13ce66"
      inactive-color="#409EFF"
      :active-text="$t('user.en')"
      :inactive-text="$t('user.cn')"
      active-value="en"
      inactive-value="cn"
      @change="change">
    </el-switch>
  </div>
</template>

<script>
  import { getLocale, saveLocale } from '@/utils/localStorage';

  export default {
    name: 'Language',
    data() {
      return {
        language: 'en'
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.language = getLocale();
      },
      change() {
        this.$confirm(this.$t('user.languageTips'), this.$t('user.languageTitle'), {
          confirmButtonText: this.$t('user.yes'),
          cancelButtonText: this.$t('user.cancel'),
          type: 'warning'
        }).then(() => {
          saveLocale(this.language);
          this.$message({
            type: 'success',
            message: this.$t('user.switchLanguageSuccess')
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 1000);
        }).catch(() => {
          this.language = getLocale();
          this.$message({
            type: 'info',
            message: this.$t('user.switchLanguageCancel')
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .language {
    height: 20px;
    line-height: 20px;
    .language-text {
      font-size: 14px;
      margin-right: 10px;
    }
    .el-switch {
      margin-top: -1px;
    }
  }
</style>
