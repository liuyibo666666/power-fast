<template>
  <div class="permission-info">
    <drawer @save-click="save">
      <el-form :model="roleInfo" ref="menuForm" status-icon :rules="rules"
               label-position="right" label-width="100px" :disabled="formDisabled"
               size="small">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.role.roleName')+':'" prop="roleName">
              <el-input v-model="roleInfo.roleName"
                        :placeholder="$t('system.role.roleNamePlaceholder')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.role.roleCode')+':'" prop="roleCode">
              <el-input v-model="roleInfo.roleCode"
                        :placeholder="$t('system.role.roleCodePlaceholder')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item :label="$t('system.role.describe')+':'" prop="describe">
              <el-input
                type="textarea"
                :placeholder="$t('system.role.describePlaceholder')"
                v-model="roleInfo.describe"
                maxlength="126"
                resize="none"
                show-word-limit>
              </el-input>
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

  export default {
    name: 'roleInfo',
    components: { Drawer },
    mixins: [ systemMixin ],
    watch: {
      isShowDrawer(v) {
        if (!v) {
          this.roleInfo = {
            id: '',
            roleCode: '',
            roleName: '',
            describe: '',
            createData: ''
          };
          this.setFormDisabled(false);
          this.setIsBtnLoading(false);
        }
      },
      propertyInfo() {
        this.roleInfo = this.propertyInfo.info;
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
        roleInfo: null,
        rules: {
          roleName: [
            { required: true, message: this.$t('system.role.roleNamePlaceholder'), trigger: 'blur' }
          ],
          roleCode: [
            { required: true, message: this.$t('system.role.roleCodePlaceholder'), trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.roleInfo = this.propertyInfo.info;
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
            if (this.roleInfo.id) {
              for (let i = 0; i < dataList.length; i++) {
                if (dataList[ i ].id === this.roleInfo.id) {
                  dataList[ i ] = this.roleInfo;
                  this.setIsShowDrawer(false);
                  return true;
                }
              }
            }
            this.roleInfo.id = 'sfgdf' +
              Math.floor(Math.random() * 10000) +
              'gdgf' + Math.floor(Math.random() * 10000) + 'tyrtyrftyf';
            dataList.pushWithoutDuplicate([ this.roleInfo ], 'id');
            this.setIsShowDrawer(false);
          }, 1500);
          return true;
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "~@/assets/styles/global";
</style>
