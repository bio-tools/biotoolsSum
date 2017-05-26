import React from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const OverlayTooltip = ({ id, tooltipText, children, delayShow, delayHide, placement }) => {
  const tooltip = <Tooltip id={id}>{tooltipText}</Tooltip>

  return (
    <OverlayTrigger
      overlay={tooltip} placement={placement}
      delayShow={delayShow} delayHide={delayHide}
      >
      {children}
    </OverlayTrigger>
  )
}

OverlayTooltip.defaultProps = {
  delayShow: 300,
  delayHide: 150,
  placement: 'top',
}

OverlayTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  tooltipText: PropTypes.string.isRequired,
  delayShow: PropTypes.number,
  delayHide: PropTypes.number,
  placement: PropTypes.string,
}
