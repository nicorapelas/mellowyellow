import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'
import ointmentTub from '../../assets/images/ointmentJarPhoto.png'
import './itemDetail.css'

const OintmentDetail = () => {
  const {
    state: { loading, ointmentPrice },
    addOintmentToCart,
  } = useContext(UniversalContext)

  const renderContent = () => {
    if (loading)
      return (
        <div className="checkoutCardLoaderBed">
          <div className="ui active centered inline loader" />
        </div>
      )
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 50, duration: 500 }}
      >
        {(props) => (
          <div style={props} className="itemDetailBed">
            <div className="itemDetailContainer">
              <div className="itemDetailLeftColumn">
                <div className="itemDetailImageBed">
                  <img
                    className="oinmentDetailImage"
                    src={ointmentTub}
                    alt="oil-image"
                  />
                </div>
                <div className="itemDetailButtonBed">
                  <div className="itemDetailButtonContainer">
                    <Link to="/products">
                      <div className="productButtonBed">
                        <div className="productButton">
                          <div className="buttonText">back to products</div>
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
              </div>
              <div className="itemDetailDescriptionBed">
                <div className="itemDetailHeading">400MG CBD ointment 50ml</div>
                <div className="itemDetailsInfoBed">
                  <div className="itemDetailInfoConteiner">
                    <div className="itemDetailInfoHeading">Price</div>
                    <div className="itemDetailInfoPrice">R{ointmentPrice}</div>
                  </div>
                  <div className="itemDetailInfoConteiner">
                    <div className="itemDetailInfoHeading">Suggested Use</div>
                    <div className="itemDetailInfoText">
                      Pain relief (Arthritis, Chilblains, Inflammation),
                      Psoriasis, Eczema, Acne, Wrinkles, Dry Skin, Stretch
                      marks, Alopecia hair disorders.
                    </div>
                  </div>
                  <div className="itemDetailInfoConteiner">
                    <div className="itemDetailInfoHeading">Directions</div>
                    <div className="itemDetailInfoText">
                      Use a pea size amount and soften between fingers, apply to
                      skin 2-3 times daily. For best results use this product
                      for at least 3 consecutive months.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
    )
  }

  return (
    <>
      <BurgerMenu />
      {renderContent()}
    </>
  )
}

export default OintmentDetail
