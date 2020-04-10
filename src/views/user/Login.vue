<template>
  <el-container class="login-container">
    <el-header>
      <div class="login-logo">
        <logo></logo>
      </div>
      <!--描述-->
      <div class="login-des">
        <span class="login-des-text">{{ $t('user.describeText') }}</span>
      </div>
    </el-header>
    <el-main>
      <!--登录表单-->
      <el-form :model="loginForm" :rules="rules"
               class="login-form" ref="loginForm"
               @keyup.enter.native.exact="login">
        <!--用户名-->
        <el-form-item class="login-form-input-wrapper"
                      prop="username">
          <el-input v-model="loginForm.username"
                    :placeholder="$t('user.usernamePlaceholder')"
                    clearable class="login-form-input">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item class="login-form-input-wrapper"
                      prop="password">
          <el-input v-model="loginForm.password"
                    :placeholder="$t('user.passwordPlaceholder')"
                    clearable type="password"
                    show-password>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <!--验证码-->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item class="login-form-input-wrapper"
                          prop="code">
              <el-input v-model="loginForm.code"
                        :placeholder="$t('user.codePlaceholder')"
                        clearable>
                <i slot="prefix" class="el-input__icon el-icon-s-check"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <img class="login-code-img" src="../../assets/images/code.jpg">
          </el-col>
        </el-row>
      </el-form>
      <!--自动登录-->
      <div class="automatic-logon">
        <el-checkbox v-model="isAutomaticLogin">{{ $t('user.remember') }}</el-checkbox>
      </div>
      <div class="login-btn-wrapper">
        <el-button class="login-btn" :loading="isLoging" type="primary"
                   @click="login">{{ $t('user.login') }}
        </el-button>
      </div>
    </el-main>
    <el-footer>
      <copyright-footer></copyright-footer>
    </el-footer>
    <div class="language-wrapper">
      <language></language>
    </div>
  </el-container>

</template>

<script>
  import CopyrightFooter from '@/components/common/CopyrightFooter.vue';
  import { login, userInfo, userMenuList } from '@/api/user';
  import {
    saveAccessToken,
    saveUserInfo,
    getAccessToken,
    savePermissionList,
    saveLoginUser,
    getLoginUser,
    removeLoginUser
  } from '@/utils/localStorage';
  import Logo from '@/components/common/Logo';
  import { userMixin } from '@/utils/mixin';
  import Language from '@/components/common/Language';

  export default {
    name: 'Login',
    mixins: [ userMixin ],
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          code: ''
        },
        isLoging: false,
        rules: {
          username: [
            { required: true, message: this.$t('user.usernamePlaceholder'), trigger: 'blur' }
          ],
          password: [
            { required: true, message: this.$t('user.passwordPlaceholder'), trigger: 'blur' }
          ],
          code: [
            { required: true, message: this.$t('user.codePlaceholder'), trigger: 'blur' }
          ]
        },
        isAutomaticLogin: true
      };
    },
    created() {
      this.initUsernameAndpassword();
    },
    methods: {
      rememberUsernameAndpassword() {
        saveLoginUser(this.loginForm.username, this.loginForm.password);
      },
      /**
       * 从缓存中拿到登录名密码
       */
      initUsernameAndpassword() {
        const user = getLoginUser();
        if (!user) {
          this.isAutomaticLogin = false;
          return;
        }
        this.loginForm.username = user.c_u || '';
        this.loginForm.password = user.c_p || '';
        this.isAutomaticLogin = true;
      },
      /**
       * 登录
       */
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.isLoging = true;
          if (this.isAutomaticLogin) {
            this.rememberUsernameAndpassword();
          } else if (getLoginUser()) {
            removeLoginUser();
          }
          login({
            username: this.loginForm.username,
            password: this.loginForm.password,
            code: this.loginForm.code
          }).then(response => {
            // 登录失败
            if (response.data.code === 105) {
              this.$notify.error({
                title: this.$t('user.loginFailed'),
                message: response.data.message
              });
              this.isLoging = false;
              return;
            }
            // 登录成功
            const token = response.data.data.token;
            // 缓存 token
            saveAccessToken(token);
            // 根据 token 获取用户信息
            return this.getUserInfo(token);
          }).then(() => {
            // 获取权限菜单
            return this.getMenuList();
          }).then(() => {
            this.loginSuccess();
            // 所有操作完毕,跳转路由
            const redirect = this.$route.query.redirect || '/';
            this.$router.push({
              path: redirect
            });
          }).catch(error => {
            this.isLoging = false;
            console.log(error);
          });
        });
      },
      /**
       * 获取用户信息
       */
      getUserInfo(token) {
        return userInfo({ token }).then(response => {
          const userInfoData = response.data.data;
          saveUserInfo(userInfoData);
          this.setUserInfo(userInfoData);
        }).catch(error => {
          console.log(error);
        });
      },
      /**
       * 获取权限菜单
       * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never>}
       */
      getMenuList() {
        const token = getAccessToken();
        return userMenuList({
          token
        }).then(response => {
          // 缓存权限菜单
          savePermissionList(response.data.data);
        });
      },
      loginSuccess() {
        const hour = new Date().getHours();
        let message = '';
        if (hour < 6) {
          message = this.$t('user.loginSuccess.beforeDawn');
        } else if (hour < 12) {
          message = this.$t('user.loginSuccess.morning');
        } else if (hour < 13) {
          message = this.$t('user.loginSuccess.noon');
        } else if (hour < 18) {
          message = this.$t('user.loginSuccess.afternoon');
        } else if (hour < 19) {
          message = this.$t('user.loginSuccess.evening');
        } else if (hour < 22) {
          message = this.$t('user.loginSuccess.night');
        } else {
          message = this.$t('user.loginSuccess.lateNight');
        }
        this.$notify({
          title: this.$t('user.loginSuccess.title'),
          message,
          type: 'success'
        });
      }
    },
    components: {
      Language,
      Logo,
      CopyrightFooter
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global.scss";

  .login-container {
    width: 100%;
    min-height: 100%;
    padding: 110px 0 130px 0;
    background: #f0f2f5 url("../../assets/images/login-bg.svg") no-repeat 50%;
    background-size: cover;
    position: relative;
    .el-header {
      .login-logo {
        width: 100%;
        height: 45px;
      }
      .login-des {
        width: 100%;
        margin-top: 10px;
        font-size: 13px;
        color: #999;
        text-align: center;
      }
    }
    .el-main {
      margin-top: 35px;
      @include columnCenter;
      .login-form {
        width: 350px;
        //@include columnCenter;
        .login-form-input-wrapper {
          width: 100%;
          height: 40px;
          position: relative;
          margin-top: 20px;
          .login-form-input {
            width: 100%;
          }
        }
        .login-code-img {
          width: 105px;
          margin-top: 22px;
        }
      }
      .automatic-logon {
        width: 350px;
        font-size: 15px;
        margin-top: 30px;
      }
      .login-btn-wrapper {
        width: 350px;
        margin-top: 30px;
        .login-btn {
          width: 100%;
        }
      }
    }
    .el-footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    }
    .language-wrapper {
      position: absolute;
      right: 40px;
      top: 13px;
    }
  }
</style>
