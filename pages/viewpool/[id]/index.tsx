import { NextPage } from 'next'
// libraries
import {
  Typography,
  Stack,
  Grid,
  Container,
  CssBaseline,
  Box,
  Link,
} from '@mui/material'
import { useRouter } from 'next/router'
import Head from 'next/head'

import SelectPoolAccordion from 'components/Accordion/SelectPoolAccordion'

/**
 * @param <Pass Props as any>
 * @returns <returns the Select Pool Page>
 */

interface Props {}

const ViewPool: NextPage<Props> = ({}) => {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>View Pool</title>
      </Head>
      <Stack
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box mb={8} mt={8}>
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
                View Pool
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
              {[...new Array(1)].map((item, key) => {
                return <SelectPoolAccordion key={key} />
              })}
            </Stack>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              onClick={() => {
                router.push('/select-pool')
              }}
              mt={2}
            >
              <Link sx={{ cursor: 'pointer' }}>See More</Link>
            </Stack>
          </Box>
          <Box>
            <Typography
              color="#7D7D8D"
              fontWeight={600}
              mt={4}
              mb={4}
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
      </Stack>
    </div>
  )
}

export default ViewPool
