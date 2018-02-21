import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const OverlayTooltip = ({ id, tooltipText, children, delayShow = 300, delayHide = 150, placement = 'top' }) => {
  const tooltip = <Tooltip id={id}>{tooltipText}</Tooltip>

  return (
    <OverlayTrigger
      overlay={tooltip}
      placement={placement}
      delayShow={delayShow}
      delayHide={delayHide}
    >
      {children}
    </OverlayTrigger>
  )
}

export default OverlayTooltip
