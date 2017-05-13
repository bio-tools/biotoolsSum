import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import rnaSequence from '../images/rna-sequence.png'
import dnaSequence from '../images/dna-sequence.png'
import proteinSequence from '../images/protein-sequence.png'
import drugSequence from '../images/drug-sequence.png'
import { Col, Grid, Image } from 'react-bootstrap'

class App extends Component {
  render () {
    return (
      <Grid>
        <table>
          <tbody>
            <tr>
              <th>All Services</th>
              <th>1D sequence</th>
              <th>2D typology</th>
              <th>3D structure</th>
              <th>xD omics</th>
            </tr>
            <tr>
              <td>DNA</td>
              <td>
                <Link to='/services/1d-dna-services'>
                  <Image src={dnaSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/2d-dna-services'>
                  <Image src={dnaSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/3d-dna-services'>
                  <Image src={dnaSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/xd-dna-services'>
                  <Image src={dnaSequence} rounded />
                </Link>
              </td>
            </tr>
            <tr>
              <td>RNA</td>
              <td>
                <Link to='/services/1d-rna-services'>
                  <Image src={rnaSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/2d-rna-services'>
                  <Image src={rnaSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/3d-rna-services'>
                  <Image src={rnaSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/xd-rna-services'>
                  <Image src={rnaSequence} rounded />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>
                <Link to='/services/1d-protein-services'>
                  <Image src={proteinSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/2d-protein-services'>
                  <Image src={proteinSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/3d-protein-services'>
                  <Image src={proteinSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/4d-protein-services'>
                  <Image src={proteinSequence} rounded />
                </Link>
              </td>
            </tr>
            <tr>
              <td><p>Drugs and other small molecules</p></td>
              <td className='greyscale'>
                <Link to='/services/1d-drug-services'>
                  <Image src={drugSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/2d-drug-services'>
                  <Image src={drugSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/3d-drug-services'>
                  <Image src={drugSequence} rounded />
                </Link>
              </td>
              <td>
                <Link to='/services/xd-drug-services'>
                  <Image src={drugSequence} rounded />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
    )
  }
}

export default App
