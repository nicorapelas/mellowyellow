import React, { useContext } from 'react'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'

const PaymentMethod = () => {
  const {
    state: {
      loading,
      errorApi,
      emailPreset,
      goods,
      totalOrderAmout,
      userDataLocal,
    },
  } = useContext(UniversalContext)

  console.log(`Hey hy hey`)

  console.log(userDataLocal)

  const renderContent = () => {
    return <div>payment method</div>
  }

  return (
    <>
      <BurgerMenu />
      {renderContent()}
    </>
  )
}

export default PaymentMethod
