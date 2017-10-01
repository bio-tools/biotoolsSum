import React, { PureComponent } from 'react'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import * as Type from '../../constants/routeConstants'
import { data } from '../../constants/servicesInfo'
import { camelCased } from '../../common/helperFunctions'

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
            <LinkContainer to={`/services/allServices`}>
              <NavItem eventKey={0}>
                {'All Services'}
              </NavItem>
            </LinkContainer>
            {data.rows.map((row, rowIndex) =>
              <NavDropdown key={rowIndex} eventKey={rowIndex + 1} title={row.name} id={`${row.name}-nav-dropdown`}>
                {row.cells.map((cell, cellIndex) =>
                  <LinkContainer key={cellIndex} to={`/services/${camelCased(cell.route)}`}>
                    <MenuItem eventKey={`${rowIndex + 1}.${cellIndex + 1}`}>
                      {cell.name}
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
