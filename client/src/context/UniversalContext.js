import _ from 'lodash'
import axios from 'axios'
import createDataContext from './createDataContext'

// Reducer
const UniversalContext = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'SHOW_MODAL':
      return { ...state, showModal: true }
    case 'HIDE_MODAL':
      return { ...state, showModal: false }
    case 'ERROR_ADD':
      return { ...state, errorApi: action.payload, loading: false }
    case 'ERROR_RESET':
      return { ...state, errorApi: null, loading: false }
    case 'SUCCESS_ADD':
      return { ...state, successApi: action.payload, loading: false }
    case 'SUCCESS_RESET':
      return { ...state, successApi: null, loading: false }
    case 'ON_LANDING':
      return { ...state, onLanding: action.payload }
    case 'FETCH_USER_DATA':
      return { ...state, userData: action.payload, loading: false }
    case 'CREATE_USER':
      return { ...state, userData: action.payload, loading: false }
    case 'TOTAL_ORDER_AMOUNT':
      let total =
        state.oilQuantity * state.oilPrice +
        state.ointmentQuantity * state.ointmentPrice +
        state.comboQuantity * state.comboPrice
      let checkTotal = total < 750 ? total + 75 : total
      return {
        ...state,
        totalOrderAmout: checkTotal,
      }
    case 'ADD_GOODS_TO_CART':
      return {
        ...state,
        goods: {
          ointmentQuantity: state.ointmentQuantity,
          oilQuantity: state.oilQuantity,
          comboQuantity: state.comboQuantity,
        },
      }
    case 'GET_PAYFAST_SUBMIT_DATA':
      return { ...state, payFastSubmitData: action.payload, loading: false }
    case 'CREATE_ORDER':
      return { ...state, order: action.payload, loading: false }
    case 'EDIT_USER_DATA':
      return { ...state, [action.payload._id]: action.payload, loading: false }
    case 'DELETE_USER':
      return _.omit(state, action.payload)
    case 'RETURN_CUSTOMER':
      return { ...state, returnCustormer: action.payload }
    case 'RETURN_CUSTOMER_RESET':
      return { ...state, returnCustormer: action.payload }
    case 'ADD_OIL_TO_CART':
      return { ...state, oilQuantity: state.oilQuantity + action.payload }
    case 'REMOVE_OIL_FROM_CART':
      return { ...state, oilQuantity: state.oilQuantity - action.payload }
    case 'ADD_OINTMENT_TO_CART':
      return {
        ...state,
        ointmentQuantity: state.ointmentQuantity + action.payload,
      }
    case 'REMOVE_OINTMENT_FROM_CART':
      return {
        ...state,
        ointmentQuantity: state.ointmentQuantity - action.payload,
      }
    case 'ORDER_RESET':
      return {
        ...state,
        ointmentQuantity: 0,
        oilQuantity: 0,
        comboQuantity: 0,
        totalOrderAmout: 0,
      }
    case 'ADD_COMBO_TO_CART':
      return { ...state, comboQuantity: state.comboQuantity + action.payload }
    case 'REMOVE_COMBO_FROM_CART':
      return { ...state, comboQuantity: state.comboQuantity - action.payload }
    case 'EMAIL_PRESET_ASSIGN':
      return { ...state, emailPreset: action.payload }
    case 'EMAIL_PRESET_RESET':
      return { ...state, emailPreset: action.payload }
    case 'FIRST_NAME_PRESET_ASSIGN':
      return { ...state, firstNamePreset: action.payload }
    case 'FIRST_NAME_PRESET_RESET':
      return { ...state, firstNamePreset: action.payload }
    case 'LAST_NAME_PRESET_ASSIGN':
      return { ...state, lastNamePreset: action.payload }
    case 'LAST_NAME_PRESET_RESET':
      return { ...state, lastNamePreset: action.payload }
    case 'PHONE_NUMBER_PRESET_ASSIGN':
      return { ...state, phoneNumberPreset: action.payload }
    case 'PHONE_NUMBER_PRESET_RESET':
      return { ...state, phoneNumberPreset: action.payload }
    case 'ADDRESS_LINE_1_PRESET_ASSIGN':
      return { ...state, addressLine1Preset: action.payload }
    case 'ADDRESS_LINE_1_PRESET_RESET':
      return { ...state, addressLine1Preset: action.payload }
    case 'ADDRESS_LINE_2_PRESET_ASSIGN':
      return { ...state, addressLine2Preset: action.payload }
    case 'ADDRESS_LINE_2_PRESET_RESET':
      return { ...state, addressLine2Preset: action.payload }
    case 'CITY_PRESET_ASSIGN':
      return { ...state, cityPreset: action.payload }
    case 'CITY_PRESET_RESET':
      return { ...state, cityPreset: action.payload }
    case 'PROVINCE_PRESET_ASSIGN':
      return { ...state, provincePreset: action.payload }
    case 'PROVINCE_PRESET_RESET':
      return { ...state, provincePreset: action.payload }
    case 'POSTAL_CODE_PRESET_ASSIGN':
      return { ...state, postalCodePreset: action.payload }
    case 'POSTAL_CODE_PRESET_RESET':
      return { ...state, postalCodePreset: action.payload }

    default:
      return state
  }
}

