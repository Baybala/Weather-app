import '../css/buttonStyle.css'

const DisplayButtons = ({ data, clicked, date }) => {
  return (
    data &&
    data.map((item) => {
      const t = item.temperature[0]
      const d = new Date(item.date)
      const colorValid = item.date === date && 'rgb(151, 198, 238)'
      return (
        <div
          key={item.date}
          className="col buttons"
          style={{ backgroundColor: colorValid }}
          onClick={() => clicked(item.date)}
        >
          <div>
            <img className="icomImg" src={item.iconPath} alt="weather Icon" />
          </div>
          <h6>{`${d.toString().slice(0, 10)}`}</h6>
          <h4>{t > 0 ? '+' + t : t}</h4>
        </div>
      )
    })
  )
}

export default DisplayButtons
