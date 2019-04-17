import { GET_USERINFO } from './mutation-types';
import { State, ActionContext } from './store';
import {
  getUserInfo,
} from './service';

export default {
  async getUserInfoAction({ commit }: ActionContext) {
    const res = await getUserInfo();
    commit(GET_USERINFO, res);
  },
};
