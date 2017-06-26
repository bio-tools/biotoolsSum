import React, { PureComponent } from 'react'
import R from 'ramda'
import 'whatwg-fetch'
import { Alert, Pagination } from 'react-bootstrap'
import Loader from 'react-loader'
import { PAGE_SIZE } from '../../constants/toolsTable'
import { ToolsTable } from './ToolsTable'

class BioToolsData extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      bioToolsData: { list: [], count: 0 },
      currentPage: 1,
      itemsCountPerPage: PAGE_SIZE,
      loadingData: true,
      loadingPage: false,
    }
  }

  componentDidMount () {
    fetch(this.props.query)
      .then(response => response.json())
      .then(data => {
        this.setState({
          bioToolsData: data,
          loadingData: false,
        })
      })
  }

  componentWillReceiveProps (newProps) {
    if (!R.equals(newProps, this.props)) {
      this.setState({ loadingData: true })
      fetch(newProps.query)
        .then(response => response.json())
        .then(data => {
          this.setState({
            bioToolsData: data,
            loadingData: false,
            currentPage: 1,
          })
        })
    }
  }

  handlePageChange = newPage => {
    if (newPage === this.state.currentPage) {
      return
    }

    this.setState({
      currentPage: newPage,
      loadingPage: true,
    })

    const query = R.concat(this.props.query, `&page=${newPage}`)

    fetch(query)
      .then(response => response.json())
      .then(data => {
        this.setState({
          bioToolsData: data,
          loadingPage: false,
        })
      })
  }

  render () {
    const { query } = this.props
    const { currentPage, itemsCountPerPage, loadingData, loadingPage, bioToolsData } = this.state
    const toolsCount = bioToolsData.count
    const numberOfPages = Math.ceil(toolsCount / itemsCountPerPage)

    return (
      <Loader loaded={!loadingData}>
        {toolsCount
          ? <div>
            <Alert bsStyle='warning'>
              There is a total number of <strong>{toolsCount}</strong> tools available
            </Alert>
            <Pagination
              className='pagination-no-margin-top'
              activePage={currentPage}
              items={numberOfPages}
              prev
              next
              first='First'
              last='Last'
              maxButtons={5}
              ellipsis
              onSelect={this.handlePageChange}
            />
            <Loader loaded={!loadingPage}>
              <ToolsTable
                count={bioToolsData.count}
                next={bioToolsData.next}
                list={bioToolsData.list}
                pageSize={itemsCountPerPage}
              />
              <Pagination
                activePage={currentPage}
                items={numberOfPages}
                prev
                next
                first='First'
                last='Last'
                maxButtons={5}
                ellipsis
                onSelect={this.handlePageChange}
              />
              <hr className='table-delimiter' />
              <h5>Query string used: {query}</h5>
            </Loader>
          </div>
          : <Alert bsStyle='danger'>We are sorry, but there are no services.</Alert>
        }
      </Loader>
    )
  }
}

export default BioToolsData
