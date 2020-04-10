/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/28
  * Time: 12:50
  * describe:mock
  */
import Mock from 'mockjs';
import user from './user';
import menu from './menu';
import role from './roles';
import search from './remote-search';

const mocks = [
  ...user,
  ...search,
  ...menu,
  ...role
];

for (const i of mocks) {
  Mock.mock(new RegExp(i.url), i.type || 'get', i.response);
}

export default Mock;
