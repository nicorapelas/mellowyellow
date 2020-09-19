import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import { Context as UniversalContext } from '../../context/UniversalContext'
import landingLogo from '../../assets/images/landingLogo.png'
import bagIconSmall from '../../assets/images/bagIconSmall.png'
import comboPhoto from '../../assets/images/comboPhoto.png'
import './landing.css'

const Landing = () => {
  const {
    state: { loading },
    setOnLanding,
    setNotOnLanding,
  } = useContext(UniversalContext)

  useEffect(() => {
    setOnLanding()
  }, [])

  const renderContent = () => {
    if (loading)
      return (
        <div className="checkoutCardLoaderBed">
          <div className="ui active centered inline loader" />
        </div>
      )
    return (
      <Spring
        from={{ opacity: 0, marginTop: -700 }}
        to={{ opacity: 1, marginTop: 0 }}
        config={{ delay: 500, duration: 1000 }}
      >
        {(props) => (
          <div style={props} className="landingBed">
            <div className="landingLeftColumn">
              <div className="landingLogoBed">
                <div className="landingLogoContainer">
                  <img className="landingLogo" src={landingLogo} alt="logo" />
                  <div className="landingLogoSubText">
                    crafted cannabis CBD health products
                  </div>
                  <div className="landingShopButtonbed">
                    <Link
                      className="landingShopButtonContainer"
                      to="/products"
                      onClick={setNotOnLanding}
                    >
                      <div className="landingShopButtonText">go to store</div>
                      <div className="landingShopButtonIconBed">
                        <img
                          className="landingShopButtonIcon"
                          src={bagIconSmall}
                          alt="bag-small"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="landingRightColumn">
              <div className="landingProductImageBed">
                <img
                  className="landingProductImage"
                  src={comboPhoto}
                  alt="logo"
                />
              </div>
            </div>
          </div>
        )}
      </Spring>
    )
  }

  return renderContent()
}

export default Landing
