import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import ShoppingBag from './ShoppingBag'
import HeaderBanner from './HeaderBanner'
import { Context as UniversalContext } from '../../context/UniversalContext'
import headerLogo from '../../assets/images/headerLogo.png'
import close from '../../assets/images/close.png'
import history from '../../history'
import './header.css'

const Header = () => {
  const {
    state: { onLanding, emailPreset },
    allPresetReset,
    errorReset,
    successReset,
  } = useContext(UniversalContext)

  const renderContent = () => {
    if (onLanding) return null
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 50, duration: 500 }}
      >
        {(props) => (
          <div style={props}>
            <div className="headerBed">
              <Link
                to="/"
                onClick={() => {
                  errorReset()
                  successReset()
                }}
                className="headerLogoBed"
              >
                <img
                  className="headerLogo"
                  src={headerLogo}
                  alt="header logo"
                />
              </Link>
              {!emailPreset ? null : (
                <div className="emailHeaderBed">
                  <div className="emailHeaderContainer">
                    <div className="emailHeader">{emailPreset}</div>
                    <img
                      onClick={() => {
                        allPresetReset()
                        history.push('/')
                      }}
                      className="emailHeaderIcon"
                      title="sign out"
                      src={close}
                      alt="close"
                    />
                  </div>
                </div>
              )}
              <ShoppingBag />
            </div>
            <div className="animatedHeaderBannerBed">
              <HeaderBanner />
            </div>
          </div>
        )}
      </Spring>
    )
  }

  return renderContent()
}

export default Header
