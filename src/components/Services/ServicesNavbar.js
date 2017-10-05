import React, { PureComponent } from 'react'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { data } from '../../constants/servicesInfo'
import { camelCased } from '../../common/helperFunctions'
import * as R from 'ramda'
import { AbstractionCategory, ALL_SERVICES } from '../../constants/stringConstants'

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
    return (
      <Navbar collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/services'>{'Services Matrix'}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={this.state.activeMenuItem} onSelect={this.handleSelect}>
            <LinkContainer to={`/services/${ALL_SERVICES}`}>
              <NavItem eventKey={-1}>{'All Services'}</NavItem>
            </LinkContainer>
            {data.rows.map((row, rowIndex) =>
              <NavDropdown key={rowIndex} eventKey={rowIndex} title={row.name} id={`${row.name}-nav-dropdown`}>
                {R.take(4, row.cells).map((cell, cellIndex) => R.isEmpty(cell) || !cell.route
                  ? null
                  : <LinkContainer key={cellIndex} to={`/services/${cell.route}`}>
                    <MenuItem eventKey={`${rowIndex}.${cellIndex}`}>
                      {`${row.name} ${AbstractionCategory[cellIndex]}`}
                    </MenuItem>
                  </LinkContainer>
                )}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default ServicesNavbar
