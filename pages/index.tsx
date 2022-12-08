// Libraries
import Head from 'next/head'
import type { NextPage } from 'next'

// components
import SelectPoolTabs from 'components/SelectPool'

// Styles
import classes from '../styles/Home.module.scss'
import CurrentBalance from 'components/CurrentBalance'
import Rewards from 'components/Rewards'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bundle Bets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.container}>
        {/* <CurrentBalance />
        <Rewards /> */}
        <SelectPoolTabs />
      </div>
    </>
  )
}

export default Home
