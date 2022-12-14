// libraries
import Head from 'next/head'
import { NextPage } from 'next'
import { Box, Container, CssBaseline, Stack, Typography } from '@mui/material'

import SelectPoolAccordion from 'components/Accordion/SelectPoolAccordion'

interface Props {}

const ViewPool: NextPage<Props> = ({}) => {
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

          <Typography
            mb={'50px'}
            mt={'50px'}
            variant="h4"
            fontWeight={600}
            color="secondary"
            textAlign={'center'}
            sx={{ fontSize: { xs: '18px', md: '38px', lg: '38px' } }}
          >
            Select Pool
          </Typography>

          <Box>
            <Stack
              spacing={2}
              direction="column"
              alignItems={'center'}
              justifyContent={'center'}
            >
              {[...new Array(1)].map((item, key) => {
                return <SelectPoolAccordion key={key} />
              })}
            </Stack>
          </Box>

          <Typography
            color="#7D7D8D"
            fontWeight={600}
            mt={6}
            textAlign="center"
            sx={{ fontSize: { xs: '12px', md: '16px', lg: '16px' } }}
          >
            Get winning payout if your team leads after the first quarter
            <br />
            Money back as a Free Bet on losing bets if the last ball is hit for
            a boundary
          </Typography>
        </Container>
      </Stack>
    </div>
  )
}

export default ViewPool
