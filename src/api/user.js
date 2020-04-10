/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/28
  * Time: 12:42
  * describe:
  */
import { request } from '@/utils/axios';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

export function userInfo(data) {
  return request({
    url: '/user/info',
    data
  });
}

export function userMenuList(data) {
  return request({
    url: '/user/userMenu',
    data
  });
}

export function searchMenuList(data) {
  return request({
    url: '/user/searchMenuList',
    data
  });
}
