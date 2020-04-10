/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/29
  * Time: 14:44
  * describe: layout Store
  */
const layout = {
  state: {
    sideCollapse: false,
    currentTab: {},
    tabs: []
  },
  mutations: {
    'SET_SIDE_COLLAPSE': (state, sideCollapse) => {
      state.sideCollapse = sideCollapse;
    },
    'SET_CURRENT_TAB': (state, currentTab) => {
      state.currentTab = currentTab;
    },
    'SET_TABS': (state, tabs) => {
      state.tabs = tabs;
    }
  }
};
export default layout;
