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
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import SelectPoolAccordion from 'components/Accordion/SelectPoolAccordion'
import ViewMatchTable from 'components/Table/ViewMatches'
import { Notifications, TableRows } from '@mui/icons-material'
import { Logo, ProfilePic, wallet } from 'assets'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { sportsList, sportsListType } from 'utils'
import { Fragment } from 'react'

interface Props {}

const ViewPool: NextPage<Props> = ({}) => {
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
              >
                {sportsList.map((sport: sportsListType, index: any) => (
                  <Fragment key={index}>
                    <Typography
                      variant="h6"
                      sx={{ cursor: 'pointer' }}
                      color={'#00FFC2'}
                      component="div"
                      mr={2}
                      onClick={() => {
                        router.push(`/viewpool/${sport.id}`)
                      }}
                    >
                      {sport.sportName}
                    </Typography>
                  </Fragment>
                ))}
              </Stack>
            </AppBar>
            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems={'center'}
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
