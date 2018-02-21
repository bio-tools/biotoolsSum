import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import FontAwesome from 'react-fontawesome'
import OverlayTooltip from './OverlayTooltip'

export default class ReadMore extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
    }
  }

  toggleLines = (e) => {
    // Stops <a href=# </a> from scrolling to the top of the page
    e.preventDefault()

    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render () {
    const { list, more, less, lines, searchTermName, ulClassName } = this.props
    const { expanded } = this.state

    const showList = expanded ? list : R.take(lines, list)

    return (
      <div>
        <ul className={ulClassName}>
          {showList.map((item, index) => {
            return <li key={index}>
              <a href={`https://bio.tools/?${searchTermName}=${item.term}`} target='_blank'>
                {item.term}
              </a>
              <OverlayTooltip id='tooltip-windows' tooltipText={`EDAM: ${item.term}`}>
                <a href={item.uri} target='_blank'>
                  <FontAwesome className='icons' name='question-circle' />
                </a>
              </OverlayTooltip>
            </li>
          })}
        </ul>
        {list.length > lines &&
          <span className='table-showmore-button'>
            <a href='#' onClick={this.toggleLines}>{expanded ? less : more}</a>
          </span>
        }
      </div>
    )
  }
}

ReadMore.defaultProps = {
  lines: 3,
  more: 'Show more',
  less: 'Show less',
}

ReadMore.propTypes = {
  list: PropTypes.array,
  more: PropTypes.string,
  less: PropTypes.string,
  lines: PropTypes.number,
}
