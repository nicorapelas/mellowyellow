import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context as UniversalContext } from '../../context/UniversalContext'
import './loyaltyCard.css'

const LoyaltyCard = () => {
  const { errorReset, successReset } = useContext(UniversalContext)

  const renderContent = () => {
    return (
      <div className="loyaltyCardButtonBed">
        <Link
          to="/loyalty-card"
          onClick={() => {
            errorReset()
            successReset()
          }}
          title="loyalty card"
        >
          <div className="headerLinkText">loyalty card</div>
        </Link>
      </div>
    )
  }

  return renderContent()
}

export default LoyaltyCard
