/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/29
  * Time: 14:49
  * describe:
  */
const getters = {
  sideCollapse: state => state.layout.sideCollapse,
  currentTab: state => state.layout.currentTab,
  tabs: state => state.layout.tabs,
  permissionList: state => state.user.permissionList,
  userInfo: state => state.user.userInfo,
  isShowDrawer: state => state.system.isShowDrawer,
  isBtnLoading: state => state.system.isBtnLoading,
  drawerTitle: state => state.system.drawerTitle,
  multipleSelection: state => state.system.multipleSelection,
  propertyInfo: state => state.system.propertyInfo,
  formDisabled: state => state.system.formDisabled,
  propertyDataList: state => state.system.propertyDataList
};

export default getters;
