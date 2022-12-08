// Libraries
import Head from 'next/head'
import type { NextPage } from 'next'

// components
import SelectPoolTabs from 'components/SelectPool'

// Styles
import classes from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bundle Bets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.container}>
        <SelectPoolTabs />
      </div>
    </>
  )
}

export default Home
