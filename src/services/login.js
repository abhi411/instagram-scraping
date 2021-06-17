import axios from '../instances';



export const login=(body)=>{
  return axios.post('/Users/login?include=user',body)
}

export const addUser=(body)=>{
  return axios.post('/Users',body)
}

export const logout=(body)=>{
  let token =  localStorage.getItem('token')
  return axios.post('/Users/logout?'+token)
}