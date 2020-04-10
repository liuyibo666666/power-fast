import { getPermissionList } from '@/utils/localStorage';
import CryptoJS from 'crypto-js';

/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/28
  * Time: 14:58
  * describe:
  */
// 盐
const saltFigure = 'JIHuih=23g8byu=56UGB=Y566G=1DF8Y4=CV1G=ty8rty=hfggh=2fghd7=hfgop';

/**
 * 加密
 * @param data
 * @returns {string}
 */
export function encrypt(data) {
  return CryptoJS.AES.encrypt(
    data, saltFigure
  ).toString();
}

/**
 * 解密
 * @return {string}
 */
export function decrypt(str) {
  return CryptoJS.AES.decrypt(
    str, saltFigure
  ).toString(CryptoJS.enc.Utf8);
}

/**
 * 根据某个属性查找菜单
 * @param key
 * @param property
 * @returns {*}
 */
export function findMenuByProperty(key, property) {
  const menuList = getPermissionList();
  for (let i = 0; i < menuList.length; i++) {
    if (key === menuList[ i ][ property ]) {
      return menuList[ i ];
    }
    if (menuList[ i ].submenuList) {
      const subMenuList = menuList[ i ].submenuList;
      for (let j = 0; j < subMenuList.length; j++) {
        if (key === subMenuList[ j ][ property ]) {
          return subMenuList[ j ];
        }
      }
    }
  }
};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
