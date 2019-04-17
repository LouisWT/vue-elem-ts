import {
  GET_USERINFO,
  INIT_SIZE,
} from './mutation-types';
import { State } from './store';

export interface UserInfo {
  user_id: number;
  name: string;
  avatar: string;
  message: string;
  mobile: boolean;
}

export default {
  [GET_USERINFO](state: State, userInfo: UserInfo) {
    if (state.userInfo && (state.userInfo.user_id !== userInfo.user_id)) {
      return;
    }
    if (!state.login) {
      return;
    }
    if (!userInfo.message) {
      state.userInfo = {
        ...userInfo,
      };
    } else {
      state.userInfo = null;
    }
  },
};
