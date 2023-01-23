// libraries
import Head from 'next/head'
import { NextPage } from 'next'
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Stack,
  SvgIconTypeMap,
  Tooltip,
} from '@mui/material'

import ViewMatchTable from 'components/Table/ViewMatches'
import { useRouter } from 'next/router'
import { sportsList, sportsListType } from 'utils'
import { Fragment, useEffect, useState } from 'react'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { getPoolOfSport } from 'utils/apiCalls'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { setSportSelected } from 'redux/slices/user'

interface Props {
  sportIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

// export const getStaticProps = async () => {
//   const poolData = await axios.get('/v1/betting/getPools')

//   const data = poolData

//   return {
//     props: { users: data },
//   }
// }

const ViewPool: NextPage<Props> = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [poolData, setPoolData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const sportName = useSelector(
    (state: RootState) => state.user.sportSelected
  ).sportName
  const sportSelected = useSelector(
    (state: RootState) => state.user.sportSelected
  )

  const getPoolData = async () => {
    const fetchPoolData = await getPoolOfSport(sportName)

    setPoolData(fetchPoolData.fetchedPools)
    setLoading(false)
  }

  useEffect(() => {
    getPoolData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportSelected])

  return (
    <div>
      <Head>
        <title>View Pool</title>
      </Head>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '90vh' }}
      >
        <Container component="main" maxWidth="lg">
          <CssBaseline />

          <Stack direction={'column'} spacing={3}>
            <AppBar
              sx={{
                bgcolor: '#282835',
                px: { xs: '5px', sm: '30px', md: '130px' },
                py: '13px',
              }}
              position="static"
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                spacing={6}
              >
                {sportsList.map((sport: sportsListType, index: any) => (
                  <Fragment key={index}>
                    <Tooltip title={sport.sportName} arrow>
                      <IconButton
                        onClick={() => {
                          router.push(`/viewSportPools/${sport.id}`)
                          dispatch(
                            setSportSelected({
                              icon: JSON.stringify(sport.icon),
                              img: JSON.stringify(sport.img),
                              sportName: sport.sportName,
                              id: sport.id,
                              value: sportValue,
                            })
                          )
                        }}
                      >
                        <sport.icon sx={{ color: '#fff' }} fontSize={'large'} />
                      </IconButton>
                    </Tooltip>
                  </Fragment>
                ))}
              </Stack>
            </AppBar>
            <Stack
              direction={{ lg: 'row', sm: 'column', xs: 'column' }}
              justifyContent="space-between"
              alignItems={'center'}
              spacing={4}
            >
              <Button
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#282835',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Prediction Pools
              </Button>
              <Button
                disabled={true}
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#00FFC2',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Sportsbook (Coming Soon)
              </Button>
              <Button
                disabled={true}
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#00FFC2',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Daily Fantasy Sports (Coming Soon)
              </Button>
              <Button
                disabled={true}
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#00FFC2',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Casino Games (Coming Soon)
              </Button>
            </Stack>

            <Box>
              <Stack
                spacing={2}
                direction="column"
                alignItems={'center'}
                justifyContent={'center'}
              >
                {[...new Array(1)].map((item, key) => {
                  return <ViewMatchTable poolData={poolData} key={key} />
                })}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Grid>
    </div>
  )
}

export default ViewPool
