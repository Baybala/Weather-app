import axios from 'axios'

const DetailedData = ({ data }) => {
  const comp = async function () {
    return await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=40.37&lon=49.83&appid=83ce2730c09f1d570400c729326561e4`,
    )
  }

  comp()

  let keyMake = 1
  const columns = [
    {
      items: [
        'Temperature °C',
        'Feels like',
        'Pressure hPa',
        'Humidity %',
        'Wind m/s',
      ],
      key: '100',
    },
    ...data.map((item) => {
      keyMake++
      return {
        items: {
          temperature: [item.maxTem, item.minTem],
          feelsLike: item.feelsLike,
          pressure: item.pressure,
          humidity: item.humidity,
          wind: { speed: item.wind.speed, deg: item.wind.deg },
        },
        key: keyMake,
      }
    }),
  ]

  const objectKeys = function () {
    const items = []
    for (let key in columns[1].items) {
      items.push(key)
    }
    return items
  }

  const degByLetter = (degrees) => {
    // Define array of directions
    const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖']
    degrees = (degrees * 8) / 360
    degrees = Math.round(degrees, 0)
    degrees = (degrees + 8) % 8

    return directions[degrees]
  }

  return (
    <div className="col-9 row">
      <div
        className="col-2"
        style={{
          paddingTop: '75px',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}
      >
        <table className="table table-sm table-borderless">
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {columns[0].items.map((item) => {
              keyMake++
              return (
                <tr key={keyMake}>
                  <th>{item}</th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="col">
        <table className="table table-striped table-sm">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              {data.map((item) => {
                keyMake++
                return <th key={keyMake}>{item.time}</th>
              })}
            </tr>
            <tr style={{ textAlign: 'center' }}>
              {data.map((item) => {
                keyMake++
                return (
                  <th key={keyMake}>
                    <img
                      style={{ width: '40px' }}
                      src={item.smallIcon}
                      alt="icon"
                    ></img>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {objectKeys().map((i) => {
              keyMake++
              return (
                <tr key={keyMake}>
                  {columns.slice(1).map((obj) => (
                    <td key={obj.key} style={{ textAlign: 'center' }}>
                      {!obj.items[i].speed && !obj.items[i][0]
                        ? obj.items[i]
                        : obj.items[i].speed
                        ? `${obj.items[i].speed} ${degByLetter(
                            obj.items[i].deg,
                          )} `
                        : `${obj.items[i][0]}/${obj.items[i][1]}`}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailedData
