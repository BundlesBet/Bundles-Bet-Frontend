// libraries
import Head from 'next/head'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import { Fragment, useRef } from 'react'
import { Grid, Typography } from '@mui/material'

// contexts, utilities and hooks
import { sportsList, sportsListType } from 'utils'

// components
import SportCard from 'components/SportCard'
import SportSearch from 'components/SearchField'

interface Props {}

const SportSelection = (_props: Props) => {
  const selectedSportId = useRef<number>(0)

  const router = useRouter()

  const updateSelectedNftState = (id: number) => {
    selectedSportId.current = id

    const sport = sportsList.filter((sport) => sport.id === id)[0]

    const value = {
      id: sport.id,
      sportName: sport.sportName,
      img: JSON.stringify(sport.img),
      icon: JSON.stringify(sport.icon),
    }

    localStorage.setItem('selectedSport', JSON.stringify(value))
  }

  return (
    <>
      <Head>
        <title>Sport Selection</title>
      </Head>

      <Typography
        mb={'30px'}
        mt={'50px'}
        fontWeight={700}
        color={'#00FFC2'}
        fontSize={'50px'}
        textAlign={'center'}
      >
        Select Sport
      </Typography>

      <Stack
        width={'100%'}
        mb={8}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <SportSearch />
      </Stack>

      <Grid
        container
        justifyContent={{ lg: 'center', md: 'center', xs: 'center' }}
        spacing={{ xs: 3, sm: 5 }}
      >
        {sportsList.map((sport: sportsListType, index: any) => (
          <Fragment key={index}>
            <Grid item lg={3} md={4} sm={6} xs={8}>
              <SportCard
                clickHandler={() => {
                  router.push(`/viewpool/${sport.id}`)
                }}
                selectHandler={() => {
                  updateSelectedNftState(sport.id)
                }}
                sportIcon={sport.icon}
                sportImg={sport.img}
                sportName={sport.sportName}
                id={sport.id}
              />
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </>
  )
}

export default SportSelection
