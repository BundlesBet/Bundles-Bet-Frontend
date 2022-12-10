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
  connectWallet: '/',
  login: '/login',
  viewPool: '/view-pool',
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
  id: string
}

export const sportsList = [
  { icon: SportsFootball, sportName: 'NFL League', img: NFL, id: '1' },
  { icon: SportsSoccer, sportName: 'Football', img: Football, id: '2' },
]
