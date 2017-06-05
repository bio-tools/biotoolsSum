import React, { PureComponent } from 'react'
import { MenuItem, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

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
    const { collection } = this.props.match.params

    const queryString = collection ? `/${collection}/services` : '/services'

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={queryString}>All Services</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={this.state.activeMenuItem} onSelect={this.handleSelect}>
            <NavDropdown eventKey={1} title='DNA Services' id='dna-nav-dropdown'>
              <LinkContainer to={`${queryString}/1d-dna-services`}>
                <MenuItem eventKey={1.1}>1D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/2d-dna-services`}>
                <MenuItem eventKey={1.2}>2D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/3d-dna-services`}>
                <MenuItem eventKey={1.3}>3D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/xd-dna-services`}>
                <MenuItem eventKey={1.4}>xD DNA Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={2} title='RNA Services' id='rna-nav-dropdown'>
              <LinkContainer to={`${queryString}/1d-rna-services`}>
                <MenuItem eventKey={2.1}>1D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/2d-rna-services`}>
                <MenuItem eventKey={2.2}>2D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/3d-rna-services`}>
                <MenuItem eventKey={2.3}>3D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/xd-rna-services`}>
                <MenuItem eventKey={2.4}>xD RNA Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={3} title='Protein Services' id='protein-nav-dropdown'>
              <LinkContainer to={`${queryString}/1d-protein-services`}>
                <MenuItem eventKey={3.1}>1D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/2d-protein-services`}>
                <MenuItem eventKey={3.2}>2D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/3d-protein-services`}>
                <MenuItem eventKey={3.3}>3D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/xd-protein-services`}>
                <MenuItem eventKey={3.4}>xD Protein Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={4} title='Drug Services' id='drug-nav-dropdown'>
              <LinkContainer to={`${queryString}/1d-drug-services`}>
                <MenuItem eventKey={4.1}>1D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/2d-drug-services`}>
                <MenuItem eventKey={4.2}>2D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/3d-drug-services`}>
                <MenuItem eventKey={4.3}>3D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${queryString}/xd-drug-services`}>
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
