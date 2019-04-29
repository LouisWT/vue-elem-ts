import http from 'utils/http';
import { getStorage } from 'utils/storage';

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  const id = getStorage('user_id');
  return http.Get('/v1/user', { user_id: id });
};

/**
 * 猜测城市
 */
export const cityGuess = () => {
  return http.Get('/v1/cities', { type: 'guess' });
};

/**
 * 获取热门城市
 */
export const cityHot = () => {
  return http.Get('/v1/cities', { type: 'hot' });
};

/**
 * 获取所有城市
 */
export const cityGroup = () => {
  return http.Get('/v1/cities', { type: 'group' });
};

/**
 * 获取验证码
 */
interface CaptchasRes {
  code: string;
}
export const getCaptchas = async () => {
  const res: CaptchasRes = await http.Post('/v1/captchas', {});
  return res;
};

/**
 * 短信验证码
 */
export const postMobileCode = (phone: string) => {
  return http.Post('/v4/mobile/verify_code/send', {
    mobile: phone,
    scene: 'login',
    type: 'sms',
  });
};
