import initState, { HomeState } from './state';
import actions from './actions';
import mutations from './mutation';

export default {
  namespaced: true,
  state: initState,
  actions,
  mutations,
};
