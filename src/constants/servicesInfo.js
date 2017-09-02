export const DRUG_1D_QUERY = 'q="small-molecule-primary-sequence"'
export const DRUG_2D_QUERY = 'q="small-molecule-secondary-structure"'
export const DRUG_3D_QUERY = 'q="small-molecule-structure"'
export const DRUG_XD_QUERY = 'q="small-molecule-omics"'

const data = [
  {
    route: 'dna1dServices',
    header: '1D DNA Services',
    message: 'DNA sequences',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'dna sequence',
    },
  }, {
    route: 'dna2dServices',
    header: '2D DNA Services',
    message: 'secondary DNA structures',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'dna secondary structure',
    },
  }, {
    route: 'dna3dServices',
    header: '3D DNA Services',
    message: 'DNA structures',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'dna structure',
    },
  }, {
    route: 'DnaxdServices',
    header: 'xD DNA Services',
    message: 'DNA-omics',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'genomics',
    },
  }, {
    route: 'rna1dServices',
    header: '1D RNA Services',
    message: 'RNA sequences',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'rna sequence',
    },
  }, {
    route: 'rna2dServices',
    header: '2D RNA Services',
    message: 'secondary RNA structures',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'rna secondary structure',
    },
  }, {
    route: 'rna3dServices',
    header: '3D RNA Services',
    message: 'RNA structures',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'rna structure',
    },
  }, {
    route: 'rnaxdServices',
    header: 'xD RNA Services',
    message: 'RNA-omics',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'rna omics',
    },
  }, {
    route: 'protein1dServices',
    header: '1D Protein Services',
    message: 'protein sequences',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'protein sequence',
    },
  }, {
    route: 'protein2dServices',
    header: '2D Protein Services',
    message: 'secondary protein structures',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'protein secondary structure',
    },
  }, {
    route: 'protein3dServices',
    header: '3D Protein Services',
    message: 'protein structures',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'protein structure',
    },
  }, {
    route: 'proteinxdServices',
    header: 'xD Protein Services',
    message: 'proteomics',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'protein omics',
    },
  }, {
    route: 'drug1dServices',
    header: '1D Drug Services',
    message: 'primary structures for small molecules',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'small molecule primary sequence',
    },
  }, {
    route: 'drug2dServices',
    header: '2D Drug Services',
    message: 'secondary structures for small molecules',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'small molecule secondary structure',
    },
  }, {
    route: 'drug3dServices',
    header: '3D Drug Services',
    message: 'structures for small molecules',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'small molecule structure',
    },
  }, {
    route: 'drugxdServices',
    header: 'xD Drug Services',
    message: 'small "moleculeomics"',
    qsObject: {
      collectionID: 'ELIXIR CZ',
      q: 'small molecule omics',
    },
  }, {
    route: 'allServices',
    header: 'All Services',
    message: 'DNA, RNA, protein and drugs',
  },
]
