import Head from 'next/head'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { SportsFootball } from '@mui/icons-material'
import { Container, Grid, Typography } from '@mui/material'

import { RootState } from 'redux/store'

import Rewards from 'components/Rewards'
import SelectPoolTabs from 'components/SelectPool'
import CurrentBalance from 'components/CurrentBalance'

import { NFL } from 'assets'
import { useRouter } from 'next/router'
import { getMatchesOfPool } from 'utils/apiCalls'

interface Props {}

const SelectPool: NextPage<Props> = ({}) => {
  const sportSelected = useSelector(
    (state: RootState) => state.user
  ).sportSelected

  const [showSport, setShowSport] = useState(sportSelected)
  const router: any = useRouter()
  const id = parseInt(router.query.id)
  const finalMatchData = useRef<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getMatchData = async () => {
    const fetchMatchData = await getMatchesOfPool(id)
    finalMatchData.current = fetchMatchData.fetchedMatches
    setLoading(false)
  }

  useEffect(() => {
    getMatchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const localStorageSport = localStorage.getItem('selectedSport')

    if (Object.keys(sportSelected).length) {
      setShowSport(sportSelected)
    } else {
      if (localStorageSport) {
        setShowSport(JSON.parse(localStorageSport))
      } else {
        setShowSport({
          icon: SportsFootball,
          sportName: 'Pool Details',
          img: NFL,
          id: 0,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Head>
        <title>{showSport ? showSport.sportName : 'Pool Details'}</title>
      </Head>

      <Container component={'main'} maxWidth="xl">
        <Typography
          mt={6}
          mb={3}
          fontWeight={700}
          fontSize={'24px'}
          lineHeight={'26px'}
          fontFamily={'DM Sans'}
        >
          {showSport ? showSport.sportName : 'Pool Details'}
        </Typography>

        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={12}>
            {loading ? (
              'Please Wait Fetching Match Details'
            ) : (
              <SelectPoolTabs matchData={finalMatchData.current} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default SelectPool
