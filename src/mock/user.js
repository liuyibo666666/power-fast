/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/28
  * Time: 12:42
  * describe:用户模块模拟数据
  */
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
};

const users = {
  'admin-token': {
    roles: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'admin',
    realName: 'admin测试'
  },
  'editor-token': {
    roles: 'editor',
    introduction: '我是普通用户',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'editor',
    realName: 'editor测试'
  }
};

const userMenu = {
  'admin-token': [
    {
      id: '16bdfgbdf8bhgddfg8tyr52',
      menuName: '首页',
      menuType: 1,
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
      icon: 'el-icon-s-tools',
      path: '/system',
      component: 'layout/index',
      openMode: 0,
      sort: 1,
      submenuList: [
        {
          id: '6g4h98xfgh98dgfuyfgt454hyj245',
          menuName: '菜单管理',
          menuType: 2,
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
          icon: '',
          path: '/dashboard',
          component: 'dashboard/index',
          openMode: 0,
          sort: 3
        }
      ]
    },
    {
      id: '16bfh4j65gj6jvpibol8FWSB8l4op',
      menuName: '在线开发',
      menuType: 1,
      icon: 'el-icon-cloudy',
      path: '/dashboard',
      component: 'dashboard/index',
      sort: 2,
      submenuList: [
        {
          id: '6g4h98xfgh98dgf6cz565rt87ysryrt',
          menuName: '表单开发',
          menuType: 2,
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
          icon: '',
          path: '/dashboard',
          component: 'dashboard/index',
          openMode: 0,
          sort: 2
        }
      ]
    },
    {
      id: '16bdfgxrtset456fdg4dt84ygdf',
      menuName: '考勤管理',
      menuType: 1,
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
      icon: 'el-icon-monitor',
      path: '/dashboard',
      component: 'dashboard/index',
      openMode: 0,
      sort: 5
    }
  ],
  'editor-token': []
};

const searchMenu = {
  'admin-token': [
    {
      id: '16bdfgbdf8bhgddfg8tyr52',
      value: '首页'
    },
    {
      id: '6g4h98xfgh98dgfuyfgt454hyj245',
      value: '菜单管理'
    },
    {
      id: '6g2d3fh1grykmfulhjydd522',
      value: '角色管理'
    },
    {
      id: 'ryty3fh1gd3fytutythbzww',
      value: '权限管理'
    },
    {
      id: '6g4h98xfgh98dgf6cz565rt87ysryrt',
      value: '表单开发'
    },
    {
      id: '6g2d3fh1gd3fhfghf8gf98gh78srt',
      value: '报表设计'
    },
    {
      id: '16bdfgxrtset456fdg4dt84ygdf',
      value: '考勤管理'
    },
    {
      id: '16bdfgvbhdxftfdgt87yg89d',
      value: '系统监控'
    },
    {
      id: '1yt5fgbdf8be5ytt84hgrfsfdh',
      value: '业务办理'
    }
  ],
  'editor-token': []
};

export default [
  // 用户登录
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = JSON.parse(config.body);
      const token = tokens[ username ];
      if (!token) {
        return {
          code: 105,
          message: '没有该账户。'
        };
      }
      if (password !== '123456') {
        return {
          code: 105,
          message: '密码错误。'
        };
      }
      return {
        code: 200,
        data: token
      };
    }
  },

  // 获取用户信息
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = JSON.parse(config.body);
      const info = users[ token ];

      // mock error
      if (!info) {
        return {
          code: 106,
          message: '登录过期，无法获取用户信息。'
        };
      }

      return {
        code: 200,
        data: info
      };
    }
  },
  // 获取用户菜单
  {
    url: '/user/userMenu\.*',
    type: 'get',
    response: config => {
      const { token } = JSON.parse(config.body);
      const userMenuList = userMenu[ token ];

      // mock error
      if (!userMenuList) {
        return {
          success: 106,
          message: '登录过期，无法获取菜单信息。'
        };
      }

      return {
        code: 200,
        data: userMenuList
      };
    }
  },
  // 获取用户搜索菜单建议
  {
    url: '/user/searchMenuList\.*',
    type: 'get',
    response: config => {
      const { token } = JSON.parse(config.body);
      const searchMenuList = searchMenu[ token ];

      // mock error
      if (!searchMenuList) {
        return {
          success: 106,
          message: '登录过期，无法获取菜单信息。'
        };
      }

      return {
        code: 200,
        data: searchMenuList
      };
    }
  },
  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      };
    }
  }
];
