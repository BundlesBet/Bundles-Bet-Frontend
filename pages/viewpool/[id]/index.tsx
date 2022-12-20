// libraries
import Head from 'next/head'
import { NextPage } from 'next'
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Stack,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from '@mui/material'

import ViewMatchTable from 'components/Table/ViewMatches'
import { useRouter } from 'next/router'
import { sportsList, sportsListType } from 'utils'
import { Fragment } from 'react'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface Props {
  sportIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

const ViewPool: NextPage<Props> = (props: Props) => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>View Pool</title>
      </Head>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '90vh' }}
      >
        <Container component="main" maxWidth="lg">
          <CssBaseline />

          <Stack direction={'column'} spacing={3}>
            <AppBar
              sx={{
                bgcolor: '#282835',
                px: { xs: '5px', sm: '30px', md: '130px' },
                py: '13px',
              }}
              position="static"
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                spacing={6}
              >
                {sportsList.map((sport: sportsListType, index: any) => (
                  <Fragment key={index}>
                    <Tooltip title={sport.sportName} arrow>
                      <IconButton
                        onClick={() => {
                          router.push(`/viewpool/${sport.id}`)
                        }}
                      >
                        <sport.icon sx={{ color: '#fff' }} fontSize={'large'} />
                      </IconButton>
                    </Tooltip>
                  </Fragment>
                ))}
              </Stack>
            </AppBar>
            <Stack
              direction={{ lg: 'row', sm: 'column', xs: 'column' }}
              justifyContent="space-between"
              alignItems={'center'}
              spacing={4}
            >
              <Button
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#282835',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Sports Pool
              </Button>
              <Button
                disabled={true}
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#00FFC2',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Sports Book (Coming Soon)
              </Button>
              <Button
                disabled={true}
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#00FFC2',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Daily Fantasy (Coming Soon)
              </Button>
              <Button
                disabled={true}
                sx={{
                  color: '#fff',
                  background: '#282835',
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#00FFC2',
                    color: '#fff',
                  },
                }}
                size="small"
              >
                Sports Prediction (Coming Soon)
              </Button>
            </Stack>

            <Box>
              <Stack
                spacing={2}
                direction="column"
                alignItems={'center'}
                justifyContent={'center'}
              >
                {[...new Array(1)].map((item, key) => {
                  return <ViewMatchTable key={key} />
                })}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Grid>
    </div>
  )
}

export default ViewPool
