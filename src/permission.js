import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { registerRoute } from '@/utils/permission';
import { getAccessToken } from '@/utils/localStorage';

// 路由判断登录
router.beforeEach((to, from, next) => {
  // 获取 token 确定用户是否登录过
  const token = getAccessToken();
  // 开启进度条
  NProgress.start();
  // 判断当前的token是否存在 ； 登录存入的token
  if (token) {
    if (to.path !== '/user/login') {
      // 注册路由
      registerRoute();
    }
    // 说明: 默认除了登录,所有的组件全部校验登录权限
    // if (to.matched.some(record => record.meta.requireAuth)) {
    if (to.path === '/user/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
    // } else {
    //   next();
    //   NProgress.done();
    // }
  } else {
    if (to.path === '/user/login') {
      next();
      NProgress.done();
    } else {
      next({
        path: '/user/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: { redirect: to.fullPath }
      });
      NProgress.done();
    }
  }
});
