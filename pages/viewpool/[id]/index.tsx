import Head from 'next/head'
import { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import { RootState } from 'redux/store'

import Rewards from 'components/Rewards'
import SelectPoolTabs from 'components/SelectPool'
import CurrentBalance from 'components/CurrentBalance'

import { NFL } from 'assets'
import { useRouter } from 'next/router'
import { getMatchesOfPool } from 'utils/apiCalls'
import { setPoolsData } from 'redux/slices/betting'

interface Props {}

const SelectPool: NextPage<Props> = ({}) => {
  const sportSelected = useSelector(
    (state: RootState) => state.user
  ).sportSelected

  const [showSport, setShowSport] = useState(sportSelected)
  const dispatch = useDispatch()
  const router: any = useRouter()
  const id = parseInt(router.query.id)
  const finalMatchData = useRef<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getMatchData = async () => {
    const fetchMatchData = await getMatchesOfPool(id)
    console.log(fetchMatchData)

    finalMatchData.current = fetchMatchData.fetchedMatches.matches
    dispatch(setPoolsData(fetchMatchData.fetchedMatches))

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    console.log(id)

    if (!id) return

    getMatchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (!finalMatchData.current && !finalMatchData.current.length) return
    else setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalMatchData.current])

  useEffect(() => {
    const localStorageSport = localStorage.getItem('selectedSport')

    if (Object.keys(sportSelected).length) {
      setShowSport(sportSelected)
    } else {
      if (localStorageSport) {
        setShowSport(JSON.parse(localStorageSport))
      } else {
        setShowSport(sportSelected)
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
              <Stack alignItems="center">
                <CircularProgress />
              </Stack>
            ) : (
              // <>hello</>
              <SelectPoolTabs />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default SelectPool
