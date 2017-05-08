import React, { Component } from 'react'
import R from 'ramda'
import 'whatwg-fetch'
import ToolsTable from './BioToolsTable'
import Pagination from 'react-js-pagination'
import Loader from 'react-loader'

class BioToolsFetch extends Component {
  constructor (props) {
    super(props)

    this.handlePageChange = this.handlePageChange.bind(this)

    this.state = {
      bioToolsData: { list: [], count: 0 },
      currentPage: 1,
      itemsCountPerPage: 25,
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

    const url = this.props.url.concat(`&page=${newPage}`)

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

    return (
      <Loader loaded={!this.state.loadingData}>
        <div>
          {toolsCount
            ? <div>
              <p className='lead'>There are {toolsCount} services available.</p>
              {toolsCount > 25 && <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={toolsCount}
                prevPageText='&laquo;'
                nextPageText='&raquo;'
                firstPageText='First'
                lastPageText='Last'
                onChange={this.handlePageChange}
              />}
              <Loader loaded={!this.state.loadingPage}>
                <ToolsTable tools={this.state.bioToolsData} />
                {toolsCount > 25 && <Pagination
                  activePage={this.state.currentPage}
                  itemsCountPerPage={this.state.itemsCountPerPage}
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
              <h2 className='text-center'>We are sorry, but there are no services.</h2>
            </div>
          }
        </div>
      </Loader>
    )
  }
}

export default BioToolsFetch
