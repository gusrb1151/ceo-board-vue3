import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: { Pragma: 'no-cache', 'Content-Type': 'application/json' }
})

export function login (params: any):any {
  return api.post('/login', params)
}

export default {}
