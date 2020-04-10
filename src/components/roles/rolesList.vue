<template>
  <div class="roles-table">
    <div class="roles-table-alert-wrapper">
      <table-alert @clear-select="clearSelect"></table-alert>
    </div>
    <el-table
      :data="propertyDataList.dataList"
      ref="roleTable"
      style="width: 100%"
      row-key="id"
      lazy
      v-loading="!propertyDataList.dataList"
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="roleCode"
        :label="$t('system.role.roleCode')">
      </el-table-column>
      <el-table-column
        align="center"
        prop="roleName"
        :label="$t('system.role.roleName')">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createData"
        :label="$t('system.role.createData')">
      </el-table-column>
      <el-table-column :label="$t('system.operation')" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)">
            {{ $t('system.edit') }}
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-dropdown @command="handleMoreOperation">
            <span class="more-btn">
              {{ $t('system.more') }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row, 1)">
                {{ $t('system.detail') }}
              </el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row, 2)">
                {{ $t('system.delete') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import { systemMixin } from '@/utils/mixin';
  import TableAlert from '@/components/common/TableAlert';

  export default {
    name: 'rolesList',
    mixins: [ systemMixin ],
    components: { TableAlert },
    data() {
      return {
        menuList: []
      };
    },
    methods: {
      handleEdit(index, row) {
        this.setPropertyInfo({
          info: row
        });
        this.setDrawerTitle('编辑');
        this.setIsShowDrawer(true);
      },
      handleDelete(index, row) {
        this.$confirm(this.$t('system.deleteTips'), this.$t('system.tipsTitle'), {
          confirmButtonText: this.$t('user.yes'),
          cancelButtonText: this.$t('user.cancel'),
          type: 'warning'
        }).then(() => {
          const dataList = this.propertyDataList.dataList.filter(item => item.id !== row.id);
          this.setPropertyDataList({
            dataList
          });
          this.$message({
            type: 'success',
            message: this.$t('system.deleteSuccess')
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('system.deleteCancel')
          });
        });
      },
      handleMoreOperation(item) {
        switch (Number(item.command)) {
          case 1:
            this.setPropertyInfo({
              info: item.row
            });
            this.setDrawerTitle(this.$t('system.detail'));
            this.setFormDisabled(true);
            this.setIsShowDrawer(true);
            break;
          case 2:
            this.handleDelete(item.index, item.row);
            break;
          default:
            break;
        }
      },
      beforeHandleCommand(index, row, command) {
        return {
          'index': index,
          'row': row,
          'command': command
        };
      },
      clearSelect() {
        this.$refs.roleTable.clearSelection();
      },
      menuTypeFormatter(row, column, cellValue) {
        return row.menuType === 1 ? '一级菜单' : '子菜单';
      },
      handleSelectionChange(val) {
        this.setMultipleSelection(val);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global";

  .roles-table {
    .roles-table-alert-wrapper {
      margin-bottom: 20px;
    }
    .more-btn {
      color: $colorBlue;
    }
  }

</style>
