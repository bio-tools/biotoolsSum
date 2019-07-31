var config = {
  basename: '',
  allowReportMode: true,                   // true or false
  showOnlyAllServicesInCollection: true,  // true or false
  allowCollectionChange: false,            // true or false
  collectionID: null,               // if collection doesn't exist, it defaults to elixir-cz
  rows: [],
  biotoolsIDS: ['decryptor', 'predictsnp', 'coordinateserver'],
  ratings: {
    'coordinateserver': {
      maturity: 5,
      performance: 4,
      documentation: 3
    },
    'decryptor': {
      maturity: 1,
      performance: 2,
      documentation: 3
    },
    'predictsnp': {
      maturity: 4,
      performance: 3,
      documentation: 2
    }
  }
}

exports.config = config
