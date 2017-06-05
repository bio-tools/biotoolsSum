import * as React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

export const MatrixCellWithLink = ({ queryString, image, text }) => {
  return (
    <div className='square light-grey-background greyscale'>
      <Link to={`${queryString}/1d-rna-services`}>
        <div className='square-content'>
          <div className='table'>
            <div className='table-cell'>
              {image && <Image src={image} rounded className='responsive-img' />}
              {text && <span>{text}</span>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}