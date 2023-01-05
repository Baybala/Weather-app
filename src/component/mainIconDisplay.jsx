import React from 'react'
import '../App.css'

const MainIconDisplay = ({ mainIcon, temp, date, fiveDayData }) => {
  const isTodat =
    new Date(date).toString().slice(0, 15) ===
    new Date().toString().slice(0, 15)
  return (
    <div className="mainIcon col-3">
      {isTodat ? (
        <div
          className="mainIconDisplay"
          style={{
            backgroundImage: `url(${mainIcon})`,
            textAlign: 'left',
          }}
        >
          {temp}
        </div>
      ) : (
        getDateFormated(fiveDayData, date)
      )}
    </div>
  )
}

const getDateFormated = (fiveDayData, currentDate) => {
  console.log(fiveDayData[0])
  for (let i = 0; i < fiveDayData.length; i++) {
    if (
      new Date(currentDate).toString().slice(0, 15) ===
      new Date(fiveDayData[i].date).toString().slice(0, 15)
    ) {
      return (
        <div className="mainIconDisplay" style={{ fontSize: '40px' }}>
          <h2>{fiveDayData[i].weekDay}</h2>
          <h2>{fiveDayData[i].date}</h2>
        </div>
      )
    }
  }
}

export default MainIconDisplay
