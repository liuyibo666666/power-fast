/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/29
  * Time: 14:50
  * describe: actions
  */
const actions = {
  setSideCollapse: ({ commit }, sideCollapse) => {
    return commit('SET_SIDE_COLLAPSE', sideCollapse);
  },
  setPermissionList: ({ commit }, permissionList) => {
    return commit('SET_PERMISSION_LIST', permissionList);
  },
  setUserInfo: ({ commit }, userInfo) => {
    return commit('SET_USERINFO', userInfo);
  },
  setCurrentTab: ({ commit }, currentTab) => {
    return commit('SET_CURRENT_TAB', currentTab);
  },
  setTabs: ({ commit }, tabs) => {
    return commit('SET_TABS', tabs);
  },
  setIsShowDrawer: ({ commit }, isShowDrawer) => {
    return commit('SET_IS_SHOW_DRAWER', isShowDrawer);
  },
  setIsBtnLoading: ({ commit }, isBtnLoading) => {
    return commit('SET_IS_BTN_LOADING', isBtnLoading);
  },
  setDrawerTitle: ({ commit }, drawerTitle) => {
    return commit('SET_DRAWER_TITLE', drawerTitle);
  },
  setMultipleSelection: ({ commit }, multipleSelection) => {
    return commit('SET_MULTIPLE_SELECTION', multipleSelection);
  },
  setPropertyInfo: ({ commit }, propertyInfo) => {
    return commit('SET_PROPERTY_INFO', propertyInfo);
  },
  setFormDisabled: ({ commit }, formDisabled) => {
    return commit('SET_FORM_DISABLED', formDisabled);
  },
  setPropertyDataList: ({ commit }, propertyDataList) => {
    return commit('SET_PROPERTY_DATA_LIST', propertyDataList);
  }
};

export default actions;
