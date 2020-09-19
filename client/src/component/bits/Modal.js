import React, { useContext } from 'react'
import { Context as UniversalContext } from '../../context/UniversalContext'
import closeX from '../../assets/images/closeX.png'
import './modal.css'

const Modal = (props) => {
  const {
    state: { showModal },
    setModalHide,
  } = useContext(UniversalContext)

  const renderContent = () => {
    if (showModal === false) return null
    return (
      <div className="modalWrapper">
        <div className="modalBackdrop">
          <div className="modalBox">
            <div className="modalCloseXBed">
              <img
                onClick={setModalHide}
                className="modalCloseX"
                src={closeX}
                alt="close-x"
              />
            </div>
            {props.children}
          </div>
        </div>
      </div>
    )
  }

  return renderContent()
}

export default Modal
