import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider as UniversalContext } from '../context/UniversalContext'

import history from '../history'
import Header from './bits/Header'
import Footer from './bits/Footer'
import Landing from './screens/Landing'
import OilDetail from './screens/OilDetail'
import ComboDetail from './screens/ComboDetail'
import OintmentDetail from './screens/OintmentDetail'
import Products from './screens/Products'
import LoyaltyCard from './screens/LoyaltyCard'
import ShoppingCart from './screens/ShoppingCart'
import FindUser from './screens/FindUser'
import PaymentMethod from './screens/PaymentMethod'
import CheckoutForm from './screens/CheckoutForm'
import PreflightCheck from './screens/PreflightCheck'
import ContactUs from './screens/ContactUs'
import './app.css'
import ReactSpring from './screens/ReactSpring'
import Paid from './screens/Paid'
import NotPaid from './screens/NotPaid'
import PaymentNote from './screens/PaymentNote'

const App = () => {
  return (
    <div className="appBed">
      <Router history={history}>
        <UniversalContext>
          <div className="appContainer">
            <Header />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/products" exact component={Products} />
              <Route
                path="/cbd-ointment-400mg"
                exact
                component={OintmentDetail}
              />
              <Route path="/cbd-combo-400mg" exact component={ComboDetail} />
              <Route path="/cbd-oil-400mg" exact component={OilDetail} />
              <Route path="/loyalty-card" exact component={LoyaltyCard} />
              <Route path="/shopping-cart" exact component={ShoppingCart} />
              <Route path="/find-me" exact component={FindUser} />
              <Route path="/checkout-form" exact component={CheckoutForm} />
              <Route path="/preflight" exact component={PreflightCheck} />
              <Route path="/pay-up" exact component={PaymentMethod} />
              <Route path="/contact-us" exact component={ContactUs} />
              <Route path="/react-spring" exact component={ReactSpring} />
              <Route path="/paid" exact component={Paid} />
              <Route path="/not-paid" exact component={NotPaid} />
              <Route path="/payment-note" exact component={PaymentNote} />
            </Switch>
            <Footer />
          </div>
        </UniversalContext>
      </Router>
    </div>
  )
}

export default App
