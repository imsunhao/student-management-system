import axios from 'axios'

// ---------------- request interceptors -----------------------
export const XSRF_HEADER = 'X-CSRFToken'
export const XSRF_TOKEN_COOKIE = 'csrf_token'

axios.interceptors.request.use(function(config) {
  config.xsrfCookieName = XSRF_TOKEN_COOKIE
  config.xsrfHeaderName = XSRF_HEADER
  // console.log('interceptors config', config)
  return config
})

// ----------------end request interceptors -------------------

export default axios
