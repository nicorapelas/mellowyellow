import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://5c0f8808e0e4.ngrok.io',
})

export default instance
