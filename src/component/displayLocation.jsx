import React from 'react'

const DisplayLocation = ({ loc, date }) => {
  const isTodat =
    new Date(date).toString().slice(0, 15) ===
    new Date().toString().slice(0, 15)
  return (
    <div className="col-3">
      <h5>{`${loc.city} - ${loc.country}`}</h5>
      <h6 style={{ paddingTop: '5px' }}>
        {isTodat ? new Date().toString().slice(0, 15) : ''}
      </h6>
    </div>
  )
}

export default DisplayLocation
