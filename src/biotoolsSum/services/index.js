import config from '../common/config'
import * as R from 'ramda'

export const pickData = R.map(
  R.compose(
    R.evolve(
      {
        function: R.compose(R.prop('operation'), R.head),
      }),
    R.pick(['id', 'name', 'homepage', 'version', 'description', 'topic', 'maturity', 'operatingSystem', 'function', 'toolType', 'citations', 'publication'])
  )
)

export function getCitations (id, idType) {
  return fetch(config.getProxyUrl() + config.getConverterApiUrl(`&ids=${id}&idtype=${idType}&format=json`))
    .then(response => response.json())
    .then(idInfo => {
      if (!idInfo.records) {
        return 0
      }
      const pmcid = idInfo.records[0].pmcid
      return fetch(config.getCitationsApiUrl(`${pmcid}/citations/json`))
        .then(response => response.json())
        .then(citations => citations.hitCount)
    })
}

export function getServices (query, page = '?page=1') {
  const url = config.getBioToolsApiUrl(`${page}&collectionID=ELIXIR CZ&sort=name&$ord=asc&${query}`)
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
