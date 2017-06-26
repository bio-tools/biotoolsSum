import React from 'react'
import R from 'ramda'
import ReactTable from 'react-table'
import ReadMore from '../common/ReadMore'
import { Label } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { OverlayTooltip } from '../common/OverlayTooltip'
import ShowMore from '../common/ShowMore'

const pickData = R.map(
  R.compose(
    R.evolve(
      {
        function: R.compose(R.prop('operation'), R.head),
      }),
    R.pick(['id', 'name', 'homepage', 'version', 'description', 'topic', 'maturity', 'operatingSystem', 'function', 'toolType'])
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
        <a href={`https://bio.tools/tool/${data.id}/version/${data.version}`} target='_blank'>{data.name}</a>
        {data.version && <span> v.{data.version}</span>}
        <hr className='table-delimiter' />
        <p>
          {data.toolType.map((value, index) =>
            <span key={index}>
              <Label bsStyle='warning'>{value}</Label>
              <br />
            </span>
          )}
        </p>
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
    accessor: data => <ShowMore lines={3} searchTermName='topic' list={data.topic} />,
  }, {
    id: 'function',
    sortable: false,
    minWidth: 130,
    maxWidth: 300,
    header: 'Function',
    accessor: data => <ShowMore lines={3} searchTermName='function' list={data.function} />,
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
            : data.maturity === 'Legacy' && <p><Label bsStyle='danger'>Legacy</Label></p>}
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
