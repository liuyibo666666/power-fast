/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/4/2
  * Time: 21:23
  * describe:
  */
import { request } from '@/utils/axios';

export function menuList(data) {
  return request({
    url: '/menu/menuList',
    data
  });
}

export function subMenuList(data) {
  return request({
    url: '/menu/subMenuList',
    data
  });
}

export function rolesList(data) {
  return request({
    url: '/role/roleList',
    data
  });
}
