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
import ShowToolsCount from './ShowToolsCount'

export const ServicesMatrix = ({ match }) => {
  const { collection } = match.params

  const queryString = collection ? `/${collection}/services` : '/services'

  return (
    <Grid>
      <div className='matrix'>
        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>All Services</div>
            </div>
          </div>
        </div>
        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>1D sequence</div>
            </div>
          </div>
        </div>
        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>2D typology</div>
            </div>
          </div>
        </div>
        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>3D structure</div>
            </div>
          </div>
        </div>
        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>xD omics</div>
            </div>
          </div>
        </div>

        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>DNA</div>
            </div>
          </div>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/1d-dna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={dna1D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/2d-dna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={dna2D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/3d-dna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={dna3D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/xd-dna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={dnaxD} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>RNA</div>
            </div>
          </div>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/1d-rna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={rna1D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/2d-rna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={rna2D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/3d-rna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={rna3D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/xd-rna-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={rnaxD} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>Protein</div>
            </div>
          </div>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/1d-protein-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={protein1D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/2d-protein-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={protein2D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/3d-protein-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={protein3D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/xd-protein-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={proteinxD} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className='square dark-grey-background'>
          <div className='square-content'>
            <div className='table'>
              <div className='table-cell text-big'>Drugs and other small molecules</div>
            </div>
          </div>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/1d-drug-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={drug1D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/2d-drug-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={drug2D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/3d-drug-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={drug3D} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='square light-grey-background greyscale'>
          <Link to={`${queryString}/xd-drug-services`}>
            <div className='square-content'>
              <div className='table'>
                <div className='table-cell'>
                  <Image src={drugxD} rounded className='responsive-img' />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <ShowToolsCount collection={collection} />
    </Grid>
  )
}
