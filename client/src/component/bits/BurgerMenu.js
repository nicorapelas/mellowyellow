import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import { Context as UniversalContext } from '../../context/UniversalContext'
import Modal from './Modal'
import './burgerMenu.css'

const BurgerMenu = () => {
  const { setModalHide, errorReset, successReset } = useContext(
    UniversalContext
  )

  const renderContent = () => {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 50, duration: 300 }}
      >
        {(props) => (
          <div style={props} className="burgerMenuModalBed">
            <div className="burgerMenumodalContainer">
              <Link
                onClick={() => {
                  setModalHide()
                  errorReset()
                  successReset()
                }}
                className="burgerMenuLinkButton"
                to="/products"
              >
                <div className="burgerMenuLinkButtonText">Products</div>
              </Link>
              <Link
                onClick={() => {
                  setModalHide()
                  errorReset()
                  successReset()
                }}
                className="burgerMenuLinkButton"
                to="/loyalty-card"
              >
                <div className="burgerMenuLinkButtonText">Loyalty Card</div>
              </Link>
              <Link
                onClick={() => {
                  setModalHide()
                  errorReset()
                  successReset()
                }}
                className="burgerMenuLinkButton"
                to="/shopping-cart"
              >
                <div className="burgerMenuLinkButtonText">My Cart</div>
              </Link>
            </div>
          </div>
        )}
      </Spring>
    )
  }

  return <Modal>{renderContent()}</Modal>
}

export default BurgerMenu
