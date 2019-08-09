import React, {Component} from "react";
import ReactTable from "react-table";
import * as R from 'ramda'

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
      getProps: () => {
        return {
          style: {
            fontWeight: "bold"
          }
        }
      },
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
      id: 'availability'
    }, {
      Header: 'Documentation',
      id: 'documentation',
      accessor: ({documentation}) => documentation.length ? 'Yes' : 'No'
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
