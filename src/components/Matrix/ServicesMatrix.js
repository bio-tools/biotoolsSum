import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { MatrixCell } from './MatrixCell'
import { MatrixCellWithLink } from './MatrixCellWithLink'
import { getAllServicesCounts } from '../../selectors/servicesSelector'
import * as ServicesNames from '../../constants/routeConstants'
import { data } from '../../constants/servicesInfo'
import { camelCased } from '../../common/helperFunctions'

class ServicesMatrix extends PureComponent {
  render () {
    const { allServicesCounts } = this.props

    return (
      <div className='matrix'>
        <MatrixCellWithLink linkTo={`/services/${ServicesNames.ALL_SERVICES_ROUTE}`} text='All services' numberOfServices={allServicesCounts['allServices']} />
        <MatrixCell text='1D sequence' />
        <MatrixCell text='2D topology' />
        <MatrixCell text='3D structure' />
        <MatrixCell text='xD omics' />
        {data.rows.map(row =>
          <div key={row.name}>
            <MatrixCell text={row.name} />
            {row.cells.map(cell =>
              <MatrixCellWithLink
                key={cell.route}
                linkTo={`/services/${camelCased(cell.route)}`}
                image={require(`../../images/${cell.route}.png`)}
                numberOfServices={allServicesCounts[camelCased(cell.route)]}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

export default ServicesMatrix = connect(state => ({
  allServicesCounts: getAllServicesCounts(state),
})
)(ServicesMatrix)
