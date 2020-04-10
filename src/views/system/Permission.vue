<template>
  <div class="system-permission">
    <div class="system-permission-Operation-wrapper">
      <operation-bar :operationAdd="true"
                     :operationDelete="true">
      </operation-bar>
    </div>
    <div class="system-permission-table-wrapper">
      <permission-list></permission-list>
    </div>
    <div class="system-permission-form-wrapper">
      <permission-info></permission-info>
    </div>
  </div>
</template>

<script>
  import PermissionList from '@/components/permission/PermissionList';
  import { systemMixin } from '@/utils/mixin';
  import PermissionInfo from '@/components/permission/PermissionInfo';
  import OperationBar from '@/components/common/OperationBar';
  import { getAccessToken } from '@/utils/localStorage';
  import { menuList } from '@/api/system';

  export default {
    name: 'Permission',
    mixins: [ systemMixin ],
    data() {
      return {};
    },
    created() {
      this.getMenuList();
      this.permissionInfoInit();
    },
    methods: {
      /**
       * 详情页面数据初始化
       */
      permissionInfoInit() {
        this.setPropertyInfo({
          info: {
            id: '',
            menuName: '',
            menuType: 1,
            parentId: '',
            icon: '',
            path: '',
            component: '',
            openMode: 0,
            sort: ''
          }
        });
      },
      /**
       * 获取管理权限菜单列表
       */
      getMenuList() {
        const token = getAccessToken();
          menuList({ token }).then(response => {
            this.setPropertyDataList({
              dataList: response.data.data
            });
          });
      }
    },
    components: { OperationBar, PermissionInfo, PermissionList }
  };
</script>

<style lang="scss" scoped>
  .system-permission {
    min-height: 100%;
    padding: 20px;
    background: #fff;
  }
</style>
