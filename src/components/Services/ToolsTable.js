import 'babel-polyfill'
import React from 'react'
import R from 'ramda'
import ReactTable from 'react-table'
import ReadMore from '../common/ReadMore'
import { Label } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { OverlayTooltip } from '../common/OverlayTooltip'
import ShowMore from '../common/ShowMore'
import { PAGE_SIZE } from '../../constants/toolsTable'

function getPublicationLink (publication, index) {
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

function getCitationsSource (pmid, index) {
  return <OverlayTooltip key={pmid} id='tooltip-pmid' tooltipText='Citations source'>
    <a href={`http://europepmc.org/search?query=CITES%3A${pmid}_MED`} target='_blank'>
      {index}
    </a>
  </OverlayTooltip>
}

const columns = [
  {
    Header: 'Name (Sortable, filterable)',
    id: 'name',
    accessor: data => data.name,
    sortable: true,
    sortMethod: (a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    },
    filterable: true,
    filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    Cell: data => {
      const {id, version, name, homepage, toolType} = data.original
      return <div>
        <a href={homepage} target='_blank'>{name}</a>
        {version && <span>{` v.${version}`}</span>}
        <OverlayTooltip id='tooltip-windows' tooltipText={`Bio.tools: ${name}`}>
          <a href={`https://bio.tools/${id}`} target='_blank'>
            <FontAwesome className='icons' name='question-circle' />
          </a>
        </OverlayTooltip>
        <hr className='table-delimiter' />
        <p>
          {toolType.map((value, index) =>
            <span key={index}>
              <Label bsStyle='warning'>{value}</Label>
              <br />
            </span>
          )}
        </p>
      </div>
    },
    width: 220,
  }, {
    Header: 'Description (Filterable)',
    id: 'description',
    accessor: data => data.description,
    filterable: true,
    filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    Cell: data => <ReadMore chars={350} text={data.value} />,
    minWidth: 150,
  }, {
    Header: 'Publications (Sortable)',
    id: 'additional-info',
    accessor: data => R.isNil(data.citations) ? '-' : data.citations,
    sortable: true,
    sortMethod: (a, b) => {
      if (a === '-') return -1
      if (b === '-') return 1
      return a - b
    },
    Cell: data => {
      const { publication: publications, pmids } = data.original
      const citations = data.value
      const filteredPublications = R.filter(
        publication => publication.doi !== null || publication.pmid !== null || publication.pmcid !== null,
        publications
      )

      return <div>
        <strong>{'Publications: '}</strong>
        {filteredPublications.length > 0
          ? filteredPublications.map((publication, index) =>
            <span key={index}>
              {'['}
              {getPublicationLink(publication, index + 1)}
              {index + 1 < filteredPublications.length ? '], ' : ']'}
            </span>
          )
          : 'no'
        }
        <hr className='table-delimiter' />
        <strong>
          {`Citations: ${citations}`}
        </strong>
        <br />
        <strong>{`Source: `}</strong>
        {pmids && pmids.length > 0
          ? pmids.map((pmid, index) =>
            <span key={index}>
              {'['}
              {getCitationsSource(pmid, index + 1)}
              {index + 1 < pmids.length ? '], ' : ']'}
            </span>
          )
          : '-'
        }
      </div>
    },
    width: 200,
    className: '',
  }, {
    expander: true,
    Header: 'More',
    width: 55,
    Expander: ({isExpanded, ...rest}) =>
      isExpanded
        ? <OverlayTooltip id='tooltip-show-less-info' tooltipText='Show less info'>
          <FontAwesome className='more-icon' name='minus' />
        </OverlayTooltip>
        : <OverlayTooltip id='tooltip-show-more-info' tooltipText='Show more info'>
          <FontAwesome className='more-icon' name='plus' />
        </OverlayTooltip>,
    className: 'table-expander',
  },
]

const subColumns = [
  {
    Header: 'Topic',
    id: 'topic',
    accessor: data => <ShowMore lines={3} searchTermName='topic' list={data.topic} />,
  }, {
    Header: 'Function',
    id: 'function',
    accessor: data => <ShowMore lines={3} searchTermName='function' list={data.func} />,
  }, {
    Header: 'Additional info',
    id: 'additional-info',
    Cell: data => {
      const { maturity, operatingSystem } = data.original
      const labelStyle = maturity === 'Mature' ? 'success' : maturity === 'Emerging' ? 'info' : 'danger'

      if (!maturity && operatingSystem.length === 0) {
        return <span>{'No additional info available'}</span>
      }

      return <div>
        {maturity &&
          <div>
            <strong>
              {'Maturity: '}
            </strong>
            <Label bsStyle={labelStyle} className='label-margin'>
              {maturity}
            </Label>
          </div>
        }

        {maturity && operatingSystem.length > 0 &&
          <hr className='table-delimiter' />
        }

        {operatingSystem.length > 0 &&
          <div>
            <strong>{'Platforms: '}</strong>
            {R.contains('Windows', operatingSystem) &&
              <OverlayTooltip id='tooltip-windows' tooltipText='Platform: Windows'>
                <FontAwesome className='icons' name='windows' />
              </OverlayTooltip>
            }
            {R.contains('Linux', operatingSystem) &&
              <OverlayTooltip id='tooltip-linux' tooltipText='Platform: Linux'>
                <FontAwesome className='icons' name='linux' />
              </OverlayTooltip>
            }
            {R.contains('Mac', operatingSystem) &&
              <OverlayTooltip id='tooltip-mac' tooltipText='Platform: Mac'>
                <FontAwesome className='icons' name='apple' />
              </OverlayTooltip>
            }
          </div>
        }
      </div>
    },
    width: 180,
  },
]

export const ToolsTable = ({ list }) => {
  return (
    <ReactTable
      data={list}
      columns={columns}
      resizable={false}
      sortable={false}
      showPaginationTop
      showPageSizeOptions={false}
      defaultPageSize={PAGE_SIZE}
      minRows={1}
      className='-highlight'
      SubComponent={row => {
        const subList = [{
          func: row.original.function,
          topic: row.original.topic,
          maturity: row.original.maturity,
          operatingSystem: row.original.operatingSystem,
        }]
        return (
          <div className='sub-table'>
            <ReactTable
              data={subList}
              columns={subColumns}
              defaultPageSize={1}
              showPagination={false}
              sortable={false}
            />
          </div>
        )
      }}
    />
  )
}
