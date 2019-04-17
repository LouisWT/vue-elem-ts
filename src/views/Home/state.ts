const initState = {
  guessCity: {},
  hotCity: [],
  groupCity: {},
};

interface City {
  id: number;
  name: string;
}

interface SortCity {
  [letter: string]: City[];
}

interface HomeState {
  guessCity: City;
  hotCity: City[];
  groupCity: SortCity;
}

export default initState;

export {
  HomeState,
  City,
  SortCity,
};
