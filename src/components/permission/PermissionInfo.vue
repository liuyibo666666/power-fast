<template>
  <div class="permission-info">
    <drawer @save-click="save">
      <el-form :model="menuInfo" ref="menuForm" status-icon :rules="rules"
               label-position="right" label-width="120px" :disabled="formDisabled"
               size="small">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.menuType')+':'" prop="menuType">
              <el-radio-group v-model="menuInfo.menuType">
                <el-radio :label="1">{{ $t('system.permission.menuTypeOption1') }}</el-radio>
                <el-radio :label="2">{{ $t('system.permission.menuTypeOption2') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.menuName')+':'" prop="menuName">
              <el-input v-model="menuInfo.menuName"
                        :placeholder="$t('system.permission.menuNamePlaceholder')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.parentMenu')+':'" prop="parentId" v-if="menuInfo.menuType===2">
              <el-select v-model="menuInfo.parentId"
                         style="width:100%"
                         :placeholder="$t('system.permission.parentMenuPlaceholder')">
                <el-option label="首页" value="1"></el-option>
                <el-option label="系统管理" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.path')+':'" prop="path">
              <el-input v-model="menuInfo.path"
                        :placeholder="$t('system.permission.pathPlaceholder')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.component')+':'" prop="component">
              <el-input v-model="menuInfo.component"
                        :placeholder="$t('system.permission.componentPlaceholder')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.icon')+':'" prop="icon">
              <icon-select v-model="menuInfo.icon"
                           :disabled="formDisabled"
                           @handleSelect="handleSelectIcon"
                           :placeholder="$t('system.permission.iconPlaceholder')"></icon-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.sort')+':'" prop="sort">
              <el-input-number v-model="menuInfo.sort"
                               controls-position="right"
                               :placeholder="$t('system.permission.sortPlaceholder')"
                               :min="0" :max="99999">
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.permission.openMode')+':'" prop="openMode">
              <el-switch
                v-model="menuInfo.openMode"
                :active-text="$t('system.permission.openModeOption1')"
                :inactive-text="$t('system.permission.openModeOption2')"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </drawer>
  </div>
</template>

<script>
  import { systemMixin } from '@/utils/mixin';
  import Drawer from '@/components/common/Drawer';
  import IconSelect from '@/components/common/IconSelect';

  export default {
    name: 'PermissionInfo',
    components: { IconSelect, Drawer },
    mixins: [ systemMixin ],
    watch: {
      isShowDrawer(v) {
        if (!v) {
          this.menuInfo = {
            id: '',
            menuName: '',
            menuType: 1,
            parentId: '',
            icon: '',
            path: '',
            component: '',
            openMode: 0,
            sort: ''
          };
          this.setFormDisabled(false);
          this.setIsBtnLoading(false);
        }
      },
      propertyInfo() {
        this.menuInfo = this.propertyInfo.info;
      }
    },
    props: {
      value: {
        type: [ String, Number ],
        default: ''
      }
    },
    data() {
      return {
        menuInfo: null,
        rules: {
          menuName: [
            { required: true, message: this.$t('system.permission.menuNamePlaceholder'), trigger: 'blur' }
          ],
          parentId: [
            { required: true, message: this.$t('system.permission.parentMenuPlaceholder'), trigger: 'blur' }
          ],
          path: [
            { required: true, message: this.$t('system.permission.pathPlaceholder'), trigger: 'blur' }
          ],
          component: [
            { required: true, message: this.$t('system.permission.componentPlaceholder'), trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.menuInfo = this.propertyInfo.info;
    },
    methods: {
      /**
       * 保存
       */
      save() {
        this.$refs.menuForm.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.setIsBtnLoading(true);
          let dataList = this.propertyDataList.dataList;
          setTimeout(() => {
            if (this.menuInfo.id) {
              for (let i = 0; i < dataList.length; i++) {
                if (dataList[ i ].id === this.menuInfo.id) {
                  dataList[ i ] = this.menuInfo;
                  this.setIsShowDrawer(false);
                  return true;
                }
              }
            }
            this.menuInfo.id = 'sfgdf' +
              Math.floor(Math.random() * 10000) +
              'gdgf' + Math.floor(Math.random() * 10000) + 'tyrtyrftyf';
            dataList.pushWithoutDuplicate([ this.menuInfo ], 'id');
            this.setIsShowDrawer(false);
          }, 1500);
          return true;
        });
      },
      handleSelectIcon(icon) {
        this.menuInfo.icon = icon;
      }
    }
  };
</script>

<style lang="scss">
  @import "~@/assets/styles/global";
</style>
