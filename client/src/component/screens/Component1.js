import React from 'react'
import { Spring } from 'react-spring/renderprops'

const Component1 = () => {
  const renderContent = () => {
    return (
      <Spring
        from={{ opacity: 0, marginTop: -500 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div style={props}>
            <div style={styles.c1Style}>
              <h1>Component 1</h1>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <Spring
                from={{ number: 0 }}
                to={{ number: 10 }}
                config={{ duration: 10000 }}
              >
                {(props) => (
                  <div style={props}>
                    <h1 style={styles.counter}>{props.number.toFixed()}</h1>
                  </div>
                )}
              </Spring>
            </div>
          </div>
        )}
      </Spring>
    )
  }

  return renderContent()
}

const styles = {
  c1Style: {
    background: 'steelBlue',
    color: 'white',
    padding: '1.5rem',
  },
  counter: {},
}

export default Component1
