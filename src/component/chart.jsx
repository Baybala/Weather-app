import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts'

const Chart = ({ data }) => {
  return (
    <div>
      <AreaChart
        width={730}
        height={150}
        data={data && data}
        margin={{
          top: 40,
          right: 5,
          bottom: -10,
          left: 5,
        }}
      >
        <XAxis dataKey=" " />
        <YAxis />
        <Area
          dataKey="temperature"
          stroke="rgba(16, 14, 23, 0.988)"
          fill="#1184dd"
        />
        <Tooltip />
      </AreaChart>
    </div>
  )
}

export default Chart
