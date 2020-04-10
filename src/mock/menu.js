/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/29
  * Time: 16:33
  * describe:
  */

const menus = {
  'admin-token': [
    {
      id: '16bdfgbdf8bhgddfg8tyr52',
      menuName: '首页',
      menuType: 1,
      parentId: '',
      hasChildren: false,
      icon: 'el-icon-s-home',
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 0
    },
    {
      id: '16bdfgbdf8b5d6fdgipfrrft455cmjk',
      menuName: '系统管理',
      menuType: 1,
      parentId: '',
      hasChildren: true,
      icon: 'el-icon-s-tools',
      path: '/system',
      component: 'layout/index',
      openMode: 0,
      sort: 1
    },
    {
      id: '6g4h98xfgh98dgfuyfgt454hyj245',
      menuName: '菜单管理',
      menuType: 2,
      parentId: '16bdfgbdf8b5d6fdgipfrrft455cmjk',
      hasChildren: false,
      icon: '',
      path: '/system/permission',
      component: 'system/Permission',
      openMode: 0,
      sort: 1
    },
    {
      id: '6g2d3fh1grykmfulhjydd522',
      menuName: '角色管理',
      menuType: 2,
      parentId: '16bdfgbdf8b5d6fdgipfrrft455cmjk',
      hasChildren: false,
      icon: '',
      path: '/system/role',
      component: 'system/Role',
      openMode: 1,
      sort: 2
    },
    {
      id: 'ryty3fh1gd3fytutythbzww',
      menuName: '权限管理',
      menuType: 2,
      parentId: '16bdfgbdf8b5d6fdgipfrrft455cmjk',
      hasChildren: false,
      icon: '',
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 3
    },
    {
      id: '16bfh4j65gj6jvpibol8FWSB8l4op',
      menuName: '在线开发',
      menuType: 1,
      parentId: '',
      hasChildren: true,
      icon: 'el-icon-cloudy',
      path: '/dashboard',
      component: 'dashboard/index',
      sort: 2
    },
    {
      id: '6g4h98xfgh98dgf6cz565rt87ysryrt',
      menuName: '表单开发',
      menuType: 2,
      parentId: '16bfh4j65gj6jvpibol8FWSB8l4op',
      hasChildren: false,
      icon: '',
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 1
    },
    {
      id: '6g2d3fh1gd3fhfghf8gf98gh78srt',
      menuName: '报表设计',
      menuType: 2,
      parentId: '16bfh4j65gj6jvpibol8FWSB8l4op',
      icon: '',
      hasChildren: false,
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 2
    },
    {
      id: '16bdfgxrtset456fdg4dt84ygdf',
      menuName: '考勤管理',
      menuType: 1,
      parentId: '',
      hasChildren: false,
      icon: 'el-icon-s-tools',
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 3
    },
    {
      id: '16bdfgvbhdxftfdgt87yg89d',
      menuName: '系统监控',
      menuType: 1,
      parentId: '',
      hasChildren: false,
      icon: 'el-icon-cpu',
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 4
    },
    {
      id: '1yt5fgbdf8be5ytt84hgrfsfdh',
      menuName: '业务办理',
      menuType: 1,
      parentId: '',
      hasChildren: false,
      icon: 'el-icon-monitor',
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 5
    }
  ],
  'editor-token': []
};

export default [
  // 获取菜单管理列表(一级菜单)
  {
    url: '/menu/menuList\.*',
    type: 'get',
    response: config => {
      const { token } = JSON.parse(config.body);
      const menuList = menus[ token ];
      let parentMenuList = menuList.filter(item => item.menuType === 1);
      // mock error
      if (!menuList) {
        return {
          success: 106,
          message: '登录过期，无法获取菜单信息。'
        };
      }

      return {
        code: 200,
        data: parentMenuList
      };
    }
  },
  // 获取菜单管理列表(二级菜单)
  {
    url: '/menu/subMenuList\.*',
    type: 'get',
    response: config => {
      const { token, parentId } = JSON.parse(config.body);
      const menuList = menus[ token ];
      let subMenuList = menuList.filter(item =>
        item.menuType === 2 && item.parentId === parentId);
      // mock error
      if (!menuList) {
        return {
          success: 106,
          message: '登录过期，无法获取菜单信息。'
        };
      }
      return {
        code: 200,
        data: subMenuList
      };
    }
  }
];
