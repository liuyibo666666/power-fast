/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/30
  * Time: 14:19
  * describe:
  */
import router from '@/router';
import store from '@/store';
import { getPermissionList } from '@/utils/localStorage';
import { findMenuByProperty } from '@/utils/utils';

/**
 * 注册路由
 */
export function registerRoute() {
  // 判断 vuex 中是否有权限菜单, 以此决定是否进行路由注册
  let permissionsData = store.getters.permissionList;
  // 如果 vuex 存在, 则不进行注册路由
  if (permissionsData && permissionsData.length > 0) {
    return;
  }
  // 如果不存在, 则从缓存中拿到数据
  // 说明: 直接获取到数据赋值会造成第二层数组丢失
  permissionsData = JSON.stringify(getPermissionList());
  // 将拿到的数据, 保存到 vuex
  store.dispatch('setPermissionList', JSON.parse(permissionsData)).then(() => {
    // 为权限菜单注册路由
    router.addRoutes(handlePermissionsData(JSON.parse(permissionsData)));
  });
};

/**
 * 处理权限菜单数据,变成 router 数组
 * @param permissionsData
 * @returns {*[]}
 */
function handlePermissionsData(permissionsData) {
  let routers = [];
  permissionsData.forEach((item, index) => {
    if (index === 0) {
      routers.push({
        path: '/',
        component: () => import('@/views/layout/index'),
        redirect: item.path,
        children: [ {
          path: item.path,
          name: item.path,
          component: () => import('@/views/' + item.component)
        } ]
      });
    } else {
      let childrenRouters = [];
      if (item.submenuList) {
        item.submenuList.forEach(subItem => {
          childrenRouters.push({
            path: subItem.path,
            name: subItem.path,
            component: () => import('@/views/' + subItem.component)
          });
        });
      }
      routers.push({
        path: item.path,
        component: () => import('@/views/' + item.component),
        redirect: childrenRouters.length > 0 ? childrenRouters[ 0 ].path : '',
        children: childrenRouters
      });
    }
  });
  handleTabs(permissionsData[ 0 ]);
  return routers;
}

function handleTabs(defaultPermission) {
  // 获取当前路经是否是菜单中的某一个
  let current = findMenuByProperty(router.app.$route.path, 'path');
  // 默认标签页常驻页面
  store.dispatch('setTabs', [].concat(defaultPermission));
  // 如果拿到了,就将其添加入为标签页集合,并设置为选中状态
  if (current) {
    let tabs = store.getters.tabs;
    tabs.pushWithoutDuplicate([ current ], 'id');
    store.dispatch('setCurrentTab', current);
  } else {
    // 默认选中标签页第一个, 即首页
    store.dispatch('setCurrentTab', defaultPermission);
  }
}

/**
 * 权限数组降维处理
 * @param arr
 * @returns {Array}
 */
// function flatList(arr) {
//   let flatArray = [];
//   arr.forEach(item => {
//     flatArray.push(item);
//     if (item.submenuList && item.submenuList.length > 0) {
//       flatArray = flatArray.concat(item.submenuList);
//     }
//   });
//   flatArray.map(item => delete item.submenuList);
//   return flatArray;
// }
