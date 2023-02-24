import { Dude } from './dude.model';

export const DUDES: readonly Dude[] = [
  {
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/MarioNSMBUDeluxe.png/220px-MarioNSMBUDeluxe.png',
    name: 'Mario',
    role: 'Expert',
    team: 'Gentils',
    birthYear: 1981,
  },
  {
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Luigi_NSMBUDX.png/220px-Luigi_NSMBUDX.png',
    name: 'Luigi',
    role: 'Senior',
    team: 'Gentils',
    birthYear: 1983,
  },
  {
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Yoshi_%28Nintendo_character%29.png/220px-Yoshi_%28Nintendo_character%29.png',
    name: 'Yoshi',
    role: 'Junior',
    team: 'Gentils',
    birthYear: 1990,
  },
  {
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Wario.png/250px-Wario.png',
    name: 'Wario',
    role: 'Expert',
    team: 'Méchants',
    birthYear: 1992,
  },
];

export const FAVORITE_DUDES_STORAGE_KEY = 'favoriteDudes';
