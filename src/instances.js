import axios from 'axios'
var config = require("./config.json")
export const BASE_URL = config.serverurl;
const Instances = axios.create({
  baseURL: BASE_URL
})



Instances.interceptors.request.use(async (config) => {
  let access_token= localStorage.getItem('token')
  config.params = { ...config.params, access_token: access_token }
  console.log(config.url, 'url', config.params)
  return config
})

Instances.interceptors.response.use(res => {
  console.log(res.status, 'response')
  return res
}, error => {
  console.log("errro",error.response)
  if (error.response) {
    if (error.response.status == 401) {
     console.log("err",error)
    }
    return error.response.data
  }
})

export default Instances