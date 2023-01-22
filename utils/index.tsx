/**
 * @File <Required Utility function in Common>
 */

import { SvgIconTypeMap } from '@mui/material'
import {
  SportsBaseball,
  SportsFootball,
  SportsHockey,
  SportsSoccer,
  SportsBasketball,
} from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

import { Football, Icehockey, NBA, NFL } from 'assets'

// Required URLs
export const urls = {
  admin: '/admin',
  connectWallet: '/',
  login: '/login',
  sportsSelection: '/sportSelection',
  viewPool: '/view-pool',
  dashboard: '/dashboard',
  storyBook: '/storybook',
  dailyFantasy: '/dailyfantasy',
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
  id: number
  value: string
}

export const sportsList = [
  {
    icon: SportsFootball,
    sportName: 'NFL',
    img: NFL,
    id: 1,
    value: 'Football',
  },
  {
    icon: SportsBaseball,
    sportName: 'NBA',
    img: NBA,
    id: 2,
    value: 'Baseball',
  },
  {
    icon: SportsSoccer,
    sportName: 'NCAAM',
    img: SportsBasketball,
    id: 3,
    value: 'Basketball',
  },
  {
    icon: SportsSoccer,
    sportName: 'Soccer',
    img: Football,
    id: 4,
    value: 'Soccer',
  },
  {
    icon: SportsHockey,
    sportName: 'NHL',
    img: Icehockey,
    id: 5,
    value: 'Hockey',
  },
]

export const matches = [
  {
    teamA: 'Canada',
    teamB: 'Greece',
    bets: 12345,
  },
  {
    teamA: 'USA',
    teamB: 'Germany',
    bets: 12345,
  },
  {
    teamA: 'India',
    teamB: 'China',
    bets: 12345,
  },
]
