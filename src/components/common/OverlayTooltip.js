import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const OverlayTooltip = ({ id, tooltipText, children, delayShow, delayHide, placement }) => {
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

OverlayTooltip.defaultProps = {
  delayShow: 300,
  delayHide: 150,
  placement: 'top',
}
