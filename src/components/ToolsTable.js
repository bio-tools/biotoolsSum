import React from 'react'
import R from 'ramda'
import ReactTable from 'react-table'
import ReadMore from './ReadMore'
import { Label } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { OverlayTooltip } from './OverlayTooltip'

const pickData = R.map(
  R.compose(
    R.evolve(
      {
        function: R.compose(R.prop('operation'), R.head),
      }),
    R.pick(['name', 'homepage', 'version', 'description', 'topic', 'maturity', 'operatingSystem', 'function', 'toolType'])
  )
)

const columns = [
  {
    id: 'name',
    sortable: false,
    minWidth: 110,
    maxWidth: 170,
    header: 'Name',
    accessor: data =>
      <div>
        <a href={data.homepage} target='_blank'>{data.name}</a>
        {data.version && <span> v.{data.version}</span>}
        <hr className='table-delimiter' />
        {!R.contains('Database portal', data.toolType)
          ? <p><Label>Tool</Label></p>
          : data.toolType.length >= 2
            ? <p><Label bsStyle='primary'>Database</Label> <Label>Tool</Label></p>
            : <p><Label bsStyle='primary'>Database</Label></p>}
      </div>,
  }, {
    id: 'description',
    sortable: false,
    minWidth: 200,
    maxWidth: 300,
    aggregate: true,
    header: 'Description',
    accessor: data => <ReadMore lines={3}>{data.description}</ReadMore>,
  }, {
    id: 'topic',
    sortable: false,
    minWidth: 130,
    maxWidth: 300,
    header: 'Topic',
    accessor: data => data.topic,
    render: topics =>
      <ul>
        {topics.value.map((topic, index) => {
          return <li key={index}><a href={topic.uri} target='_blank'>{topic.term}</a></li>
        })}
      </ul>,
  }, {
    id: 'function',
    sortable: false,
    minWidth: 130,
    maxWidth: 300,
    header: 'Function',
    accessor: data => data.function,
    render: funccs =>
      <ul>
        {funccs.value.map((funcc, index) => {
          return <li key={index}><a href={funcc.uri} target='_blank'>{funcc.term}</a></li>
        })}
      </ul>,
  }, {
    id: 'additional-info',
    sortable: false,
    minWidth: 100,
    maxWidth: 150,
    header: 'Additional info',
    accessor: data =>
      <div>
        {data.maturity === 'Mature'
          ? <p><Label bsStyle='success'>Mature</Label></p>
          : data.maturity === 'Emerging'
            ? <p><Label bsStyle='info'>Emerging</Label></p>
            : data.maturity === 'Legacy' && <p><Label bsStyle='warning'>Legacy</Label></p>}
        <hr className='table-delimiter' />
        {R.contains('Windows', data.operatingSystem) &&
          <OverlayTooltip id='tooltip-windows' tooltipText='Platform: Windows'>
            <FontAwesome className='icons' name='windows' />
          </OverlayTooltip>}
        {R.contains('Linux', data.operatingSystem) &&
          <OverlayTooltip id='tooltip-linux' tooltipText='Platform: Linux'>
            <FontAwesome className='icons' name='linux' />
          </OverlayTooltip>}
        {R.contains('Mac', data.operatingSystem) &&
          <OverlayTooltip id='tooltip-mac' tooltipText='Platform: Mac'>
            <FontAwesome className='icons' name='apple' />
          </OverlayTooltip>}
      </div>,
  },
]

export const ToolsTable = ({ count, next, list, pageSize }) => {
  const defaultPageSize = next === null ? R.modulo(count, pageSize) : pageSize

  return (
    <ReactTable
      data={pickData(list)}
      columns={columns}
      showPagination={false}
      defaultPageSize={defaultPageSize}
      className='-striped'
      />
  )
}
