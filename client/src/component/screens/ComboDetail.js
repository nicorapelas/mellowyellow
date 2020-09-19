import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import BurgerMenu from '../bits/BurgerMenu'
import { Context as UniversalContext } from '../../context/UniversalContext'
import comboPhoto from '../../assets/images/comboPhoto.png'
import './itemDetail.css'

const ComboDetail = () => {
  const {
    state: { loading, comboPrice },
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
          <div style={props} className="comboDetailBed">
            <div className="itemDetailContainer">
              <div className="itemDetailLeftColumn">
                <div className="comboDetailImageBed">
                  <img
                    className="comboDetailImage"
                    src={comboPhoto}
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
                <div className="itemDetailHeading">
                  400MG CBD ointment 50ml + 400MG CBD oil 30ml
                </div>
                <div className="itemDetailsInfoBed">
                  <div className="itemDetailInfoConteiner">
                    <div className="itemDetailInfoHeading">Price</div>
                    <div className="itemDetailInfoPrice">R{comboPrice}</div>
                  </div>
                  <div className="ointmentDetailsBed">
                    <div className="comboOintmentHeading">ointment</div>
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
                        Use a pea size amount and soften between fingers, apply
                        to skin 2-3 times daily. For best results use this
                        product for at least 3 consecutive months.
                      </div>
                    </div>
                  </div>
                  <div className="ointmentDetailsBed">
                    <div className="comboOintmentHeading">oil</div>
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
                        Dosage may be increased as required. For best results
                        use this product for at least 3 consecutive months.
                      </div>
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

export default ComboDetail
