import React from 'react'
import renderer from 'react-test-renderer'
import ReadMore from './ReadMore'

it('Renders ReadMore correctly', () => {
  const tree = renderer
    .create(
      <ReadMore text='Lorem Ipsum Something Latinische' more='Show more' less='Show less' chars={10} />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
