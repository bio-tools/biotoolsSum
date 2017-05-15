import React, { Component } from 'react'
import R from 'ramda'
import ReactTable from 'react-table'
import ReadMore from './ReadMore'

const pluckData = tools => {
  return tools.map(tool => {
    return R.compose(
      R.assoc('output', R.head(tool.function).output),
      R.assoc('input', R.head(tool.function).input),
      R.assoc('function', R.head(tool.function).operation),
      R.assoc('topic', tool.topic),
      R.assoc('description', tool.description),
      R.assoc('homepage', tool.homepage),
      R.assoc('version', tool.version),
      R.assoc('name', tool.name)
    )({})
  })
}

const columns = [{
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
  maxWidth: 250,
  header: 'Topic',
  accessor: data => data.topic,
  render: topics =>
    <ol>
      {topics.value.map((topic, index) => {
        return <li key={index}><a href={topic.uri} target='_blank'>{topic.term}</a></li>
      })}
    </ol>,
}, {
  id: 'function',
  sortable: false,
  minWidth: 100,
  maxWidth: 250,
  header: 'Function',
  accessor: data => data.function,
  render: funccs =>
    <ul>
      {funccs.value.map((funcc, index) => {
        return <li key={index}><a href={funcc.uri} target='_blank'>{funcc.term}</a></li>
      })}
    </ul>,
}, {
  id: 'input',
  sortable: false,
  minWidth: 100,
  maxWidth: 250,
  header: 'Input',
  accessor: data => data.input,
  render: inputs =>
    <ul>
      {inputs.value.map((input, index) => {
        return <li key={index} className='indent-li'>
          <a key={index} href={input.data.uri} target='_blank'>{input.data.term}</a>
          {input.format.length > 0 &&
          <span>
            <br />
            (
            {input.format.map((format, index, arr) => {
              return <span key={index}>
                <a key={index} href={format.uri} target='_blank'>
                  {format.term}
                </a>
                {arr.length > index + 1 && ', '}
              </span>
            })}
            )
          </span>
          }
        </li>
      })}
    </ul>,
}, {
  id: 'output',
  sortable: false,
  minWidth: 100,
  maxWidth: 250,
  header: 'Output',
  accessor: data => data.output,
  render: outputs =>
    <ul>
      {outputs.value.map((output, index) => {
        return <li key={index} className='indent-li'>
          <a href={output.data.uri} target='_blank'>{output.data.term}</a>
          {output.format.length > 0 &&
          <span>
            <br />
            (
            {output.format.map((format, index, arr) => {
              return <span key={index}>
                <a key={index} href={format.uri} target='_blank'>
                  {format.term}
                </a>
                {arr.length > index + 1 && ', '}
              </span>
            })}
            )
          </span>
          }
        </li>
      })}
    </ul>,
},
]

class ToolsTable extends Component {
  render () {
    const { count, next, list } = this.props.tools

    const defaultPageSize = next === null
      ? R.modulo(count, 25)
      : 25

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