// Actions
const fetchUserData = (dispatch) => async (email) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await axios.post('/api/user/data', email)
    if (response.data.email) {
      dispatch({ type: 'RETURN_CUSTOMER', payload: true })
    }
    if (response.data.error) {
      const { email } = response.data.error
      if (email === `'Email address' not found`)
        dispatch({ type: 'RETURN_CUSTOMER', payload: false })
    }
    dispatch({ type: 'FETCH_USER_DATA', payload: response.data })
  } catch (error) {
    console.log(error)
  }
}

const createUser = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await axios.post('/api/user', formValues)
    if (response.data.error) {
      dispatch({ type: 'ERROR_ADD', payload: response.data.error })
    } else {
      dispatch({ type: 'CREATE_USER', payload: response.data })
    }
  } catch (error) {
    console.log(error)
  }
}

const validateDeliveryForm = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await axios.post('/api/validate/delivery-form', formValues)
    if (response.data.success) {
      dispatch({ type: 'SUCCESS_ADD', payload: response.data })
    }
    if (response.data.error) {
      dispatch({ type: 'ERROR_ADD', payload: response.data.error })
    } else {
      dispatch({ type: 'ERROR_RESET' })
      dispatch({ type: 'SUCCESS_RESET' })
      return
    }
  } catch (error) {
    console.log(error)
  }
}

const submitEnquirey = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await axios.post('/api/enquirey', formValues)
    if (response.data.success) {
      dispatch({ type: 'SUCCESS_ADD', payload: response.data })
    }
    if (response.data.error) {
      dispatch({ type: 'ERROR_ADD', payload: response.data.error })
    } else {
      dispatch({ type: 'ERROR_RESET' })
      return
    }
  } catch (error) {
    console.log(error)
  }
}

const setModalShow = (dispatch) => (async) => {
  dispatch({ type: 'SHOW_MODAL' })
}
const setModalHide = (dispatch) => (async) => {
  dispatch({ type: 'HIDE_MODAL' })
}

const errorReset = (dispatch) => (async) => {
  dispatch({ type: 'ERROR_RESET', payload: null })
}
const successReset = (dispatch) => (async) => {
  dispatch({ type: 'SUCCESS_RESET', payload: null })
}

const setOnLanding = (dispatch) => (async) => {
  dispatch({ type: 'ON_LANDING', payload: true })
}
const setNotOnLanding = (dispatch) => (async) => {
  dispatch({ type: 'ON_LANDING', payload: false })
}

const addUpTotalOrderAmount = (dispatch) => async () => {
  dispatch({ type: 'TOTAL_ORDER_AMOUNT' })
}

