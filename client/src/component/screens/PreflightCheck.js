import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import Script from 'react-load-script'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'
import preflightHeading from '../../assets/images/preflightHeading.png'
import editPen from '../../assets/images/editPenBlue.png'
import './preflightCheck.css'

const PreflightCheck = ({ history }) => {
  const {
    state: {
      loading,
      emailPreset,
      firstNamePreset,
      lastNamePreset,
      phoneNumberPreset,
      addressLine1Preset,
      addressLine2Preset,
      cityPreset,
      provincePreset,
      postalCodePreset,
      ointmentQuantity,
      oilQuantity,
      comboQuantity,
      totalOrderAmout,
      payFastSubmitData,
    },
    successReset,
    paySubmit,
    createOrder,
  } = useContext(UniversalContext)

  useEffect(() => {
    successReset()
  }, [])

  useEffect(() => {
    checkUserInfoPreset()
  })

  const checkUserInfoPreset = () => {
    if (
      !emailPreset ||
      !phoneNumberPreset ||
      !firstNamePreset ||
      !lastNamePreset ||
      !addressLine1Preset ||
      !cityPreset ||
      !postalCodePreset
    ) {
      return history.push('/checkout-form')
    } else {
      return null
    }
  }

  const renderDeliveryDetails = () => {
    return (
      <div className="preflightDetailsBed">
        <div className="preflightItemBed">
          <div className="preflightLabel">first name</div>
          <div>{firstNamePreset}</div>
        </div>
        <div className="preflightItemBed">
          <div className="preflightLabel">last name</div>
          <div>{lastNamePreset}</div>
        </div>
        <div className="preflightItemBed">
          <div className="preflightLabel">email</div>
          <div>{emailPreset}</div>
        </div>
        <div className="preflightItemBed">
          <div className="preflightLabel">phone</div>
          <div>{phoneNumberPreset}</div>
        </div>
        <div className="preflightItemBed">
          <div className="preflightLabel">delivery address</div>
          <div>{addressLine1Preset}</div>
          <div>{addressLine2Preset}</div>
          <div>{cityPreset}</div>
          <div>{provincePreset}</div>
          <div>{postalCodePreset}</div>
        </div>
        <div className="preflightEditBtnBed">
          <Link className="preflightEditBtn" to="/checkout-form">
            <div className="preflightEditBtnText">edit</div>
            <img
              className="preflughtEditBtnIcon"
              src={editPen}
              alt="edit-pen"
            />
          </Link>
        </div>
      </div>
    )
  }

  const orderDetails = () => {
    return (
      <div className="preflightDetailsBed">
        {ointmentQuantity === 0 ? null : (
          <div className="preflightItemBed">
            <div className="preflightLabel">CBD ointment</div>
            <div>X {ointmentQuantity}</div>
          </div>
        )}
        {oilQuantity === 0 ? null : (
          <div className="preflightItemBed">
            <div className="preflightLabel">CBD oil</div>
            <div>X {oilQuantity}</div>
          </div>
        )}
        {comboQuantity === 0 ? null : (
          <div className="preflightItemBed">
            <div className="preflightLabel">CBD combo</div>
            <div>X {comboQuantity}</div>
          </div>
        )}
        <div>
          <div className="preflightLabel">TOTAL</div>
          <div>R{totalOrderAmout}</div>
        </div>
        <div className="preflightEditBtnBed">
          <Link className="preflightEditBtn" to="/shopping-cart">
            <div className="preflightEditBtnText">edit</div>
            <img
              className="preflughtEditBtnIcon"
              src={editPen}
              alt="edit-pen"
            />
          </Link>
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
      <div className="preflightBed">
        {renderDeliveryDetails()}
        {orderDetails()}
        <div className="preflightToPayButtonBed">
          <div
            className="preflightToPayButton"
            onClick={() =>
              paySubmit({
                name_first: firstNamePreset,
                name_last: lastNamePreset,
                email_address: emailPreset,
                cell_number: phoneNumberPreset,
                amount: totalOrderAmout,
                item_name: 'CBD_products',
              })
            }
          >
            <div className="preflightToPayButtonText">continue to checkout</div>
          </div>
        </div>
      </div>
    )
  }

  const payFastForm = () => {
    if (!payFastSubmitData || payFastSubmitData === null) {
      return null
    } else {
      console.log(payFastSubmitData)

      return window.payfast_do_onsite_payment({ uuid: payFastSubmitData })
    }
  }

  const handleScriptCreate = () => {
    console.log(`payfast script create`)
  }

  const handleScriptError = () => {
    console.log(`payfast script error`)
  }

  const handleScriptLoad = () => {
    console.log(`payfast script fully loaded`)
  }

  return (
    <>
      <Script
        url="https://www.payfast.co.za/onsite/engine.js"
        onCreate={handleScriptCreate}
        onError={handleScriptError}
        onLoad={handleScriptLoad}
      />
      <BurgerMenu />
      {payFastForm()}
      <div className="headingImageBed">
        <img
          className="headingImage"
          src={preflightHeading}
          alt="preflight-heading"
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

export default PreflightCheck
