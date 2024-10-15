import NavbarContext from 'contexts/NavbarContext';
import React, { useContext, useEffect } from 'react'

interface IndicatorContainerProps extends React.PropsWithChildren {
  title: string;
}

const IndicatorContainer: React.FC<IndicatorContainerProps> = ({ children, title }) => {
  const { changeNavTitle } = useContext(NavbarContext);

  useEffect(() => {
    if (title !== '') {
      changeNavTitle(title);
    }
  }, [title])

  return (
    <>
      {children}
    </>
  )
}

export default IndicatorContainer