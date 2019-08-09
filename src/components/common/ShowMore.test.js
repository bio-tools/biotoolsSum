import React from 'react'
import renderer from 'react-test-renderer'
import ShowMore from './ShowMore'

it('Renders ShowMore correctly', () => {
  const list = [
    {
      term: 'term1',
      uri: 'https://www.google.com/',
    },
    {
      term: 'term2',
      uri: 'https://www.google.com/',
    },
    {
      term: 'term3',
      uri: 'https://www.google.com/',
    },
    {
      term: 'term4',
      uri: 'https://www.google.com/',
    },
  ]

  const tree = renderer
    .create(
      <ShowMore lines={3} searchTermName='operation' list={list} ulClassName='table-list-item' />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
