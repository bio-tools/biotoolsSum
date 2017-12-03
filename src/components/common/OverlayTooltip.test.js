import React from 'react'
import renderer from 'react-test-renderer'
import OverlayTooltip from './OverlayTooltip'

it('Renders OverlayTooltip correctly', () => {
  const tree = renderer
    .create(
      <OverlayTooltip id='overlay_snapshot' tooltipText='This is overlay snapshot'>
        <span>{'OverlayTooltip child'}</span>
      </OverlayTooltip>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
