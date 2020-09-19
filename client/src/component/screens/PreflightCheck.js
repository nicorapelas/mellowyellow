import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

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
    return (
      <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
        <input type="hidden" name="merchant_id" value="10000100" />
        <input type="hidden" name="merchant_key" value="46f0cd694581a" />
        <input
          type="hidden"
          name="return_url"
          value="https://www.example.com/success"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="https://www.example.com/cancel"
        />
        <input
          type="hidden"
          name="notify_url"
          value="https://www.example.com/notify"
        />

        <input type="hidden" name="amount" value="100.00" />
        <input type="hidden" name="item_name" value="Test Product" />
        <input
          type="hidden"
          name="signature"
          value="f103e22c0418655fb03991538c51bfd5"
        />
        <input type="submit" />
      </form>
    )
  }

  const crypto = require('crypto')

  const generateSignature = (data, passPhrase = null) => {
    // Create parameter string
    let pfOutput = ''
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== '') {
          pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
            /%20/g,
            ' + '
          )}&`
        }
      }
    }

    // Remove last ampersand
    let getString = pfOutput.slice(0, -1)
    if (passPhrase !== null) {
      getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
        /%20/g,
        '+'
      )}`
    }

    return crypto.createHash('md5').update(getString).digest('hex')
  }

  const myData = []
  // Merchant details
  myData['merchant_id'] = '10000100'
  myData['merchant_key'] = '46f0cd694581a'
  myData['return_url'] = 'https://e2662d82348f.ngrok.io/order/paid'
  myData['cancel_url'] = 'https://e2662d82348f.ngrok.io/order/not-paid'
  myData['notify_url'] = 'https://e2662d82348f.ngrok.io/order/payment-note'
  // Transaction details
  myData['amount'] = '100.00'
  myData['item_name'] = 'Test Product'
  // Generate signature
  myData['signature'] = generateSignature(myData)

  let htmlForm = `<form action="https://sandbox.payfast.co.za​/eng/process" method="post">`
  for (let key in myData) {
    if (myData.hasOwnProperty(key)) {
      let value = myData[key]
      if (value !== '') {
        htmlForm += `<input name="${key}" type="hidden" value="${value.trim()}" />`
      }
    }
  }

  htmlForm += '<input type="submit" value="Pay Now" /></form>'

  // const payFastForm = () => {
  //   if (!payFastSubmitData || payFastSubmitData === null) {
  //     return null
  //   } else {
  //     const {
  //       merchant_id,
  //       merchant_key,
  //       return_url,
  //       cancel_url,
  //       notify_url,
  //       name_first,
  //       name_last,
  //       email_address,
  //       amount,
  //       item_name,
  //       passphrase,
  //       signature,
  //     } = payFastSubmitData
  //     console.log(
  //       return_url,
  //       cancel_url,
  //       notify_url,
  //       name_first,
  //       name_last,
  //       email_address,
  //       amount,
  //       item_name,
  //       passphrase,
  //       signature
  //     )
  //     return (
  //       <form action="https://sandbox.payfast.co.za​/eng/process" method="POST">
  //         <input type="hidden" name="merchant_id" value={merchant_id} />
  //         <input type="hidden" name="merchant_key" value={merchant_key} />
  //         <input type="hidden" name="return_url" value={return_url} />
  //         <input type="hidden" name="cancel_url" value={cancel_url} />
  //         <input type="hidden" name="notify_url" value={notify_url} />
  //         <input type="hidden" name="name_first" value={name_first} />
  //         <input type="hidden" name="name_last" value={name_last} />
  //         <input type="hidden" name="email_address" value={email_address} />
  //         <input type="hidden" name="amount" value={amount} />
  //         <input type="hidden" name="item_name" value={item_name} />
  //         <input type="hidden" name="passphrase" value={passphrase} />
  //         <input type="hidden" name="signature" value={signature} />
  //         <div className="col-lg-6">
  //           <input
  //             style={{
  //               marginRight: 20,
  //               background: 'red',
  //               width: 100,
  //               height: 100,
  //             }}
  //             name="disable"
  //             type="submit"
  //             width="100%"
  //             height="100%"
  //             alt="Submit"
  //             align="bottom"
  //             value="Purchase"
  //           />
  //         </div>
  //       </form>
  //     )
  //   }
  // }

  return (
    <>
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
