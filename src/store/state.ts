// 根目录下的 state 定义通用的 state 或者 component 中的 state
const initState = {
  login: true,
  userInfo: null,
};

interface UserInfo {
  user_id: number;
  name: string;
  avatar: string;
  message: string;
  mobile: boolean;
  balance?: number;
  giftAmount?: number;
  point?: number;
}

interface RootState {
  login: boolean;
  userInfo: UserInfo | null;
}

export default initState;

export {
  RootState,
  UserInfo,
};
