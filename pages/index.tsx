// Libraries
import CurrentBalance from 'components/CurrentBalance'
import type { NextPage } from 'next'
import Head from 'next/head'

// Styles
import classes from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bundle Bets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.container}>{/* <CurrentBalance /> */}</div>
    </>
  )
}

export default Home
