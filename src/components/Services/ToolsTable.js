import React from 'react'
import R from 'ramda'
import ReactTable from 'react-table'
import ReadMore from '../common/ReadMore'
import { Label } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { OverlayTooltip } from '../common/OverlayTooltip'
import ShowMore from '../common/ShowMore'
import {PAGE_SIZE} from '../../constants/toolsTable'

function getPublicationLinks (publication) {
  let links = []
  if (publication.doi) {
    links.push(<a href={`https://dx.doi.org/${publication.doi}`} target='_blank'>
      <FontAwesome className='icons' name='question-circle' />
    </a>)
  }
  if (publication.pmid) {
    links.push(<a href={`https://www.ncbi.nlm.nih.gov/pubmed/${publication.pmid}`} target='_blank'>
      <FontAwesome className='icons' name='question-circle' />
    </a>)
  }
  if (publication.pmcid) {
    links.push(<a href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${publication.pmcid}`} target='_blank'>
      <FontAwesome className='icons' name='question-circle' />
    </a>)
  }

  return links
}

const columns = [
  {
    Header: 'Name (Sortable A-Z or Z-A)',
    id: 'name',
    accessor: data => data.name,
    sortable: true,
    sortMethod: (a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    },
    Cell: data => {
      const {id, version, name, homepage, toolType} = data.original
      return <div>
        <a href={homepage} target='_blank'>{name}</a>
        {version && <span> v.{version}</span>}
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
    Header: 'Description',
    id: 'description',
    sortable: false,
    accessor: data => <ReadMore chars={260} text={data.description} />,
    minWidth: 150,
  }, {
    Header: 'Additional info (Sortable by citations)',
    id: 'additional-info',
    accessor: data => R.isNil(data.citations) ? 'unknown' : data.citations,
    sortable: true,
    sortMethod: (a, b) => {
      if (a === 'unknown') return -1
      if (b === 'unknown') return 1
      return a - b
    },
    Cell: data => {
      const { maturity, operatingSystem, publication } = data.original
      const citations = data.value
      const labelStyle = maturity === 'Mature' ? 'success' : maturity === 'Emerging' ? 'info' : 'danger'

      return <div>
        <Label bsStyle={labelStyle} className='label-margin'>{maturity}</Label>
        {R.contains('Windows', operatingSystem) &&
        <OverlayTooltip id='tooltip-windows' tooltipText='Platform: Windows'>
          <FontAwesome className='icons' name='windows' />
        </OverlayTooltip>}
        {R.contains('Linux', operatingSystem) &&
        <OverlayTooltip id='tooltip-linux' tooltipText='Platform: Linux'>
          <FontAwesome className='icons' name='linux' />
        </OverlayTooltip>}
        {R.contains('Mac', operatingSystem) &&
        <OverlayTooltip id='tooltip-mac' tooltipText='Platform: Mac'>
          <FontAwesome className='icons' name='apple' />
        </OverlayTooltip>}
        <hr className='table-delimiter' />
        <strong>Publications:</strong>
        {publication.length > 0
          ? publication.map((publication, index) =>
            <div>
              <span>{publication.type}</span>
              {getPublicationLinks(publication)}
            </div>
          )
          : ' -'
        }
        <hr className='table-delimiter' />
        <strong>
          Citations: {citations}
        </strong>
      </div>
    },
    width: 240,
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
      className='-striped'
      SubComponent={row => {
        const subList = [{ func: row.original.function, topic: row.original.topic }]
        return (
          <div style={{padding: '20px'}}>
            <ReactTable
              data={subList}
              columns={subColumns}
              defaultPageSize={1}
              showPagination={false}
            />
          </div>
        )
      }}
    />
  )
}
