import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Panel } from 'react-bootstrap'
import MatrixCell from './MatrixCell'
import MatrixCellWithLink from './MatrixCellWithLink'
import { getServicesCounts } from '../../selectors/servicesSelector'
import { camelCased, config } from '../../common/helperFunctions'
import { AbstractionCategory, ALL_SERVICES } from '../../constants/stringConstants'

class ServicesMatrix extends PureComponent {
  render () {
    const { servicesCounts } = this.props

    const panelHeader = (
      <div className='center-text'>
        <h4>{'Category selection matrix '}</h4>
      </div>
    )

    return (
      <Panel bsStyle='warning' header={panelHeader}>
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
          {config.rows.map(row =>
            <div key={row.name}>
              <MatrixCell text={row.name} />
              {R.take(4, row.cells).map((cell, cellIndex) => R.isEmpty(cell) || !cell.route
                ? <MatrixCell key={cellIndex} />
                : <MatrixCellWithLink
                  key={cell.route}
                  linkTo={`/${cell.route}`}
                  image={process.env.PUBLIC_URL + `/images/${cell.image}`}
                  numberOfServices={servicesCounts[camelCased(cell.route)]}
                />
              )}
            </div>
          )}
        </div>
      </Panel>
    )
  }
}

export default ServicesMatrix = connect(state => ({
  servicesCounts: getServicesCounts(state),
}))(ServicesMatrix)
