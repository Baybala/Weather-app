import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import dataExtract from './dataExtract'
import fiveDayDataExtract from './fiveDayData'
import locationData from './extractLocData'
import DisplayLocation from './component/displayLocation'
import Search from './component/search'
import MainIconDisplay from './component/mainIconDisplay'
import DetailedData from './component/detailedData'
import DisplayButtons from './component/displayButtons'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Chart from './component/chart'

axios.interceptors.response.use(null, (error) => {
  const unexpErr = error.response && error.response.status >= 200
  if (!unexpErr) {
    toast('An unexpected error accured')
  }
  console.log(unexpErr)
  return Promise.reject(error)
})

class App extends Component {
  state = {
    location: {
      city: 'Baku',
      country: 'AZ',
      lat: '',
      lon: '',
    },

    extractedData: '',

    date: new Date(),

    fiveDayData: '',
  }

  searchInput = React.createRef()

  async componentDidMount() {
    try {
      const { data: locData } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=40.37&lon=49.83&appid=83ce2730c09f1d570400c729326561e4`,
      )

      const extractedData = dataExtract(locData)
      const fiveDayData = fiveDayDataExtract(locData)
      this.setState({ extractedData, fiveDayData })
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        toast('There is problem with API key')
      }
    }
  }

  handleSearchSubmit = async (date) => {
    const inputValue =
      this.searchInput.current.value || this.state.location.city

    const isDateString = typeof date === 'string'

    if (inputValue) {
      try {
        const { data: locData } = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=83ce2730c09f1d570400c729326561e4`,
        )

        if (locData.length > 0) {
          const location = locationData(locData)
          const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=83ce2730c09f1d570400c729326561e4`,
          )

          const fiveDayData = fiveDayDataExtract(data)
          const extractedData = isDateString
            ? dataExtract(data, new Date(date))
            : dataExtract(data)
          const d_t = isDateString ? date : new Date()

          this.setState({ location, extractedData, fiveDayData, date: d_t })
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 401) {
          toast('There is problem with API key')
        }
      }
    }
  }

  render() {
    const { location, extractedData, fiveDayData, date } = this.state

    return (
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
            <Search
              inputRef={this.searchInput}
              onClicked={this.handleSearchSubmit}
            />
          </div>

          <div className="row">
            <MainIconDisplay
              mainIcon={
                this.state.extractedData[0] &&
                this.state.extractedData[0].mainIcon
              }
              temp={extractedData && extractedData[0].maxTem}
              date={date}
              fiveDayData={fiveDayData}
            />
            {extractedData && <DetailedData data={extractedData} />}
          </div>

          <div
            className="row"
            style={{ textAlign: 'center', width: '80%', margin: 'auto' }}
          >
            <DisplayButtons
              data={fiveDayData}
              date={date}
              clicked={this.handleSearchSubmit}
            />
            <Chart data={fiveDayData} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
