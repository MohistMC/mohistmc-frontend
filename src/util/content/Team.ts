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
    role: 'Banner Developer',
    pageUrl: 'https://github.com/wdog5'
  }
};

export type AuthorDetails = {
  name: string;
  role: string;
  pageUrl: string;
};

export default MOHISTMC_TEAM;
