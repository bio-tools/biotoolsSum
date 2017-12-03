import React from 'react'
import FontAwesome from 'react-fontawesome'
import OverlayTooltip from '../../components/common/OverlayTooltip'

export function getPublicationLink (publication, index) {
  if (publication.doi) {
    return <OverlayTooltip key={publication.doi + index} id='tooltip-doi' tooltipText='DOI'>
      <a href={`https://dx.doi.org/${publication.doi}`} target='_blank'>
        <strong>{index}</strong>
      </a>
    </OverlayTooltip>
  }
  if (publication.pmid) {
    return <OverlayTooltip key={publication.pmid + index} id='tooltip-pubmed' tooltipText='PUBMED'>
      <a href={`https://www.ncbi.nlm.nih.gov/pubmed/${publication.pmid}`} target='_blank'>
        <strong>{index}</strong>
      </a>
    </OverlayTooltip>
  }
  if (publication.pmcid) {
    return <OverlayTooltip key={publication.pmcid + index} id='tooltip-pmc' tooltipText='PMC'>
      <a href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${publication.pmcid}`} target='_blank'>
        <strong>{index}</strong>
      </a>
    </OverlayTooltip>
  }
}

export function getCitationsSource (citationsSource) {
  return <OverlayTooltip key={citationsSource[0]} id='tooltip-pmid' tooltipText='Citations source'>
    <a href={`http://europepmc.org/search?query=CITES%3A${citationsSource[0]}_${citationsSource[1]}`} target='_blank'>
      <FontAwesome name='question' />
    </a>
  </OverlayTooltip>
}

export function getPublicationAndCitationsLink (publication, index) {
  return (
    <span>
      {getPublicationLink(publication, index)}
      {publication.publicationIdSourcePair && getCitationsSource(publication.publicationIdSourcePair)}
    </span>
  )
}
