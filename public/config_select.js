var config = {
  basename: '',
  allowReportMode: true,                   // true or false
  showOnlyAllServicesInCollection: true,  // true or false
  allowCollectionChange: false,            // true or false
  collectionID: null,               // if collection doesn't exist, it defaults to elixir-cz
  rows: [],
  biotoolsIDS: ['litemol', 'nglview', 'iview', 'chimera', 'coot', 'aquaria', 'rasmol'],
  ratingsKeys: {
    'structures': 'Vizualizace velkých struktur',
    'experimental': 'Vizualizace experimentálních dat',
    'annotations': 'Vizualizace anotací',
    'surface': 'Vizualizace povrchů',
    'assemblies': 'Vizualizace assemblies',
    'validation': 'Vizualiace validačních dat',
  },
  ratings: {
    'litemol': {
      structures: 5,
      experimental: 4,
      annotations: 3,
      surface: 2,
      assemblies: 1,
      validation: 5,
    },
    'nglview': {
      structures: 3,
      experimental: 2,
      annotations: 1,
      surface: 5,
      assemblies: 4,
      validation: 2,
    },
    'iview': {
      structures: 2,
      experimental: 2,
      annotations: 2,
      surface: 2,
      assemblies: 5,
      validation: 2,
    },
    'chimera': {
      structures: 1,
      experimental: 2,
      annotations: 3,
      surface: 4,
      assemblies: 5,
      validation: 5,
    },
    'coot': {
      structures: 4,
      experimental: 4,
      annotations: 4,
      surface: 4,
      assemblies: 4,
      validation: 4,
    },
    'aquaria': {
      structures: 3,
      experimental: 2,
      annotations: 1,
      surface: 2,
      assemblies: 5,
      validation: 3,
    },
    'rasmol': {
      structures: 4,
      experimental: 5,
      annotations: 2,
      surface: 5,
      assemblies: 3,
      validation: 1,
    }
  }
}

exports.config = config
