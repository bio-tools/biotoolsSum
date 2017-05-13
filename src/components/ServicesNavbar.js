import React, { Component } from 'react'
import {MenuItem, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'

class ServicesNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeMenuItemKey: null,
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (eventKey, event) {
    console.log('eventKey, ', eventKey)
    this.setState({ activeMenuItem: eventKey })
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
              <LinkContainer to='/services/1d-dna-services'>
                <MenuItem eventKey={5}>1D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/2d-dna-services'>
                <MenuItem eventKey={6}>2D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/3d-dna-services'>
                <MenuItem eventKey={7}>3D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/xd-dna-services'>
                <MenuItem eventKey={8}>xD DNA Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={2} title='RNA Services' id='rna-nav-dropdown'>
              <LinkContainer to='/services/1d-rna-services'>
                <MenuItem eventKey={2.1}>1D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/2d-rna-services'>
                <MenuItem eventKey={2.2}>2D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/3d-rna-services'>
                <MenuItem eventKey={2.3}>3D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/xd-rna-services'>
                <MenuItem eventKey={2.4}>xD RNA Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={3} title='Protein Services' id='protein-nav-dropdown'>
              <LinkContainer to='/services/1d-protein-services'>
                <MenuItem eventKey={3.1}>1D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/2d-protein-services'>
                <MenuItem eventKey={3.2}>2D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/3d-protein-services'>
                <MenuItem eventKey={3.3}>3D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/xd-protein-services'>
                <MenuItem eventKey={3.4}>xD Protein Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={4} title='Drug Services' id='drug-nav-dropdown'>
              <LinkContainer to='/services/1d-drug-services'>
                <MenuItem eventKey={4.1}>1D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/2d-drug-services'>
                <MenuItem eventKey={4.2}>2D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/3d-drug-services'>
                <MenuItem eventKey={4.3}>3D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to='/services/xd-drug-services'>
                <MenuItem eventKey={4.4}>xD Drug Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default ServicesNavbar
