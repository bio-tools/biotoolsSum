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
import {
  allowCollectionChange, allowReportMode, config,
  showOnlyAllServicesInCollection
} from '../../biotoolsSum/common/helperFunctions'
import NavbarForm from './NavbarForm'
import {Route} from "react-router";

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
            {!showOnlyAllServicesInCollection && <Link to='/'>{'Services Matrix'}</Link>}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {!showOnlyAllServicesInCollection &&
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
          }
          {allowCollectionChange &&
            <Navbar.Form pullRight>
              <NavbarForm />
            </Navbar.Form>
          }
          {allowReportMode && <Route exact path="/" render={(props) => (
          <Nav pullRight>
              <NavItem onClick={changeReportPageVisibility}>
                {showReportPage ? 'Info mode' : 'Report mode'}
              </NavItem>
            </Nav>
          )}/>}
          <Nav pullRight>
            <NavDropdown eventKey={'view'} title="View" id="page-nav-dropdown">
                <LinkContainer active={false} exact key="overview" to={'/'}>
                    <MenuItem eventKey={"view-overview"}>Overview</MenuItem>
                </LinkContainer>
                <LinkContainer active={false} key="basic" to={'/views/basic'}>
                    <MenuItem eventKey={"view-basic"}>Basic</MenuItem>
                </LinkContainer>
                <LinkContainer active={false} key="evaluation" to={'/views/evaluation'}>
                    <MenuItem eventKey={"view-evaluation"}>Evaluation</MenuItem>
                </LinkContainer>
                <LinkContainer active={false} key="scientometry" to={'/views/scientometry'}>
                    <MenuItem eventKey={"view-scientometry"}>Scientometry</MenuItem>
                </LinkContainer>
            </NavDropdown>
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
9