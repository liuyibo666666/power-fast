import Vue from 'vue';
import Vuex from 'vuex';
import layout from './modules/layout';
import user from './modules/user';
import system from './modules/system';
import getters from './getters';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions,
  modules: { layout, user, system },
  getters
});
