import React, { useState, useContext } from 'react'
import { Spring } from 'react-spring/renderprops'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'
import loyaltyCardHeading from '../../assets/images/loyaltyCardHeading.png'
import './loyaltyCard.css'

const LoyaltyCard = () => {
  const [email, setEmail] = useState('')

  const {
    state: { loading, userData, emailPreset },
    fetchUserData,
  } = useContext(UniversalContext)

  const renderInstriction = () => {
    if (userData === null || !userData || userData.error) {
      return (
        <div className="loyaltyInstruction">
          enter the email address that was used when you made your last purchase
        </div>
      )
    }
    return (
      <div className="loyaltyInstruction">
        for every 10th stamp you get a R400 voucher
      </div>
    )
  }

  const renderUserStamps = () => {
    if (userData === null || !userData) return null
    if (userData.error) {
      const { email } = userData.error
      return (
        <div className="errorMessagebed">
          <div className="errorMessage">{email}</div>
        </div>
      )
    }
    const { loyaltyStamps } = userData
    return (
      <div className="loyaltyStampNumberbed">
        <div className="loyaltyStampNumber">{loyaltyStamps}/10</div>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div className="loyaltyFormBed">
        <input
          className="loyaltyFormInput"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          className="loyaltyFormButton"
          onClick={() => fetchUserData({ email })}
        >
          <div className="loyaltyFormButtonText">Submit</div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (loading)
      return (
        <div className="loyaltyCardLoaderBed">
          <div className="ui active centered inline loader" />
        </div>
      )
    if (emailPreset) {
      return (
        <div className="loyaltyCardBed">
          {renderInstriction()}
          {renderUserStamps()}
        </div>
      )
    }
    return (
      <div className="loyaltyCardBed">
        {renderInstriction()}
        {!userData ? null : renderUserStamps()}
        {renderForm()}
      </div>
    )
  }

  return (
    <>
      <BurgerMenu />
      <div className="headingImageBed">
        <img
          className="headingImage"
          src={loyaltyCardHeading}
          alt="loyalty-card-heading"
        />
      </div>
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 50, duration: 500 }}
      >
        {(props) => <div style={props}>{renderContent()}</div>}
      </Spring>
    </>
  )
}

export default LoyaltyCard
