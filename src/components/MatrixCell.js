import * as React from 'react'
import { Image } from 'react-bootstrap'

export const MatrixCell = ({ image, text }) => {
  return (
    <div className='square dark-grey-background'>
      <div className='square-content'>
        <div className='table'>
          <div className='table-cell text-big'>
            {image && <Image src={image} rounded className='responsive-img' />}
            {text && <span>{text}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
