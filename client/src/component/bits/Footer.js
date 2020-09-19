import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

import { Context as UniversalContext } from '../../context/UniversalContext'
import instagramIcon from '../../assets/images/istagramIconFotter.png'
import facebookIcon from '../../assets/images/facebookIconFooter.png'
import emailIcon from '../../assets/images/emailIconFooter.png'

import './footer.css'

const Footer = () => {
  const {
    state: { onLanding },
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
          <div style={props} className="footerBed">
            <div className="footerContainer">
              <div className="footerIconsBed">
                <Link to="#" title="instagram">
                  <img
                    className="footerIcon"
                    src={instagramIcon}
                    alt="instagramIcon"
                  />
                </Link>
                <Link to="#" title="facebook">
                  <img
                    className="footerIcon"
                    src={facebookIcon}
                    alt="facebook-icon"
                  />
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => {
                    errorReset()
                    successReset()
                  }}
                  title="contact us"
                >
                  <img
                    className="footerIcon"
                    src={emailIcon}
                    alt="email-icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </Spring>
    )
  }

  return renderContent()
}

export default Footer
