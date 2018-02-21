var config = {
  basename: '',
  allowReportMode: true,                   // true or false
  showOnlyAllServicesInCollection: false,  // true or false
  allowCollectionChange: false,            // true or false
  collectionID: 'elixir-cz',               // if collection doesn't exist, it defaults to elixir-cz
  rows: [
    {
      name: 'DNA',
      cells: [
        {
          route: 'dna-1d-services',
          image: 'dna-1d-services.png',
          message: 'Services for studies on DNA sequences',
          qsObject: {
            q: 'dna sequence',
          },
        }, {
          route: 'dna-2d-services',
          image: 'dna-2d-services.png',
          message: 'Services for studies on secondary DNA structures',
          qsObject: {
            q: 'dna secondary structure',
          },
        }, {
          route: 'dna-3d-services',
          image: 'dna-3d-services.png',
          message: 'Services for studies on DNA structures',
          qsObject: {
            q: 'dna structure',
          },
        }, {
          route: 'dna-xd-services',
          image: 'dna-xd-services.png',
          message: 'Services for studies on DNA-omics',
          qsObject: {
            q: 'genomics',
          },
        },
      ],
    },
    {
      name: 'RNA',
      cells: [
        {
          route: 'rna-1d-services',
          image: 'rna-1d-services.png',
          message: 'Services for studies on RNA sequences',
          qsObject: {
            q: 'rna sequence',
          },
        }, {
          route: 'rna-2d-services',
          image: 'rna-2d-services.png',
          message: 'Services for studies on secondary RNA structures',
          qsObject: {
            q: 'rna secondary structure',
          },
        }, {
          route: 'rna-3d-services',
          image: 'rna-3d-services.png',
          message: 'Services for studies on RNA structures',
          qsObject: {
            q: 'rna structure',
          },
        }, {
          route: 'rna-xd-services',
          image: 'rna-xd-services.png',
          message: 'Services for studies on RNA-omics',
          qsObject: {
            q: 'rna omics',
          },
        },
      ],
    },
    {
      name: 'Protein',
      cells: [
        {
          route: 'protein-1d-services',
          image: 'protein-1d-services.png',
          message: 'Services for studies on protein sequences',
          qsObject: {
            q: 'protein sequence',
          },
        }, {
          route: 'protein-2d-services',
          image: 'protein-2d-services.png',
          message: 'Services for studies on secondary protein structures',
          qsObject: {
            q: 'protein secondary structure',
          },
        }, {
          route: 'protein-3d-services',
          image: 'protein-3d-services.png',
          message: 'Services for studies on protein structures',
          qsObject: {
            q: 'protein structure',
          },
        }, {
          route: 'protein-xd-services',
          image: 'protein-xd-services.png',
          message: 'Services for studies on proteomics',
          qsObject: {
            q: 'protein omics',
          },
        },
      ],
    },
    {
      name: 'Drugs and other small molecules',
      cells: [
        {
          route: 'drug-1d-services',
          image: 'drug-1d-services.png',
          message: 'Services for studies on primary structures for small molecules',
          qsObject: {
            q: 'small molecule primary sequence',
          },
        }, {
          route: 'drug-2d-services',
          image: 'drug-2d-services.png',
          message: 'Services for studies on secondary structures for small molecules',
          qsObject: {
            q: 'small molecule secondary structure',
          },
        }, {
          route: 'drug-3d-services',
          image: 'drug-3d-services.png',
          message: 'Services for studies on structures for small molecules',
          qsObject: {
            q: 'small molecule structure',
          },
        }, {
          route: 'drug-xd-services',
          image: 'drug-xd-services.png',
          message: 'Services for studies on small "moleculeomics"',
          qsObject: {
            q: 'small molecule omics',
          },
        },
      ],
    },
  ],
}

exports.config = config
