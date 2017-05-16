import React, { Component } from 'react'
import R from 'ramda'
import 'whatwg-fetch'
import BioToolsTable from './BioToolsTable'
import Pagination from 'react-js-pagination'
import Loader from 'react-loader'
import {PAGE_SIZE} from './constants/toolsTable'
import {Alert} from 'react-bootstrap'

class BioToolsFetch extends Component {
  constructor (props) {
    super(props)

    this.handlePageChange = this.handlePageChange.bind(this)

    this.state = {
      bioToolsData: { list: [], count: 0 },
      currentPage: 1,
      itemsCountPerPage: PAGE_SIZE,
      loadingData: true,
      loadingPage: false,
    }
  }

  componentDidMount () {
    fetch(this.props.url)
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
      fetch(newProps.url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            bioToolsData: data,
            loadingData: false })
        })
    }
  }

  handlePageChange (newPage) {
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
    const toolsCount = this.state.bioToolsData.count
    const { currentPage, itemsCountPerPage, loadingData, loadingPage, bioToolsData } = this.state

    return (
      <Loader loaded={!loadingData}>
        <div>
          {toolsCount
            ? <div>
              {toolsCount > itemsCountPerPage && <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={toolsCount}
                prevPageText='&laquo;'
                nextPageText='&raquo;'
                firstPageText='First'
                lastPageText='Last'
                onChange={this.handlePageChange}
              />}
              <Loader loaded={!loadingPage}>
                <BioToolsTable tools={bioToolsData} pageSize={itemsCountPerPage} />
                {toolsCount > itemsCountPerPage && <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={toolsCount}
                  prevPageText='&laquo;'
                  nextPageText='&raquo;'
                  firstPageText='First'
                  lastPageText='Last'
                  onChange={this.handlePageChange}
                />}
              </Loader>
            </div>
            : <div>
              <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                <h4 className='text-center'>We are sorry, but there are no services.</h4>
              </Alert>
            </div>
          }
        </div>
      </Loader>
    )
  }
}

export default BioToolsFetch
