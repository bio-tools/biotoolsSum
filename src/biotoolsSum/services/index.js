import config from '../common/config'
import * as R from 'ramda'

export const pickData = R.map(
  R.compose(
    R.evolve(
      {
        function: R.compose(R.prop('operation'), R.head),
      }),
    R.pick(['id', 'name', 'homepage', 'version', 'description', 'topic', 'maturity', 'operatingSystem', 'function', 'toolType'])
  )
)

export function getServices (query, page = 1) {
  const url = config.getUrl(`?collectionID=elixir-cz&$sort=name&$ord=asc&page=${page}&${query}`)
  console.log(url)
  return fetch(url).then(response => response.json())
}