const addGoodsToCart = (dispatch) => (async) => {
  dispatch({ type: 'ADD_GOODS_TO_CART' })
}

const paySubmit = (dispatch) => async (formValues) => {
  const { name_first, name_last, email_address, amount, item_name } = formValues
  try {
    const response = await axios.post('/api/order/pay', {
      name_first,
      name_last,
      email_address,
      amount,
      item_name,
    })
    dispatch({
      type: 'GET_PAYFAST_SUBMIT_DATA',
      payload: response.data,
    })
  } catch (error) {
    console.log(error)
  }
}

const createOrder = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await axios.post('/api/order', formValues)
    await axios.post('/api/order/hq', formValues)
    dispatch({ type: 'CREATE_ORDER', payload: response.data })
  } catch (error) {
    console.log(error)
  }
}

const returnCustomerReset = (dispatch) => (async) => {
  dispatch({ type: 'RETURN_CUSTOMER_RESET', payload: null })
}

const addOilToCart = (dispatch) => (async) => {
  dispatch({ type: 'ADD_OIL_TO_CART', payload: 1 })
}
const removeOilFromCart = (dispatch) => (async) => {
  dispatch({ type: 'REMOVE_OIL_FROM_CART', payload: 1 })
}

const addOintmentToCart = (dispatch) => (async) => {
  dispatch({ type: 'ADD_OINTMENT_TO_CART', payload: 1 })
}
const removeOintmentFromCart = (dispatch) => (async) => {
  dispatch({ type: 'REMOVE_OINTMENT_FROM_CART', payload: 1 })
}

const addComboToCart = (dispatch) => (async) => {
  dispatch({ type: 'ADD_COMBO_TO_CART', payload: 1 })
}
const removeComboFromCart = (dispatch) => (async) => {
  dispatch({ type: 'REMOVE_COMBO_FROM_CART', payload: 1 })
}

const emailPresetAssign = (dispatch) => async (email) => {
  dispatch({ type: 'EMAIL_PRESET_ASSIGN', payload: email })
}
const emailPresetReset = (dispatch) => (async) => {
  dispatch({ type: 'EMAIL_PRESET_RESET', payload: null })
}
const firstNamePresetAssign = (dispatch) => async (firstName) => {
  dispatch({ type: 'FIRST_NAME_PRESET_ASSIGN', payload: firstName })
}
const firstNamePresetReset = (dispatch) => (async) => {
  dispatch({ type: 'FIRST_NAME_PRESET_RESET', payload: null })
}
const lastNamePresetAssign = (dispatch) => async (lastName) => {
  dispatch({ type: 'LAST_NAME_PRESET_ASSIGN', payload: lastName })
}
const lastNamePresetReset = (dispatch) => (async) => {
  dispatch({ type: 'LAST_NAME_PRESET_RESET', payload: null })
}
const phoneNumberPresetAssign = (dispatch) => async (phoneNumber) => {
  dispatch({ type: 'PHONE_NUMBER_PRESET_ASSIGN', payload: phoneNumber })
}
const phoneNumberPresetReset = (dispatch) => (async) => {
  dispatch({ type: 'PHONE_NUMBER_PRESET_RESET', payload: null })
}
const addressLine1PresetAssign = (dispatch) => async (addressLine1) => {
  dispatch({ type: 'ADDRESS_LINE_1_PRESET_ASSIGN', payload: addressLine1 })
}
const addressLine1PresetReset = (dispatch) => (async) => {
  dispatch({ type: 'ADDRESS_LINE_1_PRESET_RESET', payload: null })
}
const addressLine2PresetAssign = (dispatch) => async (addressLine2) => {
  dispatch({ type: 'ADDRESS_LINE_2_PRESET_ASSIGN', payload: addressLine2 })
}
const addressLine2PresetReset = (dispatch) => (async) => {
  dispatch({ type: 'ADDRESS_LINE_2_PRESET_RESET', payload: null })
}
const cityPresetAssign = (dispatch) => async (city) => {
  dispatch({ type: 'CITY_PRESET_ASSIGN', payload: city })
}
const cityPresetReset = (dispatch) => (async) => {
  dispatch({ type: 'CITY_PRESET_RESET', payload: null })
}
const provincePresetAssign = (dispatch) => async (province) => {
  dispatch({ type: 'PROVINCE_PRESET_ASSIGN', payload: province })
}
const provincePresetReset = (dispatch) => (async) => {
  dispatch({ type: 'PROVINCE_PRESET_RESET', payload: null })
}
const postalCodePresetAssign = (dispatch) => async (postalCode) => {
  dispatch({ type: 'POSTAL_CODE_PRESET_ASSIGN', payload: postalCode })
}
const postalCodePresetReset = (dispatch) => (async) => {
  dispatch({ type: 'POSTAL_CODE_PRESET_RESET', payload: null })
}

