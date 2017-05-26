import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image } from 'react-bootstrap'
import dna1D from '../images/1d-dna.png'
import dna2D from '../images/2d-dna.png'
import dna3D from '../images/3d-dna.png'
import dnaxD from '../images/xd-dna.png'
import rna1D from '../images/1d-rna.png'
import rna2D from '../images/2d-rna.png'
import rna3D from '../images/3d-rna.png'
import rnaxD from '../images/xd-rna.png'
import protein1D from '../images/1d-protein.png'
import protein2D from '../images/2d-protein.png'
import protein3D from '../images/3d-protein.png'
import proteinxD from '../images/xd-protein.png'
import drug1D from '../images/1d-drug.png'
import drug2D from '../images/2d-drug.png'
import drug3D from '../images/3d-drug.png'
import drugxD from '../images/xd-drug.png'

export const ServicesMatrix = () => (
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
              <Image src={dna1D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/2d-dna-services'>
              <Image src={dna2D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/3d-dna-services'>
              <Image src={dna3D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/xd-dna-services'>
              <Image src={dnaxD} rounded />
            </Link>
          </td>
        </tr>
        <tr>
          <td>RNA</td>
          <td>
            <Link to='/services/1d-rna-services'>
              <Image src={rna1D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/2d-rna-services'>
              <Image src={rna2D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/3d-rna-services'>
              <Image src={rna3D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/xd-rna-services'>
              <Image src={rnaxD} rounded />
            </Link>
          </td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>
            <Link to='/services/1d-protein-services'>
              <Image src={protein1D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/2d-protein-services'>
              <Image src={protein2D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/3d-protein-services'>
              <Image src={protein3D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/4d-protein-services'>
              <Image src={proteinxD} rounded />
            </Link>
          </td>
        </tr>
        <tr>
          <td><p>Drugs and other small molecules</p></td>
          <td className='greyscale'>
            <Link to='/services/1d-drug-services'>
              <Image src={drug1D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/2d-drug-services'>
              <Image src={drug2D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/3d-drug-services'>
              <Image src={drug3D} rounded />
            </Link>
          </td>
          <td>
            <Link to='/services/xd-drug-services'>
              <Image src={drugxD} rounded />
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  </Grid>
)
