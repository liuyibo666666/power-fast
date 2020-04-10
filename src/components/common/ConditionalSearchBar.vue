<template>
  <div class="conditional-search-bar">
    <el-form :inline="true" :model="searchForm" class="form-inline" ref="searchForm">
      <el-form-item v-for="(item, index) in conditionList"
                    :label="item.label"
                    :prop="item.property"
                    :key="index">
        <el-input v-model="searchForm[item.property]" :placeholder="item.label"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ConditionalSearchBar',
    props: {
      conditionList: Array,
      searchForm: Object
    },
    data() {
      return {};
    },
    methods: {
      search() {
        this.$emit('search', this.searchForm);
      },
      reset() {
        this.$refs.searchForm.resetFields();
        this.search();
      }
    }
  };
</script>

<style scoped>

</style>
