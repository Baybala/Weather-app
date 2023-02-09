import iconData from './iconPath.json'

//extract data from given API at the given date

const dataExtract = (data, date = new Date()) => {
  const selectedByDate = getDataBySelectedDate(data, date)
  const retData = []

  for (let i = 0; i < selectedByDate.length; i++) {
    const getIcon =
      selectedByDate[i].weather[0].main + '_' + selectedByDate[i].sys.pod
    const smallIconPath = `http://openweathermap.org/img/wn/${selectedByDate[i].weather[0].icon}@2x.png`

    const maximumTemp = Math.round(selectedByDate[i].main.temp_max - 273.15)
    const minimumTemp = Math.round(selectedByDate[i].main.temp_min - 273.15)

    retData.push({
      maxTem: maximumTemp > 0 ? '+' + maximumTemp : maximumTemp,
      minTem: minimumTemp > 0 ? '+' + minimumTemp : minimumTemp,
      feelsLike: Math.round(selectedByDate[i].main.feels_like - 273.15),
      humidity: selectedByDate[i].main.humidity,
      pressure: selectedByDate[i].main.pressure,
      main: `./bgImg/${selectedByDate[i].sys.pod}/${selectedByDate[i].weather[0].main}.jpg`,
      wind: {
        deg: selectedByDate[i].wind.deg,
        speed: selectedByDate[i].wind.speed,
      },
      smallIcon: smallIconPath,
      mainIcon: iconData[getIcon],
      time: selectedByDate[i].dt_txt.slice(11, 16),
    })
  }

  return retData
}

export default dataExtract

// get the data from the API according to the selected date

function getDataBySelectedDate(data, date) {
  return data.list.filter(
    (d) =>
      parseDate(new Date(d.dt_txt)).getTime() === parseDate(date).getTime(),
  )
}

//to bring to the same time of the date for further comparision

function parseDate(date) {
  const dt = date.getDate()
  const ye = date.getFullYear()
  const mo = date.getMonth() + 1
  return new Date(mo + '/' + dt + '/' + ye)
}
