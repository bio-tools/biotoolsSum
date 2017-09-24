import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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
    const { more, less, chars, text } = this.props
    const { expanded } = this.state

    const showText = expanded ? text : text.slice(0, chars)

    return (
      <div>
        <span>{showText}</span>
        {text.length > chars &&
          <span>
            {expanded ? ' ' : '... '}
            <a href='#' onClick={this.toggleLines}>{expanded ? less : more}</a>
          </span>
        }
      </div>
    )
  }
}

ReadMore.defaultProps = {
  chars: 50,
  more: 'Show more',
  less: 'Show less',
}

ReadMore.propTypes = {
  more: PropTypes.string,
  less: PropTypes.string,
  chars: PropTypes.number,
}
