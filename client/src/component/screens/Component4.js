import React, { useState, useEffect } from 'react'
import { useTransition, animated, config } from 'react-spring'
import './styles.css'

const bannerMessages = [
  {
    id: 0,
    msg: 'free delivery on orders valued over R750',
  },
  {
    id: 1,
    msg: 'collect customer loyalty stamps with every item purchased',
  },
  {
    id: 2,
    msg: '10 customer loyalty stamps get you a R400 voucher 😄',
  },
]

const HeaderBanner = () => {
  const [index, set] = useState(0)
  const transitions = useTransition(bannerMessages[index], (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })
  useEffect(
    () => void setInterval(() => set((state) => (state + 1) % 3), 7000),
    []
  )
  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      class="bg"
      style={{
        ...props,
      }}
    >
      {item.msg}
    </animated.div>
  ))
}

export default HeaderBanner
