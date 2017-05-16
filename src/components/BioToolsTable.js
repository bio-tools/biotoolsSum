import React, { Component } from 'react'
import R from 'ramda'
import ReactTable from 'react-table'
import ReadMore from './ReadMore'
import { Label } from 'react-bootstrap'

const pluckData = tools => {
  return tools.map(tool => {
    return R.compose(
      R.assoc('function', R.head(tool.function).operation),
      R.pick(['name', 'homepage', 'version', 'description', 'topic', 'maturity'])
    )(tool)
  })
}

const columns = [
  {
    id: 'name',
    sortable: false,
    minWidth: 120,
    maxWidth: 180,
    header: 'Name',
    accessor: data => <div>
      <a href={data.homepage} target='_blank'>{data.name}</a>
      {data.version && <span> v.{data.version}</span>}
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
    minWidth: 100,
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
    minWidth: 100,
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
    id: 'maturity',
    sortable: false,
    minWidth: 100,
    maxWidth: 100,
    header: 'Maturity',
    accessor: data => data.maturity,
    render: maturity => {
      if (maturity.value === 'Mature') {
        return <h4><Label bsStyle='success'>Mature</Label></h4>
      }
      if (maturity.value === 'Emerging') {
        return <h4><Label bsStyle='info'>Emerging</Label></h4>
      }
      if (maturity.value === 'Legacy') {
        return <h4><Label bsStyle='warning'>Legacy</Label></h4>
      }
    },
  },
]

class ToolsTable extends Component {
  render () {
    const { count, next, list } = this.props.tools
    const { pageSize } = this.props

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

export default ToolsTable
