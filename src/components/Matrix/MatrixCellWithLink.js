import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

const MatrixCellWithLink = ({ linkTo, image, text, numberOfServices }) => {
  return (
    <div className='square light-grey-background greyscale'>
      <Link to={linkTo}>
        <div className='square-content'>
          <div className='table'>
            <div className='table-cell text-big'>
              {image
                ? <Image src={image} className={`responsive-img ${!numberOfServices ? 'grey' : ''}`} />
                : text && <span>{text}</span>}
              <div className='text-little'>{numberOfServices}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MatrixCellWithLink
