import React, { Component } from 'react'
import {MenuItem, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom'

class ServicesNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeMenuItemKey: 1.1,
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (eventKey, event) {
    this.setState({ activeMenuItem: eventKey })
    console.log(event)
  }

  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/services'>All Services</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={this.state.activeMenuItem} onSelect={this.handleSelect}>
            <NavDropdown eventKey={1} title='DNA Services' id='dna-nav-dropdown'>
              <MenuItem eventKey={1.1}>
                <NavLink to='/services/dna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  1D DNA Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={1.2}>
                <NavLink to='/services/dna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  2D DNA Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={1.3}>
                <NavLink to='/services/dna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  3D DNA Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={1.4}>
                <NavLink to='/services/dna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  xD DNA Services
                </NavLink>
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={2} title='RNA Services' id='rna-nav-dropdown'>
              <MenuItem eventKey={2.1}>
                <NavLink to='/services/rna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  1D RNA Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={2.2}>
                <NavLink to='/services/rna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  2D RNA Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={2.3}>
                <NavLink to='/services/rna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  3D RNA Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={2.4}>
                <NavLink to='/services/rna-services' style={{ textDecoration: 'none', color: 'black' }}>
                  xD RNA Services
                </NavLink>
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title='Protein Services' id='protein-nav-dropdown'>
              <MenuItem eventKey={3.1}>
                <NavLink to='/services/protein-services' style={{ textDecoration: 'none', color: 'black' }}>
                  1D Protein Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={3.2}>
                <NavLink to='/services/protein-services' style={{ textDecoration: 'none', color: 'black' }}>
                  2D Protein Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={3.3}>
                <NavLink to='/services/protein-services' style={{ textDecoration: 'none', color: 'black' }}>
                  3D Protein Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={3.4}>
                <NavLink to='/services/protein-services' style={{ textDecoration: 'none', color: 'black' }}>
                  xD Protein Services
                </NavLink>
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title='Drug Services' id='drug-nav-dropdown'>
              <MenuItem eventKey={4.1}>
                <NavLink to='/services/search-services' style={{ textDecoration: 'none', color: 'black' }}>
                  1D Drug Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={4.2}>
                <NavLink to='/services/search-services' style={{ textDecoration: 'none', color: 'black' }}>
                  2D Drug Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={4.3}>
                <NavLink to='/services/search-services' style={{ textDecoration: 'none', color: 'black' }}>
                  3D Drug Services
                </NavLink>
              </MenuItem>
              <MenuItem eventKey={4.4}>
                <NavLink to='/services/search-services' style={{ textDecoration: 'none', color: 'black' }}>
                  xD Drug Services
                </NavLink>
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default ServicesNavbar
