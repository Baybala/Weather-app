import axios from 'axios'
import { toast } from 'react-toastify'

const apiEndpoint = async (city, lat, lon) => {
  try {
    const data = city
      ? await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=6dfa39d9f602ca18617dfc9922ed95d6`,
        )
      : await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6dfa39d9f602ca18617dfc9922ed95d6`,
        )
    return data
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast('Please check the if you typed correct city')
    } else if (ex.response && ex.response.status > 400) {
      toast('There is problem with your account')
    }
  }
}

export default apiEndpoint
