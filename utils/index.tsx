/**
 * @File <Required Utility function in Common>
 */

import { SvgIconTypeMap } from '@mui/material'
import { SportsFootball, SportsSoccer } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

import { Football, NFL } from 'assets'

// Required URLs
export const urls = {
  admin: '/admin',
  dashboard: '/',
  login: '/login',
  connectWallet: '/connectWallet',
}

export const api = async (AxiosObj: object) => {
  try {
    const data = await AxiosObj
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}

export interface sportsListType {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
  sportName: string
  img: StaticImageData
}

export const sportsList = [
  { icon: SportsFootball, sportName: 'NFL League', img: NFL },
  { icon: SportsSoccer, sportName: 'Football', img: Football },
]
