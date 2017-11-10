import 'babel-polyfill'
import React from 'react'
import * as R from 'ramda'
import ReactTable from 'react-table'
import FontAwesome from 'react-fontawesome'
import { OverlayTooltip } from '../common/OverlayTooltip'
import { PAGE_SIZE } from '../../constants/toolsTable'
import { getChartConfig } from '../../biotoolsSum/services/index'
import ReactHighcharts from 'react-highcharts'
import { getCitationsSource, getPublicationLink } from '../../biotoolsSum/table/index'

const getColumns = () => [
  {
    Header: 'Name and publications info (Sortable and filterable by name) ',
    id: 'name',
    accessor: data => data.name,
    sortable: true,
    sortMethod: (a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    },
    filterable: true,
    filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    Cell: data => {
      const { id, version, name, homepage, publication: publications, publicationsIdSourcePairs, citations } = data.original
      const filteredPublications = R.filter(
          publication => publication.doi !== null || publication.pmid !== null || publication.pmcid !== null,
          publications
        )

      return <div>
        <a href={homepage} target='_blank'>{name}</a>
        {version && <span>{` v.${version}`}</span>}
        <OverlayTooltip id='tooltip-windows' tooltipText={`Bio.tools: ${name}`}>
          <a href={`https://bio.tools/${id}`} target='_blank'>
            <FontAwesome className='icons' name='question-circle' />
          </a>
        </OverlayTooltip>
        <hr className='table-delimiter' />
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
          {`Total Citations: ${citations}`}
        </strong>
        <br />
        <strong>{`Citations source: `}</strong>
        {publicationsIdSourcePairs && publicationsIdSourcePairs.length > 0 && citations > 0
            ? publicationsIdSourcePairs.map((idSourcePair, index) =>
              <span key={index}>
                {'['}
                {getCitationsSource(idSourcePair, index + 1)}
                {index + 1 < publicationsIdSourcePairs.length ? '], ' : ']'}
              </span>
            )
            : '-'
          }
      </div>
    },
    minWidth: 140,
  },
  {
    Header: 'Citations chart (Sortable by citations count)',
    id: 'citations-chart',
    accessor: data => R.isNil(data.citations) ? '-' : data.citations,
    sortable: true,
    sortMethod: (a, b) => {
      if (a === '-') return -1
      if (b === '-') return 1
      return a - b
    },
    Cell: data => {
      const { name, citations, citationsYears } = data.original

      return <div>

        {citationsYears && !R.isEmpty(citationsYears) && citations > 0
            ? <ReactHighcharts config={getChartConfig(citationsYears, name)} />
            : <strong>{'No chart available because there are 0 citations'}</strong>
          }
      </div>
    },
    className: 'horizontal-vertical-center',
    minWidth: 250,
  },
]

class ToolsTableWithChart extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = { selected: {}, selectAll: 0 }
  }

  toggleRow = (name, citationsYears) => {
    const { selected } = this.state
    const newSelected = selected[name] ? R.dissoc(name, selected) : R.assoc(name, citationsYears, selected)

    this.setState({
      selected: newSelected,
      selectAll: 2,
    })
  }

  render () {
    const { list, createGraph } = this.props
    const { selected } = this.state
    let columns = getColumns()
    let chartConfig = {}

    if (createGraph) {
      const citationsYears = R.compose(
        R.map(
          R.reduce(R.mergeWith(R.add), 0)
        ),
        R.values,
      )(selected)

      const seriesNames = R.keys(selected)
      console.log(seriesNames)
      chartConfig = getChartConfig(citationsYears, 'tools', seriesNames)

      columns = R.prepend(
        {
          Header: 'Selected',
          id: 'include-tool',
          accessor: '',
          Cell: ({ original: { name, citationsYears, citations } }) => citations === 0
            ? <div />
            : <div style={{ marginRight: 0 }} className='pretty p-icon p-smooth p-round p-bigger'>
              <input
                type='checkbox'
                checked={!!this.state.selected[name]}
                onChange={() => this.toggleRow(name, citationsYears)}
              />
              <div className='state p-warning'>
                <i className='icon fa fa-check' aria-hidden='true' />
                <label />
              </div>
            </div>,
          style: { textAlign: 'center' },
          width: 70,
        },
        columns,
      )
    }

    return (
      <div>
        {createGraph && <ReactHighcharts config={chartConfig} />}
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
        />
      </div>
    )
  }
}

export default ToolsTableWithChart
