import {
  Grid,
  CssBaseline,
  Box,
  Stack,
  IconButton,
  Typography,
  Button,
  Container,
  Paper,
  Tooltip,
} from '@mui/material'
import { Logo } from 'assets'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import InfoIcon from '@mui/icons-material/Info'
import { urls } from 'utils'

interface Props {}

const Explore: NextPage<Props> = ({}) => {
  const router = useRouter()

  const explore = [
    {
      href: urls.sportsSelection,
      text: 'Sports Pool',
      disable: false,
    },
    {
      href: '#',
      text: 'Daily Fantasy',
      disable: true,
    },

    {
      href: '#',
      text: 'Sports Book',
      disable: true,
    },
  ]

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box mb={6}>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction="column"
              spacing={1}
            >
              <IconButton
                onClick={() => {
                  router.back()
                }}
              >
                <Image src={Logo} height="80%" width="80%" alt="logo" />
              </IconButton>

              <Typography
                variant="h4"
                color="secondary"
                fontWeight={600}
                sx={{ fontSize: { xs: '28px', md: '38px', lg: '48px' } }}
              >
                BUNDLES <span style={{ color: '#fff' }}>BETS </span>
              </Typography>
            </Stack>
            {explore.map(
              (
                link: {
                  href: string
                  text: string
                  disable: boolean
                },
                index: number
              ) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    my: { xs: 2, md: 2 },
                    p: { xs: 3, md: 3 },
                    background: '#282835',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push(link.href)}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    spacing={10}
                  >
                    <Typography
                      textAlign={'center'}
                      sx={{
                        fontWeight: '400',
                        fontSize: {
                          md: '20px',
                          sm: '14px',
                        },
                        lineHeight: '150%',
                        color: '#F0E9F1',
                      }}
                    >
                      {link.text}
                    </Typography>
                    <Box>
                      {link.disable === true ? (
                        <Tooltip
                          arrow
                          title={link.disable === true ? 'Coming Soon' : ''}
                        >
                          <IconButton>
                            <InfoIcon sx={{ color: '#fff' }} />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )}
                    </Box>
                  </Stack>
                </Paper>
              )
            )}
          </Box>
        </Container>
      </Grid>
    </>
  )
}

export default Explore
