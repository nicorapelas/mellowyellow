import React, { useContext, useState, useEffect } from 'react'
import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'

const FindUser = ({ history }) => {
  const [email, setEmail] = useState('')

  const {
    state: {
      loading,
      userData,
      emailPreset,
      phoneNumberPreset,
      namePreset,
      addressLine1Preset,
      cityPreset,
      postalCodePreset,
    },
    fetchUserData,
    emailPresetAssign,
  } = useContext(UniversalContext)

  useEffect(() => {
    checkUserInfoPreset()
  })

  const renderError = () => {
    if (userData === null || !userData) return null
    if (userData.error) {
      const { email } = userData.error
      if (email === `'Email address' not found`) return null
      return (
        <div className="errorMessagebed">
          <div className="errorMessage">{email}</div>
        </div>
      )
    }
  }

  const checkUserInfoPreset = () => {
    if (
      !emailPreset ||
      !phoneNumberPreset ||
      !namePreset ||
      !addressLine1Preset ||
      !cityPreset ||
      !postalCodePreset
    ) {
      return history.push('/checkout-form')
    } else {
      return history.push('/preflight')
    }
  }

  const renderForm = () => {
    if (loading)
      return (
        <div className="checkoutCardLoaderBed">
          <div className="ui active centered inline loader" />
        </div>
      )
    return (
      <div className="checkoutFormBed">
        <input
          className="checkoutFormInput"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          className="checkoutFormButton"
          onClick={() => {
            fetchUserData({ email })
            emailPresetAssign(email)
          }}
        >
          Submit
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (loading)
      return (
        <div className="checkoutCardLoaderBed">
          <div className="ui active centered inline loader" />
        </div>
      )
    return (
      <div className="checkoutCardBed">
        <h1>checkout</h1>
        <div className="checkoutInstruction">
          please enter your email address
        </div>
        {renderError()}
        {renderForm()}
      </div>
    )
  }

  return (
    <>
      <BurgerMenu />
      {renderContent()}
    </>
  )
}

export default FindUser
