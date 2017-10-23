import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { MatrixCell } from './MatrixCell'
import { MatrixCellWithLink } from './MatrixCellWithLink'
import { getServicesCounts } from '../../selectors/servicesSelector'
import { data } from '../../constants/servicesInfo'
import { camelCased, requireImage } from '../../common/helperFunctions'
import { AbstractionCategory, ALL_SERVICES } from '../../constants/stringConstants'
import * as R from 'ramda'

class ServicesMatrix extends PureComponent {
  render () {
    const { servicesCounts } = this.props

    return (
      <div className='matrix'>
        <MatrixCellWithLink
          linkTo={`/${ALL_SERVICES}`}
          text='All services'
          numberOfServices={servicesCounts[camelCased(ALL_SERVICES)]}
        />
        <MatrixCell text={AbstractionCategory[0]} />
        <MatrixCell text={AbstractionCategory[1]} />
        <MatrixCell text={AbstractionCategory[2]} />
        <MatrixCell text={AbstractionCategory[3]} />
        {data.rows.map(row =>
          <div key={row.name}>
            <MatrixCell text={row.name} />
            {R.take(4, row.cells).map((cell, cellIndex) => R.isEmpty(cell) || !cell.route
              ? <MatrixCell key={cellIndex} />
              : <MatrixCellWithLink
                key={cell.route}
                linkTo={`/${cell.route}`}
                image={requireImage(cell.route)}
                numberOfServices={servicesCounts[camelCased(cell.route)]}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

export default ServicesMatrix = connect(state => ({ servicesCounts: getServicesCounts(state) }))(ServicesMatrix)
