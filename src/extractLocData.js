import condtByCode from './country_by_code.json'

const locationData = (data) => {
  return data.map((d) => {
    return {
      city: d.name,
      country: country(d.country)[0].Name,
      lat: d.lat,
      lon: d.lon,
    }
  })[0]
}

export default locationData

function country(code) {
  return condtByCode.filter((c) => c.Code === code)
}
