<template>
  <div class="system-roles">
    <div class="system-roles-search-bar-wrapper">
      <conditional-search-bar :conditionList="conditionList"
                              :searchForm="searchForm"
                              @search="search">
      </conditional-search-bar>
    </div>
    <div class="system-roles-Operation-wrapper">
      <operation-bar :operationAdd="true"
                     :operationDelete="true">
      </operation-bar>
    </div>
    <div class="system-roles-table-wrapper">
      <roles-list></roles-list>
    </div>
    <div class="system-roles-form-wrapper">
      <role-info></role-info>
    </div>
  </div>
</template>

<script>
  import { systemMixin } from '@/utils/mixin';
  import OperationBar from '@/components/common/OperationBar';
  import { rolesList } from '@/api/system';
  import RolesList from '@/components/roles/rolesList';
  import RoleInfo from '@/components/roles/roleInfo';
  import ConditionalSearchBar from '@/components/common/ConditionalSearchBar';

  export default {
    name: 'Role',
    mixins: [ systemMixin ],
    data() {
      return {
        // 搜索条件信息
        conditionList: [
          {
            property: 'roleName',
            label: '角色名称',
            type: 'text'
          }
        ],
        // 搜索条件
        searchForm: {
          roleName: ''
        }
      };
    },
    created() {
      this.rolelInfoInit();
      this.getRoleList({
        searchForm: this.searchForm
      });
    },
    methods: {
      search(searchForm) {
        this.getRoleList({ searchForm });
      },
      /**
       * 详情页面数据初始化
       */
      rolelInfoInit() {
        this.setPropertyInfo({
          info: {
            id: '',
            roleCode: '',
            roleName: '',
            describe: '',
            createData: ''
          }
        });
      },
      /**
       * 获取管理角色列表
       */
      getRoleList(data) {
        rolesList(data).then(response => {
          this.setPropertyDataList({
            dataList: response.data.data
          });
        });
      }
    },
    components: { ConditionalSearchBar, RoleInfo, RolesList, OperationBar }
  };
</script>

<style lang="scss" scoped>
  .system-roles {
    min-height: 100%;
    padding: 20px;
    background: #fff;
  }
</style>
