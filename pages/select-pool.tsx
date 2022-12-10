import { Container, Grid, Stack } from '@mui/material'
import CurrentBalance from 'components/CurrentBalance'
import Rewards from 'components/Rewards'
import SelectPoolTabs from 'components/SelectPool'
import { NextPage } from 'next'
import Head from 'next/head'

interface Props {}

const SelectPool: NextPage<Props> = ({}) => {
  return (
    <div>
      <Head>
        <title>Select Pool</title>
      </Head>
      <Container component={'main'} maxWidth="xl">
        <Grid spacing={4} container mt={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <SelectPoolTabs />
          </Grid>
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
                <CurrentBalance />
              </Grid>
              <Grid xs item>
                <Rewards />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default SelectPool
