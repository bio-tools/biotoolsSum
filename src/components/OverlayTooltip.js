import * as React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const OverlayTooltip = ({ id, tooltipText, children }) => {
  const tooltip = <Tooltip id={id}>{tooltipText}</Tooltip>

  return (
    <OverlayTrigger
      overlay={tooltip} placement='top'
      delayShow={300} delayHide={150}
      >
      {children}
    </OverlayTrigger>
  )
}
