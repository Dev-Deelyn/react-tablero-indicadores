import NavbarContext from 'contexts/NavbarContext'
import { useContext, useEffect } from 'react'
import { indicadores_tasas } from 'utils/exampleDatasets';
import BoxComponent from 'components/charts/BoxComponent';
import PreloadedLineChart from './../../components/charts/PreloadedLineChart';

const IndicadoresGenerales = () => {
  const { changeNavTitle } = useContext(NavbarContext);

  useEffect(() => {
    changeNavTitle('Indicadores generales')
  }, [])

  return (
    <div>
      <p>IndicadoresGenerales</p>
      {/* <BoxComponent data={indicadores_tasas}/> */}
      <PreloadedLineChart />
    </div>
  )
}

export default IndicadoresGenerales