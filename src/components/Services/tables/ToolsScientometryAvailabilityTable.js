import React, {Component} from "react";
import ReactTable from "react-table";
import * as R from 'ramda'
import FontAwesome from 'react-fontawesome'
import OverlayTooltip from '../../common/OverlayTooltip'

export default class ToolsScientometryAvailabilityTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {list} = this.props;
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
      Cell: ({ original: { id, version, name, homepage, toolType } }) => (
          <div>
            <a href={homepage} target='_blank'>{name}</a>
            {version && <span>{` v.${version}`}</span>}
            <OverlayTooltip id='tooltip-windows' tooltipText={`Bio.tools: ${name}`}>
            <a href={`https://bio.tools/${id}`} target='_blank'>
                <FontAwesome className='icons' name='question-circle' />
            </a>
            </OverlayTooltip>
        </div>)
    }, {
      Header: 'Citations',
      id: 'citations',
      accessor: ({citations}) => citations
    }, {
      Header: 'Impact factor',
      id: 'impactFactor',
      accessor: ({publication}) => R.compose(R.converge(R.divide, [R.sum, R.length]), R.pluck('impact'))(publication)
    }, {
      Header: 'Availability',
      id: 'availability',
      accessor: ({uptime}) => uptime ? `${Math.round((R.compose(R.length, R.reject(c => c !== 200), R.pluck('code'))(uptime)/uptime.length) * 100)}%` : 'N/A',
      Cell: data => (
          <div>
            {data.row.availability}
            <OverlayTooltip id='tooltip-windows' tooltipText={`Based on last 8 days from OpenEBench: ${data.original.name}`}>
            <a href={`https://openebench.bsc.es/html/tool/${data.original.id}`} target='_blank'>
                <FontAwesome className='icons' name='question-circle' />
            </a>
            </OverlayTooltip>
          </div>
      )
    }, {
      Header: 'Documentation',
      id: 'documentation',
      accessor: ({documentation}) => documentation.length ? 'Yes' : 'No',
      Cell: data => (
          <div>
            {data.row.documentation}
            {data.original.documentation.length &&
            <OverlayTooltip id='tooltip-windows' tooltipText={`${data.original.documentation[0].type} documentation`}>
            <a href={data.original.documentation[0].url} target='_blank'>
                <FontAwesome className='icons' name='question-circle' />
            </a>
            </OverlayTooltip>
            }
          </div>
      )
    }];

    return (
      <ReactTable
        columns={columns}
        data={list}
        minRows={1}
      />
    )
  }
}
