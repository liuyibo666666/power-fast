/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/30
  * Time: 14:07
  * describe:
  */
const user = {
  state: {
    userInfo: null,
    permissionList: null
  },
  mutations: {
    'SET_PERMISSION_LIST': (state, permissionList) => {
      state.permissionList = permissionList;
    },
    'SET_USERINFO': (state, userInfo) => {
      state.userInfo = userInfo;
    }
  }
};
export default user;
