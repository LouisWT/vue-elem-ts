import { GUESS_CITY, HOT_CITY, SORT_CITY } from 'store/mutation-types';
import { HomeState } from './state';

interface CityPayload {
  id: number;
  name: string;
}

interface SortCityPayload {
  [letter: string]: CityPayload[];
}

export default {
  [GUESS_CITY](state: HomeState, guessCity: CityPayload) {
    if (guessCity) {
      state.guessCity = guessCity;
    }
  },
  [HOT_CITY](state: HomeState, hotCity: CityPayload[]) {
    if (hotCity && hotCity.length > 0) {
      state.hotCity = hotCity;
    }
  },
  [SORT_CITY](state: HomeState, sortCity: SortCityPayload) {
    if (sortCity) {
      state.groupCity = sortCity;
    }
  },
};
