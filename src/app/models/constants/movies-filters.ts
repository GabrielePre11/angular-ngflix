export const MOVIES_FILTERS = [
  {
    name: 'Year',
    value: 'primary_release_year',
    options: [
      { label: '2025', value: '2025' },
      { label: '2024', value: '2024' },
      { label: '2023', value: '2023' },
      { label: '2022', value: '2022' },
      { label: '2021', value: '2021' },
      { label: '2020', value: '2020' },
      { label: '2019', value: '2019' },
      { label: '2018', value: '2018' },
    ],
  },
  {
    name: 'Sort',
    value: 'sort_by',
    options: [
      { label: 'Popularity (DESC)', value: 'popularity.desc' },
      { label: 'Popularity (ASC)', value: 'popularity.asc' },
      { label: 'Release Date (NEW.)', value: 'release_date.desc' },
      { label: 'Release Date (OLD.)', value: 'release_date.asc' },
      { label: 'Revenue (DESC)', value: 'revenue.desc' },
      { label: 'Revenue (ASC)', value: 'revenue.asc' },
      { label: 'Rating (HIGH.)', value: 'vote_average.desc' },
      { label: 'Rating (LOW.)', value: 'vote_average.asc' },
    ],
  },
  {
    name: 'Language',
    value: 'with_original_language',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
      { label: 'Italian', value: 'it' },
    ],
  },
];
