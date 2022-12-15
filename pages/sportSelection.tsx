// libraries
import Head from 'next/head'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import { Fragment, useRef } from 'react'
import { Typography } from '@mui/material'

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

      <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <SportSearch />
      </Stack>

      <Stack
        gap={3}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        my={4}
      >
        {sportsList.map((sport: sportsListType, index: any) => (
          <Fragment key={index}>
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
          </Fragment>
        ))}
      </Stack>

      <Typography
        fontWeight={400}
        color={'#7D7D8D'}
        fontSize={'18px'}
        textAlign={'center'}
      >
        Get winning payout if your team leads after the first quarter
        <br /> Money back as a Free Bet on losing bets if the last ball is hit
        for a boundary
      </Typography>
    </>
  )
}

export default SportSelection
