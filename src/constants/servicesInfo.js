export const data = {
  collectionID: 'ELIXIR-CZ',
  rows: [
    {
      name: 'DNA',
      cells: [
        {
          route: 'dna-1d-services',
          name: '1D DNA Services',
          message: 'DNA sequences',
          qsObject: {
            q: 'dna sequence',
          },
        }, {
          route: 'dna-2d-services',
          name: '2D DNA Services',
          message: 'secondary DNA structures',
          qsObject: {
            q: 'dna secondary structure',
          },
        }, {
          route: 'dna-3d-services',
          name: '3D DNA Services',
          message: 'DNA structures',
          qsObject: {
            q: 'dna structure',
          },
        }, {
          route: 'dna-xd-services',
          name: 'xD DNA Services',
          message: 'DNA-omics',
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
          name: '1D RNA Services',
          message: 'RNA sequences',
          qsObject: {
            q: 'rna sequence',
          },
        }, {
          route: 'rna-2d-services',
          name: '2D RNA Services',
          message: 'secondary RNA structures',
          qsObject: {
            q: 'rna secondary structure',
          },
        }, {
          route: 'rna-3d-services',
          name: '3D RNA Services',
          message: 'RNA structures',
          qsObject: {
            q: 'rna structure',
          },
        }, {
          route: 'rna-xd-services',
          name: 'xD RNA Services',
          message: 'RNA-omics',
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
          name: '1D Protein Services',
          message: 'protein sequences',
          qsObject: {
            q: 'protein sequence',
          },
        }, {
          route: 'protein-2d-services',
          name: '2D Protein Services',
          message: 'secondary protein structures',
          qsObject: {
            q: 'protein secondary structure',
          },
        }, {
          route: 'protein-3d-services',
          name: '3D Protein Services',
          message: 'protein structures',
          qsObject: {
            q: 'protein structure',
          },
        }, {
          route: 'protein-xd-services',
          name: 'xD Protein Services',
          message: 'proteomics',
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
          name: '1D Drug Services',
          message: 'primary structures for small molecules',
          qsObject: {
            q: 'small molecule primary sequence',
          },
        }, {
          route: 'drug-2d-services',
          name: '2D Drug Services',
          message: 'secondary structures for small molecules',
          qsObject: {
            q: 'small molecule secondary structure',
          },
        }, {
          route: 'drug-3d-services',
          name: '3D Drug Services',
          message: 'structures for small molecules',
          qsObject: {
            q: 'small molecule structure',
          },
        }, {
          route: 'drug-xd-services',
          name: 'xD Drug Services',
          message: 'small "moleculeomics"',
          qsObject: {
            q: 'small molecule omics',
          },
        },
      ],
    },
  ],
}
