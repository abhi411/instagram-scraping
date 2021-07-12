import axios from '../instances';

export const getRequest=(nr)=>{
  let userId =  localStorage.getItem('userId')
  return axios.get(`/Requests?filter={"where":{"userId":"${userId}"},"order":"createdAt DESC"}`)
}

export const updateRequest=( id )=>{
  let data = { "isDeleted" : true}
  console.log("filter",id)
  return axios.post(`/Requests/update?where={"id":${id}}`,data,{
})
}

export const getRequestById= (id) => {
  return axios.get('/Requests/'+id)
}

export const createRequest=( data )=>{
  return axios.post(`/Remotemethods/getFollowers`,data,{
})
}