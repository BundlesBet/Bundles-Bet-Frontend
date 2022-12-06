/**
 * @File <Required Utility function in Common>
 */

import { cricket } from 'assets'

// Required URLs
export const urls = {
  admin: '/admin',
  dashboard: '/',
  login: '/login',
}

export const api = async (AxiosObj: object) => {
  try {
    const data = await AxiosObj
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}

export const sportsList = [
  { sportName: 'Cricket', img: cricket },
  { sportName: 'Football', img: cricket },
  { sportName: 'Hockey', img: cricket },
]
