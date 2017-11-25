import React from 'react'
import { OverlayTooltip } from '../../components/common/OverlayTooltip'

export function getPublicationLink (publication, index) {
  if (publication.doi) {
    return <OverlayTooltip key={publication.doi} id='tooltip-doi' tooltipText='DOI'>
      <a href={`https://dx.doi.org/${publication.doi}`} target='_blank'>
        {index}
      </a>
    </OverlayTooltip>
  }
  if (publication.pmid) {
    return <OverlayTooltip key={publication.pmid} id='tooltip-pubmed' tooltipText='PUBMED'>
      <a href={`https://www.ncbi.nlm.nih.gov/pubmed/${publication.pmid}`} target='_blank'>
        {index}
      </a>
    </OverlayTooltip>
  }
  if (publication.pmcid) {
    return <OverlayTooltip key={publication.pmcid} id='tooltip-pmc' tooltipText='PMC'>
      <a href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${publication.pmcid}`} target='_blank'>
        {index}
      </a>
    </OverlayTooltip>
  }
}

export function getCitationsSource (idSourcePair, index) {
  return <OverlayTooltip key={idSourcePair[0]} id='tooltip-pmid' tooltipText='Citations source'>
    <a href={`http://europepmc.org/search?query=CITES%3A${idSourcePair[0]}_${idSourcePair[1]}`} target='_blank'>
      {index}
    </a>
  </OverlayTooltip>
}
