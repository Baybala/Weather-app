import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import dataExtract from './dataExtract'
import fiveDayDataExtract from './fiveDayData'
import { ToastContainer, toast } from 'react-toastify'
import locationData from './extractLocData'
import DisplayLocation from './component/displayLocation'
import Search from './component/search'
import MainIconDisplay from './component/mainIconDisplay'
import DetailedData from './component/detailedData'
import DisplayButtons from './component/displayButtons'
import Chart from './component/chart'
import _ from 'lodash'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import apiEndpoint from './apiEndpoint'

axios.interceptors.response.use(null, (error) => {
  const expErr = error.response && error.response.status >= 200
  if (!expErr) {
    console.log(error, 'Unexpected Error')
    toast('An unexpected error accured')
  }
  return Promise.reject(error)
})

function Apps() {
  const [locationFromAPI, setLocationFromAPI] = useState(null)
  const [mainData, setMainData] = useState('')
  const [dataByDate, setDataByDate] = useState('')
  const [date, setDate] = useState(new Date())
  const [locationDisplayData, setLoactionDisplayData] = useState(null)

  let location = {
    city: 'Baku',
    country: 'AZ',
    lat: '40.37',
    lon: '49.83',
  }

  useEffect(() => {
    fetchData(location.lat, location.lon)
    setLocationFromAPI(location)
    setLoactionDisplayData(location)
  }, [])

  const handleChange = useMemo(
    () =>
      _.debounce(async (e) => {
        e.target.value && setLocationFromAPI(await locationData(e.target.value))
      }, 300),
    [],
  )

  const handleKeyDown = (e, date) => {
    let isDateString = typeof date === 'string'

    if (e.key === 'Enter' || isDateString) {
      if (!locationFromAPI) return

      location = locationFromAPI
      setLoactionDisplayData(locationFromAPI)
      fetchData(location.lat, location.lon, isDateString, date)
    }
  }

  async function fetchData(lat, lon, dateCheck, date) {
    const { data: locData } = await apiEndpoint(null, lat, lon)
    setDataByDate(fiveDayDataExtract(locData))
    const extractedData = dateCheck
      ? dataExtract(locData, new Date(date))
      : dataExtract(locData)
    const d_t = dateCheck ? date : new Date()
    setMainData(extractedData)
    setDate(d_t)
  }

  return (
    <div
      className="window"
      style={{
        backgroundImage: `url(${mainData && mainData[0].main})`,
      }}
    >
      <div
        style={{ margin: 'auto', width: '70%', padding: '10px' }}
        className="container"
      >
        <ToastContainer position="top-center" theme="dark" />
        <div style={{ fontSize: '50px' }}>Weather</div>

        <div className="row" style={{ height: '50px' }}>
          {locationDisplayData && (
            <DisplayLocation loc={locationDisplayData} date={date} />
          )}
          <Search onChange={handleChange} onKeyDown={handleKeyDown} />
        </div>
        {mainData && (
          <div className="row">
            <MainIconDisplay
              mainIcon={mainData[0].mainIcon}
              temp={mainData[0].maxTem}
              location={location && location}
              date={date}
              fiveDayData={dataByDate}
            />
            <DetailedData data={mainData} />
          </div>
        )}

        <div
          className="row"
          style={{ textAlign: 'center', width: '80%', margin: 'auto' }}
        >
          <DisplayButtons
            data={dataByDate}
            date={date}
            clicked={handleKeyDown}
          />
          {dataByDate && <Chart data={dataByDate} />}
        </div>
      </div>
    </div>
  )
}

export default Apps
