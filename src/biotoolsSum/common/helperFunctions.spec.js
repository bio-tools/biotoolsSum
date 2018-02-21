import { createQueryString, hyphenDelimitedToCamelCased } from './helperFunctions'

test('Create empty query string', () => {
  const parameters = {}
  expect(createQueryString(parameters)).toEqual('')
})

test('Create simple query string', () => {
  const parameters = {
    q: 'hello-world',
    number: 25,
    character: 'a',
    zero: 0,
  }
  expect(createQueryString(parameters)).toEqual('q=hello-world&number=25&character=a&zero=0')
})

test('Create query string with collectionID', () => {
  const parameters = {
    q: 'hello-world',
    number: 25,
    character: 'a',
    zero: 0,
    collectionID: 'collection 3',
  }
  expect(createQueryString(parameters)).toEqual('q=hello-world&number=25&character=a&zero=0&collectionID="collection 3"')
})

test('Create empty camel cased string', () => {
  expect(hyphenDelimitedToCamelCased('')).toEqual('')
})

test('Create camel cased string', () => {
  const str = 'hello-everyone'
  expect(hyphenDelimitedToCamelCased(str)).toEqual('helloEveryone')
})

test('Nothing changes when not hyphen delimited', () => {
  const str = 'hello everyone'
  expect(hyphenDelimitedToCamelCased(str)).toEqual(str)
})
