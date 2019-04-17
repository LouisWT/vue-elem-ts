import { State, ActionContext } from 'store/store';
import { GUESS_CITY, HOT_CITY, SORT_CITY } from 'store/mutation-types';
import {
  cityGuess,
  cityHot,
  cityGroup,
} from 'store/service';

export default {
  async getGuessCity({ commit }: ActionContext) {
    const res = await cityGuess();
    commit(GUESS_CITY, res);
  },
  async getHotCity({ commit }: ActionContext) {
    const res = await cityHot();
    commit(HOT_CITY, res);
  },
  async getGroupCity({ commit }: ActionContext) {
    const res = await cityGroup();
    commit(SORT_CITY, res);
  },
};
