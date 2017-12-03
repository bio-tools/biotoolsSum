import React from 'react'
import renderer from 'react-test-renderer'
import NavbarTextField from './NavbarTextField'

it('Renders NavbarTextField with placeholder correctly', () => {
  const tree = renderer
    .create(<NavbarTextField placeholder='Write something' />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('Renders NavbarTextField without placeholder correctly', () => {
  const tree = renderer
    .create(<NavbarTextField />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
