import NavbarContext from 'contexts/NavbarContext'
import { useContext, useEffect } from 'react'

const IndicadoresGenerales = () => {
  const { changeNavTitle } = useContext(NavbarContext);

  useEffect(() => {
    changeNavTitle('Indicadores generales')
  }, [])

  return (
    <div>IndicadoresGenerales</div>
  )
}

export default IndicadoresGenerales