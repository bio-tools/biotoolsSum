import * as R from 'ramda'

export const createQueryString = R.compose(
  R.join('&'),
  R.map(R.join('=')),
  R.toPairs,
  R.evolve({
    collectionID: collectionID => `"${collectionID}"`,
  }),
)

export const camelCased = string => string.replace(/-([a-z0-9])/g, match => match[1].toUpperCase())

const imageExtensions = ['svg', 'png', 'jpg', 'jpeg', 'gif']

export const requireImage = imageName => {
  let image = null

  for (let i = 0; i < imageExtensions.length; i++) {
    try {
      image = require(`../images/${imageName}.${imageExtensions[i]}`)

      if (image) {
        break
      }
    } catch (e) {

    }
  }

  return image
}
