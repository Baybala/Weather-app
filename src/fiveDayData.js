import _ from 'lodash'

const fiveDayData = (data) => {
  return extractDates(
    filterBayDate(filterByDay(data)),
    identifyMinMaxTemp(data),
  )
}

export default fiveDayData

//filter by date and extract data from single date
const filterBayDate = (filteredData) => {
  const dates = filteredData.map((d) => d.dt_txt.slice(0, 10))

  return dates
    .map((v, i) => (dates.indexOf(v) === i ? filteredData[i] : 'ignore'))
    .filter((v) => v !== 'ignore')
}

//filter by day time to generate day icon
const filterByDay = (data) => {
  return [
    data.list[0],
    ...data.list.filter((item) => {
      return item.sys.pod === 'd'
    }),
  ]
}

//find out minimum and maximum temeratur for each day
const identifyMinMaxTemp = (data) => {
  const splitByDate = []
  let arrByDate = []
  let controlDate = data.list[0].dt_txt.slice(0, 10)

  const allDates = data.list.map((d) => d.dt_txt.slice(0, 10))

  for (let i = 0; i < allDates.length; i++) {
    if (controlDate === allDates[i]) {
      arrByDate.push({
        date: allDates[i],
        max: data.list[i].main.temp_max,
        min: data.list[i].main.temp_min,
      })
    } else {
      splitByDate.push(arrByDate)
      arrByDate = []
      arrByDate.push({
        date: allDates[i],
        max: data.list[i].main.temp_max,
        min: data.list[i].main.temp_min,
      })
    }
    if (i === allDates.length - 1) {
      splitByDate.push(arrByDate)
    }
    controlDate = allDates[i]
  }

  return {
    max: splitByDate.map((item) => _.orderBy(item, 'max', 'desc')[0]),
    min: splitByDate.map((item) => _.orderBy(item, 'min', 'asc')[0]),
  }
}

// final extract required data (day of the week, date, icon)
const extractDates = (data, temData) => {
  return data.map((d, index) => {
    const date = new Date(d.dt_txt)
    return {
      weekDay: daysOfTheWeek[new Date(d.dt_txt).getDay()],
      date: `${date.getDate()}-${
        month[date.getMonth()]
      }-${date.getFullYear().toString().slice(2, 4)}`,
      iconPath: `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`,
      temperature: [
        Math.round(temData.max[index].max - 273.15),
        Math.round(temData.min[index].min - 273.15),
      ],
    }
  })
}

const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
