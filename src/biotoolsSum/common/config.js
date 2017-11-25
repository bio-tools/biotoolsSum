export default class config {
  static getBioToolsApiUrl (path) {
    return `https://bio.tools/api/tool/${path}`
  }

  static getCitationsApiUrl (src, id, page) {
    return `https://www.ebi.ac.uk/europepmc/webservices/rest/${src}/${id}/citations/${page}/1000/json`
    // https://www.ebi.ac.uk/europepmc/webservices/rest/MED/20972220/citations/1/1000/json
  }

  static getPublicationInfoApiUrl (id) {
    return `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${id}&format=json`
    // https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=ext_id:27174934%20src:med&format=json
  }
}