const allPresetReset = (dispatch) => () => {
  dispatch({ type: 'ERROR_RESET' })
  dispatch({ type: 'SUCCESS_RESET' })
  dispatch({ type: 'RETURN_CUSTOMER_RESET' })
  dispatch({ type: 'EMAIL_PRESET_RESET' })
  dispatch({ type: 'FIRST_NAME_PRESET_RESET' })
  dispatch({ type: 'LAST_NAME_PRESET_RESET' })
  dispatch({ type: 'PHONE_NUMBER_PRESET_RESET' })
  dispatch({ type: 'ADDRESS_LINE_1_PRESET_RESET' })
  dispatch({ type: 'ADDRESS_LINE_2_PRESET_RESET' })
  dispatch({ type: 'CITY_PRESET_RESET' })
  dispatch({ type: 'PROVINCE_PRESET_RESET' })
  dispatch({ type: 'POSTAL_CODE_PRESET_RESET' })
  dispatch({ type: 'POSTAL_CODE_PRESET_RESET' })
  dispatch({ type: 'ORDER_RESET' })
}

export const { Context, Provider } = createDataContext(
  UniversalContext,
  {
    fetchUserData,
    createUser,
    validateDeliveryForm,
    submitEnquirey,
    errorReset,
    successReset,
    setOnLanding,
    setNotOnLanding,
    addGoodsToCart,
    addUpTotalOrderAmount,
    paySubmit,
    createOrder,
    returnCustomerReset,
    addOilToCart,
    removeOilFromCart,
    addOintmentToCart,
    removeOintmentFromCart,
    addComboToCart,
    removeComboFromCart,
    emailPresetAssign,
    emailPresetReset,
    firstNamePresetAssign,
    firstNamePresetReset,
    lastNamePresetAssign,
    lastNamePresetReset,
    phoneNumberPresetAssign,
    phoneNumberPresetReset,
    addressLine1PresetAssign,
    addressLine1PresetReset,
    addressLine2PresetAssign,
    addressLine2PresetReset,
    cityPresetAssign,
    cityPresetReset,
    provincePresetAssign,
    provincePresetReset,
    postalCodePresetAssign,
    postalCodePresetReset,
    allPresetReset,
    setModalShow,
    setModalHide,
  },
  // Initial state
  {
    userData: null,
    goods: null,
    totalOrderAmout: null,
    order: null,
    payFastSubmitData: null,
    returnCustormer: null,
    loading: null,
    errorApi: null,
    successApi: null,
    onLanding: null,
    oilQuantity: 0,
    ointmentQuantity: 0,
    comboQuantity: 0,
    emailPreset: null,
    firstNamePreset: null,
    lastNamePreset: null,
    phoneNumberPreset: null,
    addressLine1Preset: null,
    addressLine2Preset: null,
    cityPreset: null,
    provincePreset: null,
    postalCodePreset: null,
    showModal: false,
    oilPrice: 480,
    ointmentPrice: 380,
    comboPrice: 800,
  }
)
