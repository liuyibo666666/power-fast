/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/4/4
  * Time: 10:46
  * describe:
  */
const system = {
  state: {
    // 是否显示抽屉, 编辑框
    isShowDrawer: false,
    // 保存按钮是否加载状态
    isBtnLoading: false,
    // 抽屉的标题
    drawerTitle: '',
    // 表格的多选,选中数组
    multipleSelection: [],
    // 详情页面的属性信息和相关详情
    propertyInfo: null,
    // 是否禁用表单
    formDisabled: false,
    // 列表页面的数据和属性
    propertyDataList: {}
  },
  mutations: {
    'SET_IS_SHOW_DRAWER': (state, isShowDrawer) => {
      state.isShowDrawer = isShowDrawer;
    },
    'SET_IS_BTN_LOADING': (state, isBtnLoading) => {
      state.isBtnLoading = isBtnLoading;
    },
    'SET_DRAWER_TITLE': (state, drawerTitle) => {
      state.drawerTitle = drawerTitle;
    },
    'SET_MULTIPLE_SELECTION': (state, multipleSelection) => {
      state.multipleSelection = multipleSelection;
    },
    'SET_PROPERTY_INFO': (state, propertyInfo) => {
      state.propertyInfo = propertyInfo;
    },
    'SET_FORM_DISABLED': (state, formDisabled) => {
      state.formDisabled = formDisabled;
    },
    'SET_PROPERTY_DATA_LIST': (state, propertyDataList) => {
      state.propertyDataList = propertyDataList;
    }
  }
};
export default system;
