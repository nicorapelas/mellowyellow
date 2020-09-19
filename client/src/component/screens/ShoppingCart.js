import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'
import myCart from '../../assets/images/myCart.png'
import ointmentTub from '../../assets/images/ointmentTub50.png'
import combo from '../../assets/images/combo50.png'
import oilBottle from '../../assets/images/oilBottle50.png'
import plus from '../../assets/images/plus.png'
import minus from '../../assets/images/minus.png'
import arrowRightBlue from '../../assets/images/arrowRightBlue.png'
import cartEmptyRound from '../../assets/images/cartEmptyRound.png'
import './shoppingCart.css'

const ShoppingBag = () => {
  const [ointmentPrice, setOintmentPrice] = useState(380)
  const [oilPrice, setOilPrice] = useState(480)
  const [comboPrice, setComboPrice] = useState(800)

  const {
    state: { oilQuantity, ointmentQuantity, comboQuantity, totalOrderAmout },
    addOilToCart,
    removeOilFromCart,
    addOintmentToCart,
    removeOintmentFromCart,
    addComboToCart,
    removeComboFromCart,
    addGoodsToCart,
    addUpTotalOrderAmount,
  } = useContext(UniversalContext)

  const addUpTotal = () => {
    const totalPriceOintment =
      ointmentQuantity < 1 ? 0 : ointmentQuantity * ointmentPrice
    const totalPriceOil = oilQuantity < 1 ? 0 : oilQuantity * oilPrice
    const totalPriceCombo = comboQuantity < 1 ? 0 : comboQuantity * comboPrice
    const shippingCharge =
      totalPriceOintment + totalPriceOil + totalPriceCombo < 750 ? 75 : 0
    return totalPriceOintment + totalPriceOil + totalPriceCombo + shippingCharge
  }

  const renderCart = () => {
    if (oilQuantity + ointmentQuantity + comboQuantity < 1) {
      return (
        <>
          <div className="cartEmptyImageBed">
            <img
              className="cartEmptyImage"
              src={cartEmptyRound}
              alt="cart-empty"
            />
          </div>
          <div className="cartEmptyButtonBed">
            <div className="cartEmptyButtonContainer">
              <Link to="/products" className="cartEmptyButton">
                <div className="cartEmptyButtonText">back to products</div>
              </Link>
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        {ointmentQuantity < 1 ? null : (
          <div className="cartBeb">
            <div className="cartContainer">
              <div className="cartItembed">
                <div className="cartItemQuantity">{ointmentQuantity} X</div>
                <div className="cartItemImage">
                  <img
                    className="ointmentCartImage"
                    src={ointmentTub}
                    alt="ointment"
                  />
                </div>
                <div className="cartSubBed">
                  <div className="cartItemDescription">
                    400mg CBD Ointment 50g
                  </div>
                  <div className="cartItemPrice">R{ointmentPrice}</div>
                </div>
                <div className="cartItemQuantityToggle">
                  <img
                    className="cartAddRemoveButton"
                    onClick={addOintmentToCart}
                    src={plus}
                    alt="+"
                  />
                  <img
                    className="cartAddRemoveButton"
                    onClick={removeOintmentFromCart}
                    src={minus}
                    alt="-"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {oilQuantity < 1 ? null : (
          <div className="cartBeb">
            <div className="cartContainer">
              <div className="cartItembed">
                <div className="cartItemQuantity">{oilQuantity} X</div>
                <div className="cartItemImage">
                  <img className="oilCartImage" src={oilBottle} alt="oil" />
                </div>
                <div className="cartSubBed">
                  <div className="cartItemDescription">400mg CBD Oil 30ml</div>
                  <div className="cartItemPrice">R{oilPrice}</div>
                </div>
                <div className="cartItemQuantityToggle">
                  <img
                    className="cartAddRemoveButton"
                    onClick={addOilToCart}
                    src={plus}
                    alt="+"
                  />
                  <img
                    className="cartAddRemoveButton"
                    onClick={removeOilFromCart}
                    src={minus}
                    alt="-"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {comboQuantity < 1 ? null : (
          <div className="cartBeb">
            <div className="cartContainer">
              <div className="cartItembed">
                <div className="cartItemQuantity">{comboQuantity} X</div>
                <div className="cartItemImage">
                  <img className="comboCartImage" src={combo} alt="combo" />
                </div>
                <div className="cartSubBed">
                  <div className="cartItemDescription">
                    400mg CBD Ointment 50g + 400mg CBD Oil 30ml
                  </div>
                  <div className="cartItemPrice">R{comboPrice}</div>
                </div>
                <div className="cartItemQuantityToggle">
                  <img
                    className="cartAddRemoveButton"
                    onClick={addComboToCart}
                    src={plus}
                    alt="+"
                  />
                  <img
                    className="cartAddRemoveButton"
                    onClick={removeComboFromCart}
                    src={minus}
                    alt="-"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="shippingChargebed">
          <div className="shippingCargeContainer">
            <div>shipping</div>
            <div>{addUpTotal() < 750 ? 'R75' : 'free'}</div>
          </div>
        </div>
        <div className="cartTotalbed">
          <div className="cartTotalContainer">
            <div className="cartTotalprice">
              <div>total</div>
              <div>R{addUpTotal()}</div>
            </div>
            <Link
              to="find-me"
              onClick={() => {
                addGoodsToCart()
                addUpTotalOrderAmount()
              }}
              className="checkoutButtonBed"
            >
              <div className="checkoutButtonContainer">
                <div className="checkoutButtonText">checkout</div>
                <img
                  className="checkoutArrowRight"
                  src={arrowRightBlue}
                  alt="arrow-right"
                />
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <BurgerMenu />
      <div className="cartMainBed">
        <div className="headingImageBed">
          <img className="headingImage" src={myCart} alt="my-cart-heading" />
        </div>
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 50, duration: 500 }}
        >
          {(props) => (
            <div style={props} className="cartSubBed">
              {renderCart()}
            </div>
          )}
        </Spring>
      </div>
    </>
  )
}

export default ShoppingBag
