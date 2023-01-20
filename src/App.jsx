import React, { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import dataExtract from './dataExtract'
import fiveDayDataExtract from './fiveDayData'
import { ToastContainer, toast } from 'react-toastify'
import locationData from './extractLocData'
import DisplayLocation from './component/displayLocation'
import Search from './component/search'
import MainIconDisplay from './component/mainIconDisplay'
// import DetailedData from './component/detailedData'
import DisplayButtons from './component/displayButtons'
import Chart from './component/chart'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const DetailedData = React.lazy(() => import('./component/detailedData'))

axios.interceptors.response.use(null, (error) => {
  const unexpErr = error.response && error.response.status >= 200
  if (!unexpErr) {
    toast('An unexpected error accured')
  }
  console.log(unexpErr)
  return Promise.reject(error)
})

function Apps() {
  const [location, setLocation] = useState({
    city: 'Baku',
    country: 'AZ',
    lat: '',
    lon: '',
  })

  const [extractedData, extractData] = useState('')
  const [fiveDayData, extractFiveDateData] = useState('')
  const [date, setDate] = useState(new Date())

  const searchInput = React.createRef()

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data: locData } = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=40.37&lon=49.83&appid=83ce2730c09f1d570400c729326561e4`,
        )
        extractData(dataExtract(locData))
        extractFiveDateData(fiveDayDataExtract(locData))
      }
      fetchData()
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        toast('There is problem with API key')
      }
    }
  }, [])

  const handleSearchSubmit = async (date) => {
    const inputValue = searchInput.current.value || location.city

    const isDateString = typeof date === 'string'

    if (inputValue) {
      try {
        const { data: locData } = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=83ce2730c09f1d570400c729326561e4`,
        )

        console.log(locData)

        if (locData.length > 0) {
          const location = locationData(locData)
          const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=83ce2730c09f1d570400c729326561e4`,
          )

          extractFiveDateData(fiveDayDataExtract(data))
          const extractedData = isDateString
            ? dataExtract(data, new Date(date))
            : dataExtract(data)
          const d_t = isDateString ? date : new Date()

          setLocation(locationData(locData))
          extractData(extractedData)
          setDate(d_t)
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 401) {
          toast('There is problem with API key')
        }
      }
    }
  }

  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <div
        className="window"
        style={{
          backgroundImage: `url(${extractedData && extractedData[0].main})`,
        }}
      >
        <div
          style={{ margin: 'auto', width: '70%', padding: '10px' }}
          className="container"
        >
          <ToastContainer />
          <div style={{ fontSize: '50px' }}>Weather</div>

          <div className="row" style={{ height: '50px' }}>
            <DisplayLocation loc={location && location} date={date} />
            <Search inputRef={searchInput} onClicked={handleSearchSubmit} />
          </div>

          <div className="row">
            {extractedData && (
              <MainIconDisplay
                mainIcon={extractedData[0].mainIcon}
                temp={extractedData[0].maxTem}
                date={date}
                fiveDayData={fiveDayData}
              />
            )}

            {extractedData && <DetailedData data={extractedData} />}
          </div>

          <div
            className="row"
            style={{ textAlign: 'center', width: '80%', margin: 'auto' }}
          >
            <DisplayButtons
              data={fiveDayData}
              date={date}
              clicked={handleSearchSubmit}
            />
            <Chart data={fiveDayData} />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Apps
