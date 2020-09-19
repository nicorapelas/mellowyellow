import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import LoyaltyCard from './LoyaltyCard'
import ShoppingBagEmpty from '../../assets/images/shoppingBagEmpty.png'
import menuIcon from '../../assets/images/menu.png'
import { Context as UniversalContext } from '../../context/UniversalContext'

import './shoppingBag.css'

const ShoppingBag = () => {
  const {
    state: { oilQuantity, ointmentQuantity, comboQuantity },
    setModalShow,
    errorReset,
    successReset,
  } = useContext(UniversalContext)

  const renderContent = () => {
    return (
      <div className="headerNavLinksBed">
        <div onClick={setModalShow} className="burgerMenuBed">
          <img className="burgerMenu" src={menuIcon} alt="menu-incon" />
        </div>
        <div className="headerNavLinksContainer">
          <Link
            to="/products"
            onClick={() => {
              errorReset()
              successReset()
            }}
          >
            <div className="headerLinkText">products</div>
          </Link>
          <LoyaltyCard />
          <Link
            to="/shopping-cart"
            onClick={() => {
              errorReset()
              successReset()
            }}
            className="shoppingBagLink"
            title="shopping cart"
          >
            <div className="shoppoingBagItemCount">
              {oilQuantity + ointmentQuantity + comboQuantity}
            </div>
            <img
              className="shoppingBagIcon"
              src={ShoppingBagEmpty}
              alt="shopping-bag-icon"
            />
          </Link>
        </div>
      </div>
    )
  }

  return renderContent()
}

export default ShoppingBag
