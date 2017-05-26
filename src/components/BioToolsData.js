import React, { PureComponent } from 'react'
import R from 'ramda'
import 'whatwg-fetch'
import { Alert } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Loader from 'react-loader'
import { PAGE_SIZE } from './constants/toolsTable'
import { ToolsTable } from './ToolsTable'

class BioToolsFetch extends PureComponent {
  constructor (props) {
    super(props)

    fetch(props.url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          bioToolsData: data,
          loadingData: false,
        })
      })

    this.state = {
      bioToolsData: { list: [], count: 0 },
      currentPage: 1,
      itemsCountPerPage: PAGE_SIZE,
      loadingData: true,
      loadingPage: false,
    }
  }

  componentWillReceiveProps (newProps) {
    if (!R.equals(newProps, this.props)) {
      this.setState({ loadingData: true })
      fetch(newProps.url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            bioToolsData: data,
            loadingData: false })
        })
    }
  }

  handlePageChange = newPage => {
    this.setState({
      currentPage: newPage,
      loadingPage: true,
    })

    const url = R.concat(this.props.url, `&page=${newPage}`)

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          bioToolsData: data,
          loadingPage: false,
        })
      })
  }

  render () {
    const { currentPage, itemsCountPerPage, loadingData, loadingPage, bioToolsData } = this.state
    const toolsCount = bioToolsData.count

    return (
      <Loader loaded={!loadingData}>
        <div>
          {toolsCount
            ? <div>
              {toolsCount > itemsCountPerPage &&
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={toolsCount}
                  prevPageText='&laquo;'
                  nextPageText='&raquo;'
                  firstPageText='First'
                  lastPageText='Last'
                  onChange={this.handlePageChange}
                />
              }
              <Loader loaded={!loadingPage}>
                <ToolsTable
                  count={bioToolsData.count}
                  next={bioToolsData.next}
                  list={bioToolsData.list}
                  pageSize={itemsCountPerPage}
                />
                {toolsCount > itemsCountPerPage &&
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={toolsCount}
                    prevPageText='&laquo;'
                    nextPageText='&raquo;'
                    firstPageText='First'
                    lastPageText='Last'
                    onChange={this.handlePageChange}
                  />
                }
              </Loader>
            </div>
            : <div>
              <Alert bsStyle='danger'>
                <h3 className='text-center'>We are sorry, but there are no services.</h3>
              </Alert>
            </div>
          }
        </div>
      </Loader>
    )
  }
}

export default BioToolsFetch
