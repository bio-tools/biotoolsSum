export const DNA_1D_QUERY = 'q="dna-sequence"'
export const DNA_2D_QUERY = 'q="dna-secondary-structure"'
export const DNA_3D_QUERY = 'q="dna-structure"'
export const DNA_XD_QUERY = 'q="genomics"'

export const RNA_1D_QUERY = 'q="rna-sequence"'
export const RNA_2D_QUERY = 'q="rna-secondary-structure"'
export const RNA_3D_QUERY = 'q="rna-structure"'
export const RNA_XD_QUERY = 'q="rna-omics"'

export const PROTEIN_1D_QUERY = 'q="protein-sequence"'
export const PROTEIN_2D_QUERY = 'q="protein-secondary-structure"'
export const PROTEIN_3D_QUERY = 'q="protein-structure"'
export const PROTEIN_XD_QUERY = 'q="protein-omics"'

export const DRUG_1D_QUERY = 'q="small-molecule-primary-sequence"'
export const DRUG_2D_QUERY = 'q="small-molecule-secondary-structure"'
export const DRUG_3D_QUERY = 'q="small-molecule-structure"'
export const DRUG_XD_QUERY = 'q="small-molecule-omics"'

export const DEFAULT_COLLECTION = 'elixir-cz'

// Sorts the results by chosen value (score only available when there is a query)
// Possible values: lastUpdate, additionDate, name, affiliation, score
export const SORT_BY = 'sort=name'

// Orders the results by either Ascending or Descending order
// Possible values: asc, desc
export const ORDER = 'ord=asc'
