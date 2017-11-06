export default class BioToolsConfig {
  static getBioToolsApiUrl (path) {
    return `https://bio.tools/api/tool/${path}`
  }

  static getProxyUrl () {
    return 'https://cors-anywhere.herokuapp.com/'
  }

  static getConverterApiUrl (path) {
    return `https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=bio.toolsSum&email=dan.polansky@gmail.com${path}`
  }

  static getCitationsApiUrl (path) {
    return `http://www.ebi.ac.uk/europepmc/webservices/rest/MED/${path}`
  }

  static getPublicationInfoApiUrl (id) {
    return `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${id}&format=json`
    // return 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=ext_id:27174934%20src:med&format=json'
  }
}
