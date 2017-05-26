import React, { Component } from 'react'
import R from 'ramda'
import ReactTable from 'react-table'
import ReadMore from './ReadMore'
import {Label, OverlayTrigger} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import {OverlayTooltip} from './OverlayTooltip'

const pluckData = tools => {
  return tools.map(tool => {
    return R.compose(
      R.assoc('function', R.head(tool.function).operation),
      R.pick(['name', 'homepage', 'version', 'description', 'topic', 'maturity', 'operatingSystem'])
    )(tool)
  })
}

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
      </div>,
  }, {
    id: 'description',
    sortable: false,
    minWidth: 190,
    maxWidth: 290,
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
        <div>
          {data.maturity === 'Mature'
            ? <h4><Label bsStyle='success'>Mature</Label></h4>
            : data.maturity === 'Emerging'
              ? <h4><Label bsStyle='info'>Emerging</Label></h4>
              : data.maturity === 'Legacy' && <h4><Label bsStyle='warning'>Legacy</Label></h4>}
        </div>
        <div>
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
        </div>
      </div>,
  },
]

export default class ToolsTable extends Component {
  render () {
    const { count, next, list, pageSize } = this.props

    const defaultPageSize = next === null
      ? R.modulo(count, pageSize)
      : pageSize

    return (
      <ReactTable
        data={pluckData(list)}
        columns={columns}
        showPagination={false}
        defaultPageSize={defaultPageSize}
        className='-striped'
      />
    )
  }
}
