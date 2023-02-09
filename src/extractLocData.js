import { toast } from 'react-toastify'
import condtByCode from './country_by_code.json'
import apiEndpoint from './apiEndpoint'

const locationData = async (input) => {
  try {
    const { data } = await apiEndpoint(input, null, null)
    if (data.length === 0) throw new Error('Wrong Input')
    return data[0].state
      ? data.map((d) => {
          return {
            city: d.name,
            country: country(d.country)[0].Name,
            lat: d.lat,
            lon: d.lon,
          }
        })[0]
      : null
  } catch (er) {
    toast('There is somwthing wrong with your input', {
      position: 'top-center',
      theme: 'dark',
    })
  }
}

export default locationData

function country(code) {
  return condtByCode.filter((c) => c.Code === code)
}
