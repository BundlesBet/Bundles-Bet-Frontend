// Libraries
import Head from 'next/head'
import type { NextPage } from 'next'

// components
import Footer from 'components/Footer'
import Header from 'components/Header'
import Rewards from 'components/Rewards'
import CurrentBalance from 'components/CurrentBalance'

// Styles
import classes from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bundle Bets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header></Header>

      {/* <div className={classes.container}> */}
      {/* <CurrentBalance />
        <Rewards /> */}
      {/* </div> */}

      <Footer />
    </>
  )
}

export default Home
