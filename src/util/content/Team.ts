const MOHISTMC_TEAM: Record<string, AuthorDetails> = {
  mgazul: {
    name: 'Mgazul',
    role: 'Admin & Developer',
    pageUrl: 'https://github.com/Mgazul'
  },
  shawiizz: {
    name: 'Shawiiz_z',
    role: 'Admin & Developer',
    pageUrl: 'https://github.com/Shawiizz'
  },
  wdog5: {
    name: 'Wdog5',
    role: 'Developer',
    pageUrl: 'https://github.com/wdog5'
  },
  romaindu35: {
    name: 'Romaindu35',
    role: 'Developer',
    pageUrl: 'https://github.com/romaindu35'
  },
  InkerBot: {
    name: 'InkerBot',
    role: 'Developer',
    pageUrl: 'https://github.com/InkerBot'
  },
  KR33PYK1NG: {
    name: 'KR33PY',
    role: 'Contributor',
    pageUrl: 'https://github.com/KR33PYK1NG'
  },
  Terrainwax: {
    name: 'Terrainwax',
    role: 'Contributor',
    pageUrl: 'https://github.com/Terrainwax'
  },
  aceman1209: {
    name: 'Aceman',
    role: 'Contributor',
    pageUrl: 'https://github.com/aceman1209'
  },
  a1640727878: {
    name: 'Sky_Bai',
    role: 'Contributor',
    pageUrl: 'https://github.com/a1640727878'
  },
  SparkGNRK: {
    name: 'Spark',
    role: 'Community Support',
    pageUrl: 'https://github.com/SparkGNRK'
  }
};

export type AuthorDetails = {
  name: string;
  role: string;
  pageUrl: string;
};

export default MOHISTMC_TEAM;
