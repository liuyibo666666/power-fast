/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/4/7
  * Time: 21:33
  * describe:
  */
const roles = [
  {
    id: '65454g5d65f4bfghrtyh7fgbfxg',
    roleCode: 'super_admin',
    roleName: 'admin',
    describe: '',
    createData: '2020-02-14'
  },
  {
    id: 'r987e8tg2rfh1t8j4g1jgh5j15hj',
    roleCode: 'editor_1',
    roleName: 'editor',
    describe: '',
    createData: '2020-02-14'
  }
];

export default [
// 获取用户菜单
  {
    url: '/role/roleList\.*',
    type: 'get',
    response: config => {
      let { searchForm } = JSON.parse(config.body);
      searchForm = searchForm || { roleName: '' };
      return {
        code: 200,
        data: roles.filter(item => item.roleName.indexOf(searchForm.roleName) !== -1)
      };
    }
  }
];
