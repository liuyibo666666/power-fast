/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/2/10
  * Time: 14:03
  * describe:
  */
import Storage from 'web-storage-cache';
import { encrypt, decrypt } from '@/utils/utils';

const localStorage = new Storage();

/**
 * 设置缓存
 * @param key
 * @param value
 * @returns {*}
 */
export function setLocalStorage(key, value) {
  return localStorage.set(key, value);
}

/**
 * 获取缓存
 * @param key
 * @returns {*}
 */
export function getLocalStorage(key) {
  return localStorage.get(key);
}

/**
 * 移除缓存
 * @param key
 * @returns {*}
 */
export function removeLocalStorage(key) {
  return localStorage.delete(key);
}

/**
 * 清除缓存
 * @returns {*}
 */
export function clearLocalStorage() {
  return localStorage.clear();
}

/**
 * 获取语言类型
 * @param locale
 * @returns {*}
 */
export function saveLocale(locale) {
  return setLocalStorage('locale', locale);
}

/**
 * 缓存语言类型
 * @returns {*}
 */
export function getLocale() {
  return getLocalStorage('locale');
}

/**
 * 设置 token
 * @param token
 * @returns {*}
 */
export function saveAccessToken(token) {
  return setLocalStorage('ACCESS_TOKEN', token);
}

/**
 * 获取 token
 * @returns {*}
 */
export function getAccessToken() {
  return getLocalStorage('ACCESS_TOKEN');
}

/**
 * 删除 token
 * @returns {*}
 */
export function removeAccessToken() {
  return removeLocalStorage('ACCESS_TOKEN');
}

/**
 * 设置 自动登录user
 * @param c_username
 * @param c_password
 * @returns {*}
 */
export function saveLoginUser(username, password) {
  var passwordEncrypt = encrypt(password);
  const user = {
    c_u: username,
    c_p: passwordEncrypt
  };
  return setLocalStorage('LOGIN_USER', user);
}

/**
 * 获取 自动登录user
 * @returns {*}
 */
export function getLoginUser() {
  let user = getLocalStorage('LOGIN_USER');
  if (!user || !user.c_p || !user.c_u) {
    return '';
  }
  user.c_p = decrypt(user.c_p);
  return user;
}

/**
 * 删除 用户密码
 * @returns {*}
 */
export function removeLoginUser() {
  return removeLocalStorage('LOGIN_USER');
}

/**
 * 缓存 用户信息
 * @param userInfo
 * @returns {*}
 */
export function saveUserInfo(userInfo) {
  return setLocalStorage('USERINFO', userInfo);
}

/**
 * 获取 用户信息
 * @returns {*}
 */
export function getUserInfo() {
  return getLocalStorage('USERINFO');
}

/**
 * 删除 用户信息
 * @returns {*}
 */
export function removeUserInfo() {
  return removeLocalStorage('USERINFO');
}

/**
 * 缓存 权限菜单
 * @param permissionList
 * @returns {*}
 */
export function savePermissionList(permissionList) {
  return setLocalStorage('PERMISSIONS', permissionList);
}

/**
 * 获取 权限菜单
 * @returns {*}
 */
export function getPermissionList() {
  return getLocalStorage('PERMISSIONS');
}

/**
 * 删除 权限菜单
 * @returns {*}
 */
export function removePermissionList() {
  return removeLocalStorage('PERMISSIONS');
}
