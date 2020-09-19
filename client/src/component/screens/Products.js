import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import BurgerMenu from '../bits/BurgerMenu'
import ourProducts from '../../assets/images/ourProducts.png'
import ointmentTub from '../../assets/images/ointmentJarPhoto.png'
import combo from '../../assets/images/comboPhoto.png'
import oilBottle from '../../assets/images/oilBottlePhoto.png'
import { Context as UniversalContext } from '../../context/UniversalContext'
import './products.css'

const Products = () => {
  const {
    state: { loading, oilPrice, ointmentPrice, comboPrice, totalOrderAmout },
    addOilToCart,
    addOintmentToCart,
    addComboToCart,
    addUpTotalOrderAmount,
  } = useContext(UniversalContext)

  const renderContent = () => {
    if (loading)
      return (
        <div className="checkoutCardLoaderBed">
          <div className="ui active centered inline loader" />
        </div>
      )
    return (
      <div className="productsBed">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 60, duration: 600 }}
        >
          {(props) => (
            <div style={props} className="productBed">
              <div className="productContainer">
                <div className="productImageBed">
                  <img
                    className="ointmentImage"
                    src={ointmentTub}
                    alt="ointment"
                  />
                </div>
                <div className="productLabelBed">400MG CBD ointment 50ml</div>
                <div className="productPrice">R{ointmentPrice}</div>
                <Link to="/cbd-ointment-400mg">
                  <div className="productButtonBed">
                    <div className="productButton">
                      <div className="buttonText">view details</div>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={() => addOintmentToCart()}
                  className="productButtonBed"
                >
                  <div className="productButton">
                    <div className="buttonText">add to cart</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Spring>

        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 70, duration: 800 }}
        >
          {(props) => (
            <div style={props} className="productBed">
              <div className="productContainer">
                <div className="productImageBed">
                  <img className="comboImage" src={combo} alt="combo" />
                </div>
                <div className="productLabelBed">400MG CBD combo special</div>
                <div className="productPrice">R{comboPrice}</div>
                <Link to="/cbd-combo-400mg">
                  <div className="productButtonBed">
                    <div className="productButton">
                      <div className="buttonText">view details</div>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={() => addComboToCart()}
                  className="productButtonBed"
                >
                  <div className="productButton">
                    <div className="buttonText">add to cart</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Spring>

        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 80, duration: 1000 }}
        >
          {(props) => (
            <div style={props} className="productBed">
              <div className="productContainer">
                <div className="productImageBed">
                  <img className="oilImage" src={oilBottle} alt="oil" />
                </div>
                <div className="productLabelBed">400MG CBD oil 30ml</div>
                <div className="productPrice">R{oilPrice}</div>
                <Link to="/cbd-oil-400mg">
                  <div className="productButtonBed">
                    <div className="productButton">
                      <div className="buttonText">view details</div>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={() => addOilToCart()}
                  className="productButtonBed"
                >
                  <div className="productButton">
                    <div className="buttonText">add to cart</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Spring>
      </div>
    )
  }

  return (
    <>
      <BurgerMenu />
      <div className="productsHeadingBed">
        <img className="headingImage" src={ourProducts} alt="our-products" />
      </div>
      {renderContent()}
    </>
  )
}

export default Products
