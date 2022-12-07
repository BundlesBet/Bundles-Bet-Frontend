// libraries
import Head from 'next/head'
import { Fragment } from 'react'
import { Stack } from '@mui/system'
import { Typography } from '@mui/material'

// contexts, utilities and hooks
import { sportsList, sportsListType } from 'utils'

// components
import Header from 'components/Header'
import Footer from 'components/Footer'
import SportCard from 'components/SportCard'
import SportSearch from 'components/SearchField'

// styles

// assets

interface Props {}

const ConnectWallet = (_props: Props) => {
  return (
    <>
      <Head>
        <title>Sport Selection</title>
      </Head>

      <Header></Header>

      <Typography
        mb={'30px'}
        mt={'50px'}
        fontWeight={700}
        color={'#0EB634'}
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
        {sportsList.map((sport: sportsListType, index) => (
          <Fragment key={index}>
            <SportCard
              sportIcon={sport.icon}
              sportImg={sport.img}
              sportName={sport.sportName}
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

      <Footer></Footer>
    </>
  )
}

export default ConnectWallet
