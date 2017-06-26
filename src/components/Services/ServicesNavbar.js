import React, { PureComponent } from 'react'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import * as Type from '../../constants/servicesConstants'

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

    const collectionAndServicesUrl = collection ? `/${collection}/services` : '/services'

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={collectionAndServicesUrl}>Services Matrix</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={this.state.activeMenuItem} onSelect={this.handleSelect}>
            <LinkContainer to={`${collectionAndServicesUrl}/${Type.ALL_SERVICES}`}>
              <NavItem eventKey={0}>All Services</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={1} title='DNA Services' id='dna-nav-dropdown'>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DNA_1D_SERVICES}`}>
                <MenuItem eventKey={1.2}>1D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DNA_2D_SERVICES}`}>
                <MenuItem eventKey={1.3}>2D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DNA_3D_SERVICES}`}>
                <MenuItem eventKey={1.4}>3D DNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DNA_XD_SERVICES}`}>
                <MenuItem eventKey={1.5}>xD DNA Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={2} title='RNA Services' id='rna-nav-dropdown'>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.RNA_1D_SERVICES}`}>
                <MenuItem eventKey={2.2}>1D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.RNA_2D_SERVICES}`}>
                <MenuItem eventKey={2.3}>2D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.RNA_3D_SERVICES}`}>
                <MenuItem eventKey={2.4}>3D RNA Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.RNA_XD_SERVICES}`}>
                <MenuItem eventKey={2.5}>xD RNA Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={3} title='Protein Services' id='protein-nav-dropdown'>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.PROTEIN_1D_SERVICES}`}>
                <MenuItem eventKey={3.2}>1D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.PROTEIN_2D_SERVICES}`}>
                <MenuItem eventKey={3.3}>2D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.PROTEIN_3D_SERVICES}`}>
                <MenuItem eventKey={3.4}>3D Protein Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.PROTEIN_XD_SERVICES}`}>
                <MenuItem eventKey={3.5}>xD Protein Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={4} title='Drug Services' id='drug-nav-dropdown'>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DRUG_1D_SERVICES}`}>
                <MenuItem eventKey={4.2}>1D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DRUG_2D_SERVICES}`}>
                <MenuItem eventKey={4.3}>2D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DRUG_3D_SERVICES}`}>
                <MenuItem eventKey={4.4}>3D Drug Services</MenuItem>
              </LinkContainer>
              <LinkContainer to={`${collectionAndServicesUrl}/${Type.DRUG_XD_SERVICES}`}>
                <MenuItem eventKey={4.5}>xD Drug Services</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default ServicesNavbar
