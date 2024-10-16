import { Grid2 as Grid, Paper, Typography, Zoom } from '@mui/material'
import { BarChart, PieChart } from '@mui/x-charts'

const GraficoDePrueba = () => {
  return (
    <>
      <Typography variant='h5'>Los gráficos que se muestran a continuación son únicamente ilustrativos.</Typography>
      <br />
      <Grid container spacing={3}>
        <Grid>
          <Zoom in={true}>
            <Paper sx={{ padding: 2 }}> {/* padding 2 = 32px */}
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
              />
            </Paper>
          </Zoom>
        </Grid>
        <Grid>
          <Grid container spacing={3} direction='column'> {/* spaccing 3 = 24px */}
            <Grid>
              <Zoom in={true}>
                <Paper sx={{ padding: 2 }} >
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: 'series A' },
                          { id: 1, value: 15, label: 'series B' },
                          { id: 2, value: 20, label: 'series C' },
                        ],
                      },
                    ]}
                    width={250}
                    height={122}
                  />
                </Paper>
              </Zoom>
            </Grid>
            <Grid>
              <Zoom in={true}>
                <Paper sx={{ padding: 2 }} >
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: 'series A' },
                          { id: 1, value: 15, label: 'series B' },
                          { id: 2, value: 20, label: 'series C' },
                        ],
                      },
                    ]}
                    width={250}
                    height={122}
                  />
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default GraficoDePrueba