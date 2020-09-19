import React, { useState } from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import Component1 from './Component1'
import Component2 from './Component2'
import Component3 from './Component3'
import Component4 from './Component4'
import HeaderBanner from '../bits/HeaderBanner'

const ReactSpring = () => {
  const [showComponent3, setShowComponent3] = useState(false)

  const toggle = () => {
    setShowComponent3(!showComponent3)
  }

  return (
    <div>
      <Component1 />
      <Component2 toggle={toggle} />
      <Transition
        native
        items={showComponent3}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(show) =>
          show &&
          ((props) => (
            <animated.div style={props}>
              <Component3 />
            </animated.div>
          ))
        }
      </Transition>
      <Component4 />
      <HeaderBanner />
    </div>
  )
}

export default ReactSpring
