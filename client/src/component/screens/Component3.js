import React from 'react'
import { Spring } from 'react-spring/renderprops'

const Component3 = () => {
  const renderContent = () => {
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => (
          <div style={props}>
            <div style={c3Style}>
              <h1>Component 3</h1>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
          </div>
        )}
      </Spring>
    )
  }

  return renderContent()
}

const c3Style = {
  background: 'teal',
  color: 'white',
  padding: '1.5rem',
}

export default Component3
