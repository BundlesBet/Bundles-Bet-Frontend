import { Grid, Container } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'

import CurrentBalance from 'components/CurrentBalance'
import TotalBets from 'components/Dashboard/TotalBets'
import TotalToken from 'components/Dashboard/TotalToken'
import MyBetsTabs from 'components/Dashboard/MyBets'

interface Props {}

const Dashboard: NextPage<Props> = ({}) => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container component={'main'} maxWidth="xl">
        <Grid spacing={4} container mt={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
              justifyContent={'center'}
            >
              <Grid xs item>
                <TotalBets />
              </Grid>
              <Grid xs item>
                <TotalToken />
              </Grid>
              <Grid xs item>
                <CurrentBalance />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <MyBetsTabs />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Dashboard
