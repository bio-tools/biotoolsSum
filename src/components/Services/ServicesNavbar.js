import React, { PureComponent } from 'react'
import { Image, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import * as R from 'ramda'
import { AbstractionCategory, ALL_SERVICES } from '../../constants/stringConstants'
import { connect } from 'react-redux'
import * as ActionTypes from '../../constants/actionTypes'
import buildActionCreators from '../../helpers/buildActionCreators'
import elixirLogo from '../../images/elixir-logo.png'
import { config } from '../../common/helperFunctions'

class ServicesNavbar extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      activeMenuItemKey: null,
    }
  }

  handleSelect = eventKey => {
    this.setState({ activeMenuItem: eventKey })
  }

  render () {
    const { changeReportPageVisibility, showReportPage } = this.props
    const { activeMenuItem } = this.state

    return (
      <Navbar collapseOnSelect bsStyle='default'>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src={elixirLogo} responsive style={{ width: '97px', height: '73px', marginTop: '-10px', marginBottom: '-15px' }} />
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to='/'>{'Services Matrix'}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={activeMenuItem} onSelect={this.handleSelect}>
            <LinkContainer to={`/${ALL_SERVICES}`}>
              <NavItem eventKey={-1}>
                {'All Services'}
              </NavItem>
            </LinkContainer>
            {config.rows.map((row, rowIndex) =>
              <NavDropdown key={rowIndex} eventKey={rowIndex} title={row.name} id={`${row.name}-nav-dropdown`}>
                {R.take(4, row.cells).map((cell, cellIndex) => R.isEmpty(cell) || !cell.route
                  ? null
                  : <LinkContainer key={cellIndex} to={`/${cell.route}`}>
                    <MenuItem eventKey={`${rowIndex}.${cellIndex}`}>
                      {`${row.name} ${AbstractionCategory[cellIndex]}`}
                    </MenuItem>
                  </LinkContainer>
                )}
              </NavDropdown>
            )}
          </Nav>
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
