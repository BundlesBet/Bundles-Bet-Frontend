import { NextPage } from 'next'
import Head from 'next/head'
import styles from './Vesting.module.scss'

interface Props {}

const Vesting: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>BundlesBets</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            <span> Vesting Fronted&nbsp;</span>
          </h1>

          {/* Used While Checking tokens from Contract Read Call */}

          <p className={styles.description}>Checking for Claim Tokens...</p>

          {/* Used While No Claim tokens  available from Contract Read Call */}

          <p className={styles.description}>
            Sorry, there is no claim tokens available for this address.
          </p>

          <p className={styles.description}>
            You have already claimed your <strong>1234</strong> $BUND.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <h1>Total Vested Balance</h1>
              </div>
              <div className={styles.cardRight}>
                <div className={styles.airdropBalance}>
                  <span>{'0.00'}</span> $BUND
                </div>
              </div>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <h1>Remaining Balance</h1>
              </div>
              <div className={styles.cardRight}>
                <div className={styles.airdropBalance}>
                  <span>{'0.00'}</span> $BUND
                </div>
              </div>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <h2>Claiming Balance</h2>
                <div className={styles.airdropBalance}>
                  <span>{'0.00'}</span> $BUND
                </div>
              </div>
              <div className={styles.cardRight}>
                <button className={styles.claimButton}>Claim</button>
              </div>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          {/* <a href="https://bundlesbets.com">Back to BundlesBets.com</a> */}
        </footer>
      </div>
    </div>
  )
}

export default Vesting
