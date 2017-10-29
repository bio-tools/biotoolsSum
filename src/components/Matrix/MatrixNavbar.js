import React, { PureComponent } from 'react'
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as ActionTypes from '../../constants/actionTypes'
import buildActionCreators from '../../helpers/buildActionCreators'
import elixirLogo from '../../images/elixir-logo.png'

class ServicesNavbar extends PureComponent {
  render () {
    const { changeReportPageVisibility, showReportPage } = this.props

    return (
      <Navbar collapseOnSelect bsStyle='default'>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src={elixirLogo} responsive style={{ width: '112px', height: '73px', marginTop: '-10px', marginBottom: '-15px' }} />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem onClick={changeReportPageVisibility}>
              {showReportPage ? 'Info mode' : 'Report mode'}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default ServicesNavbar = connect(state => ({
  showReportPage: state.ui.showReportPage,
}), buildActionCreators({
  changeReportPageVisibility: ActionTypes.REPORT_PAGE_CHANGE_VISIBILITY,
}))(ServicesNavbar)
