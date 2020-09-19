import React, { useState, useContext, useEffect } from 'react'
import { Spring } from 'react-spring/renderprops'

import { Context as UniversalContext } from '../../context/UniversalContext'
import BurgerMenu from '../bits/BurgerMenu'
import deliveryDetails from '../../assets/images/deliveryDetails.png'
import './checkout.css'

const CheckoutForm = ({ history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const {
    state: {
      loading,
      errorApi,
      successApi,
      emailPreset,
      firstNamePreset,
      lastNamePreset,
      phoneNumberPreset,
      addressLine1Preset,
      addressLine2Preset,
      cityPreset,
      provincePreset,
      postalCodePreset,
      totalOrderAmout,
    },
    createUser,
    validateDeliveryForm,
    errorReset,
    emailPresetAssign,
    emailPresetReset,
    firstNamePresetAssign,
    firstNamePresetReset,
    lastNamePresetAssign,
    lastNamePresetReset,
    phoneNumberPresetAssign,
    phoneNumberPresetReset,
    addressLine1PresetAssign,
    addressLine1PresetReset,
    addressLine2PresetAssign,
    addressLine2PresetReset,
    cityPresetAssign,
    cityPresetReset,
    provincePresetAssign,
    provincePresetReset,
    postalCodePresetAssign,
    postalCodePresetReset,
  } = useContext(UniversalContext)

  useEffect(() => {
    if (emailPreset) setEmail(emailPreset)
    if (firstNamePreset) setFirstName(firstNamePreset)
    if (lastNamePreset) setLastName(lastNamePreset)
    if (phoneNumberPreset) setPhoneNumber(phoneNumberPreset)
    if (addressLine1Preset) setAddressLine1(addressLine1Preset)
    if (addressLine2Preset) setAddressLine2(addressLine2Preset)
    if (cityPreset) setCity(cityPreset)
    if (provincePreset) setProvince(provincePreset)
    if (postalCodePreset) setPostalCode(postalCodePreset)
  }, [])

  useEffect(() => {
    if (totalOrderAmout === null || totalOrderAmout === 75)
      history.push('/products')
    forwardUser()
  })

  const runFormValidation = () => {
    validateDeliveryForm({
      email,
      phoneNumber,
      firstName,
      lastName,
      addressLine1,
      city,
      postalCode,
    })
  }

  const forwardUser = () => {
    if (!successApi || successApi === null) {
      return null
    } else {
      emailPresetAssign(email)
      firstNamePresetAssign(firstName)
      lastNamePresetAssign(lastName)
      phoneNumberPresetAssign(phoneNumber)
      addressLine1PresetAssign(addressLine1)
      addressLine2PresetAssign(addressLine2)
      cityPresetAssign(city)
      provincePresetAssign(province)
      postalCodePresetAssign(postalCode)
      createUser({
        email,
        phoneNumber,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        province,
        postalCode,
      })
      history.push('/preflight')
    }
  }

  const renderForm = () => {
    return (
      <div className="checkoutFormBed">
        <div className="checkoutFormBed">
          <input
            className="checkoutFormInput"
            placeholder="email address"
            value={emailPreset ? emailPreset : email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => {
              emailPresetReset()
              errorReset()
            }}
          />
          {!errorApi || errorApi === null ? null : (
            <div className="errorMessagebed">
              <div className="errorMessage">{errorApi.email}</div>
            </div>
          )}
        </div>
        <input
          className="checkoutFormInput"
          placeholder="phone number"
          value={phoneNumberPreset ? phoneNumberPreset : phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onFocus={() => {
            phoneNumberPresetReset()
            errorReset()
          }}
        />
        {!errorApi || errorApi === null ? null : (
          <div className="errorMessagebed">
            <div className="errorMessage">{errorApi.phoneNumber}</div>
          </div>
        )}
        <input
          className="checkoutFormInput"
          placeholder="first name"
          value={firstNamePreset ? firstNamePreset : firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onFocus={() => {
            firstNamePresetReset()
            errorReset()
          }}
        />
        {!errorApi || errorApi === null ? null : (
          <div className="errorMessagebed">
            <div className="errorMessage">{errorApi.firstName}</div>
          </div>
        )}
        <input
          className="checkoutFormInput"
          placeholder="last name"
          value={lastNamePreset ? lastNamePreset : lastName}
          onChange={(e) => setLastName(e.target.value)}
          onFocus={() => {
            lastNamePresetReset()
            errorReset()
          }}
        />
        {!errorApi || errorApi === null ? null : (
          <div className="errorMessagebed">
            <div className="errorMessage">{errorApi.lastName}</div>
          </div>
        )}
        <input
          className="checkoutFormInput"
          placeholder="street address"
          value={addressLine1Preset ? addressLine1Preset : addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          onFocus={() => {
            addressLine1PresetReset()
            errorReset()
          }}
        />
        {!errorApi || errorApi === null ? null : (
          <div className="errorMessagebed">
            <div className="errorMessage">{errorApi.addressLine1}</div>
          </div>
        )}
        <input
          className="checkoutFormInput"
          placeholder="suburb"
          value={addressLine2Preset ? addressLine2Preset : addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          onFocus={() => {
            addressLine2PresetReset()
            errorReset()
          }}
        />
        <input
          className="checkoutFormInput"
          placeholder="city"
          value={cityPreset ? cityPreset : city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => {
            cityPresetReset()
            errorReset()
          }}
        />
        {!errorApi || errorApi === null ? null : (
          <div className="errorMessagebed">
            <div className="errorMessage">{errorApi.city}</div>
          </div>
        )}
        <input
          className="checkoutFormInput"
          placeholder="province"
          value={provincePreset ? provincePreset : province}
          onChange={(e) => setProvince(e.target.value)}
          onFocus={() => {
            provincePresetReset()
            errorReset()
          }}
        />
        <input
          className="checkoutFormInput"
          placeholder="postal code"
          value={postalCodePreset ? postalCodePreset : postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          onFocus={() => {
            postalCodePresetReset()
            errorReset()
          }}
        />
        {!errorApi || errorApi === null ? null : (
          <div className="errorMessagebed">
            <div className="errorMessage">{errorApi.postalCode}</div>
          </div>
        )}
        <div className="checkoutFormButton" onClick={runFormValidation}>
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
      <>
        <BurgerMenu />
        <div className="headingImageBed">
          <img
            className="headingImage"
            src={deliveryDetails}
            alt="delivery-details"
          />
        </div>
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 60, duration: 600 }}
        >
          {(props) => (
            <div style={props} className="checkoutCardBed">
              {renderForm()}
            </div>
          )}
        </Spring>
      </>
    )
  }
  return renderContent()
}

export default CheckoutForm
