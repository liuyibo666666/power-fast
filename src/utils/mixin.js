/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/28
  * Time: 8:48
  * describe: 混入
  */
import { mapGetters, mapActions } from 'vuex';
import { findMenuByProperty } from '@/utils/utils';

export const layoutMixin = {
  computed: {
    ...mapGetters([
      'sideCollapse',
      'currentTab',
      'tabs'
    ])
  },
  methods: {
    ...mapActions([
      'setSideCollapse',
      'setCurrentTab',
      'setTabs'
    ]),

    /**
     * 查找菜单对象
     * @param keyPath
     * @returns {*}
     */
    findMenu(keyPath) {
      return findMenuByProperty(keyPath, 'id');
    }
  }
};

export const systemMixin = {
  computed: {
    ...mapGetters([
      'isShowDrawer',
      'isBtnLoading',
      'drawerTitle',
      'multipleSelection',
      'propertyInfo',
      'formDisabled',
      'propertyDataList'
    ])
  },
  methods: {
    ...mapActions([
      'setIsShowDrawer',
      'setIsBtnLoading',
      'setDrawerTitle',
      'setMultipleSelection',
      'setPropertyInfo',
      'setFormDisabled',
      'setPropertyDataList'
    ])
  }
};

export const userMixin = {
  computed: {
    ...mapGetters([
      'permissionList',
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'setPermissionList',
      'setUserInfo'
    ])
  }
};
