import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'
import contactUsHeading from '../../assets/images/contactUsHeading.png'
import messageSent from '../../assets/images/messageSent.png'
import './contactUs.css'

const ContactUs = ({ history }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const {
    state: { loading, errorApi, successApi },
    submitEnquirey,
  } = useContext(UniversalContext)

  const renderContent = () => {
    if (loading)
      return (
        <div className="checkoutCardLoaderBed">
          <div className="ui active centered inline loader" />
        </div>
      )
    if (!successApi || successApi === null)
      return (
        <div className="contactUsFormBed">
          <div className="contactUsFormContainer">
            <input
              className="contactUsFormInput"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!errorApi || errorApi === null ? null : (
              <div className="errorMessagebed">
                <div className="errorMessage">{errorApi.name}</div>
              </div>
            )}
            <input
              className="contactUsFormInput"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {!errorApi || errorApi === null ? null : (
              <div className="errorMessagebed">
                <div className="errorMessage">{errorApi.phone}</div>
              </div>
            )}
            <input
              className="contactUsFormInput"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!errorApi || errorApi === null ? null : (
              <div className="errorMessagebed">
                <div className="errorMessage">{errorApi.email}</div>
              </div>
            )}
            <textarea
              className="contactUsFormTextarea"
              placeholder="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {!errorApi || errorApi === null ? null : (
              <div className="errorMessagebed">
                <div className="errorMessage">{errorApi.message}</div>
              </div>
            )}
            <div className="contactUsSubmitButtonBed">
              <div
                className="contactUsSubmitButton"
                onClick={() => {
                  submitEnquirey({ name, email, phone, message })
                }}
              >
                <div className="contactUsSubmitButtonText">submit</div>
              </div>
            </div>
          </div>
        </div>
      )
    return (
      <div className="contactUsSuccessBed">
        <div className="contactUsSuccessContainer">
          <div className="contactUsSuccessImageBed">
            <img
              className="contactUsSuccessImage"
              src={messageSent}
              alt="mwssage-sent"
            />
          </div>
          <div className="contactUsSuccessButtonBed">
            <Link to="/products" className="contactUsSuccessButton">
              <div className="contactUsSuccessButtonText">back to products</div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="headingImageBed">
        <img
          className="headingImage"
          src={contactUsHeading}
          alt="contact-us-heading"
        />
      </div>
      <BurgerMenu />
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

export default ContactUs
