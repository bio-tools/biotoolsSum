import config from '../common/config'
import * as R from 'ramda'

export const pickData = R.map(
  R.compose(
    R.evolve(
      {
        function: R.compose(R.prop('operation'), R.head),
      }),
    R.pick(['id', 'name', 'homepage', 'version', 'description', 'topic', 'maturity', 'operatingSystem', 'function', 'toolType', 'citations'])
  )
)

export function getServices (query, page = '?page=1') {
  const url = config.getUrl(`${page}&collectionID=elixir-cz&$sort=name&$ord=asc&${query}`)
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.next !== null) {
        return getServices(query, data.next)
          .then(nextData =>
            R.evolve({
              list: R.concat(nextData.list),
            }, data)
          )
      }
      return data
    })
}
