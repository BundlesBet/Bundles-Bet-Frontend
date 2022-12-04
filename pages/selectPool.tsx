import { NextPage } from 'next'
// libraries
import {
  Typography,
  Stack,
  Grid,
  Container,
  CssBaseline,
  Box,
} from '@mui/material'

import Head from 'next/head'

import SelectPoolAccordion from 'components/Accordion/SelectPoolAccordion'

/**
 * @param <Pass Props as any>
 * @returns <returns the Select Pool Page>
 */

interface Props {}

const SelectPool: NextPage<Props> = ({}) => {
  return (
    <div>
      <Head>
        <title>Select Pool</title>
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box mb={8}>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction="row"
            >
              <Typography
                variant="h4"
                color="secondary"
                fontWeight={600}
                sx={{ fontSize: { xs: '18px', md: '38px', lg: '38px' } }}
              >
                Select Pool
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction="column"
              spacing={2}
            >
              {[...new Array(3)].map((item, key) => {
                return <SelectPoolAccordion key={key} />
              })}
            </Stack>
          </Box>
          <Box>
            <Typography
              color="#7D7D8D"
              fontWeight={600}
              mt={4}
              textAlign="center"
              sx={{ fontSize: { xs: '12px', md: '16px', lg: '16px' } }}
            >
              Get winning payout if your team leads after the first quarter
              <br />
              Money back as a Free Bet on losing bets if the last ball is hit
              for a boundary
            </Typography>
          </Box>
        </Container>
      </Grid>
    </div>
  )
}

export default SelectPool
