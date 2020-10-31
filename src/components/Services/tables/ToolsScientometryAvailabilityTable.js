import React, {Component} from 'react'
import ReactTable from 'react-table'
import * as R from 'ramda'
import FontAwesome from 'react-fontawesome'
import OverlayTooltip from '../../common/OverlayTooltip'

export default class ToolsScientometryAvailabilityTable extends Component {
  render () {
    const {list} = this.props
    const columns = [{
      Header: 'Tool',
      id: 'name',
      accessor: ({name}) => name,
      sortable: true,
      sortMethod: (a, b) => {
        return a.toLowerCase() > b.toLowerCase() ? 1 : -1
      },
      filterable: true,
      filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
      Cell: ({original: {id, version, name, homepage, toolType}}) => (
        <div>
          <a href={homepage} target='_blank'>{name}</a>
          {version && <span>{` v.${version}`}</span>}
          <OverlayTooltip id='tooltip-windows' tooltipText={`Bio.tools: ${name}`}>
            <a href={`https://bio.tools/${id}`} target='_blank'>
              <FontAwesome className='icons' name='question-circle' />
            </a>
          </OverlayTooltip>
        </div>),
    }, {
      Header: 'Citations',
      id: 'citations',
      accessor: ({citations}) => citations,
    }, {
      Header: 'Impact factor',
      id: 'impactFactor',
      accessor: ({publication}) => {
        return R.compose(R.prop('impact'), R.defaultTo(publication[0]), R.find(R.propEq('type', 'Primary')))(publication) || 'N/A'
      },
    }, {
      Header: 'Availability',
      id: 'availability',
      // accessor: ({uptime}) => uptime ? `${Math.round((R.compose(R.length, R.reject(c => c !== 200), R.pluck('code'))(uptime)/uptime.length) * 100)}%` : 'N/A',
      accessor: ({uptime}) => uptime ? `${R.compose(R.multiply(100), Math.round, codes => R.filter(c => c === 200, codes).length / codes.length, R.reject(R.isNil), R.pluck('code'))(uptime)}%` : 'N/A',
      Cell: data => (
        <div>
          {data.row.availability}
          <OverlayTooltip id='tooltip-windows'
            tooltipText={`Based on last 8 days from OpenEBench: ${data.original.name}`}>
            <a href={`https://openebench.bsc.es/html/tool/${data.original.id}`} target='_blank'>
              <FontAwesome className='icons' name='question-circle' />
            </a>
          </OverlayTooltip>
        </div>
      ),
    }, {
      Header: 'Documentation',
      id: 'documentation',
      accessor: ({documentation}) => documentation.length ? 'Yes' : 'No',
      Cell: data => (
        <div>
          {data.row.documentation}
          {data.original.documentation.length > 0 &&
          <OverlayTooltip id='tooltip-windows' tooltipText={`${data.original.documentation[0].type} documentation`}>
            <a href={data.original.documentation[0].url} target='_blank'>
              <FontAwesome className='icons' name='question-circle' />
            </a>
          </OverlayTooltip>
          }
        </div>
      ),
    }]

    return (
      <ReactTable
        columns={columns}
        data={list}
        minRows={1}
      />
    )
  }
}
