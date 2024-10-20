import { EChart } from '@kbox-labs/react-echarts'
 
function LineChartExample() {
  return (
    <EChart
      renderer={'svg'}
      onClick={() => console.log('clicked!')}
      style={{
        height: '600px',
        width: '100%'
      }}
      xAxis={{
        type: 'category'
      }}
      yAxis={{
        type: 'value',
        boundaryGap: [0, '30%']
      }}
      series={[
        {
          type: 'line',
          data: [
            ['2022-10-17', 300],
            ['2022-10-18', 100]
          ]
        }
      ]}
    />
  )
}

export default LineChartExample