import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'
import oilImage from '../../assets/images/oilBottlePhoto.png'
import './itemDetail.css'

const OilDetail = () => {
  const {
    state: { loading, oilPrice },
    addOilToCart,
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
                    className="oilDetailImage"
                    src={oilImage}
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
                      onClick={() => addOilToCart()}
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
                <div className="itemDetailHeading">400MG CBD oil 30ml</div>
                <div className="itemDetailsInfoBed">
                  <div className="itemDetailInfoConteiner">
                    <div className="itemDetailInfoHeading">Price</div>
                    <div className="itemDetailInfoPrice">R{oilPrice}</div>
                  </div>
                  <div className="itemDetailInfoConteiner">
                    <div className="itemDetailInfoHeading">Suggested Use</div>
                    <div className="itemDetailInfoText">
                      Anxiety relief, Depression, Anti-seizure/Epilepsy,
                      Insomnia, Anorexia, Neuroprotective, Pain relief,
                      Anti-acne, Cancer cell growth prevention, Heart health.
                      Alopecia hair disorders or hair fall, Promotes hair
                      growth.
                    </div>
                  </div>
                  <div className="itemDetailInfoConteiner">
                    <div className="itemDetailInfoHeading">Directions</div>
                    <div className="itemDetailInfoText">
                      Shake the bottle well before use. Use 3 - 5 drops daily
                      under tongue, keep under tongue for 30 seconds before
                      swallowing. For Hair: Apply drops directly to scalp or
                      effected area, gently massage, leave in for at least 1
                      hour then wash out (wash twice to remove oil residue).
                      Dosage may be increased as required. For best results use
                      this product for at least 3 consecutive months.
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

export default OilDetail
