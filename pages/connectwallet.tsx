// libraries
import { useRouter } from 'next/router'
import {
  Typography,
  Stack,
  IconButton,
  Grid,
  Container,
  CssBaseline,
  Box,
  Button,
} from '@mui/material'

import { Logo, key, wallet } from 'assets/index'
import Head from 'next/head'
import { secondaryButton } from 'styles/commonStyles'
import { useMetamask } from 'contexts/Metamask'
import Image from 'next/image'
import Header from 'components/Header'
import useMetamaskLogin from 'hooks/useMetamaskLogin'

interface Props {}

/**
 * @param <Pass Props as any>
 * @returns <returns the Log In component/Page>
 */

const ConnectWallet = (_props: Props) => {
  const router = useRouter()
  const { login } = useMetamaskLogin()
  const { account, connect } = useMetamask()

  return (
    <>
      <Head>
        <title>Connect Wallet</title>
      </Head>

      <Header></Header>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box mb={8}>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction="row"
            >
              <IconButton
                onClick={() => {
                  router.back()
                }}
              >
                <Image src={Logo} alt="logo" />
              </IconButton>

              <Typography
                variant="h4"
                color="secondary"
                fontWeight={600}
                sx={{ fontSize: { xs: '18px', md: '28px', lg: '32px' } }}
              >
                BUNDLE <span style={{ color: '#fff' }}> BETS</span>
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Box>
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                direction="column"
                spacing={2}
              >
                <Typography
                  color="secondary"
                  sx={{ fontSize: { xs: '22px', md: '48px', lg: '48px' } }}
                  fontWeight={700}
                >
                  Join the community of
                  <br />
                  <span style={{ color: '#fff' }}>
                    {' '}
                    100,000 Folks in Betting
                  </span>
                </Typography>
                <Typography
                  color="#7D7D8D"
                  fontWeight={600}
                  sx={{ fontSize: { xs: '12px', md: '16px', lg: '16px' } }}
                >
                  Get winning payout if your team leads after the first quarter
                  Money back as a Free Bet on losing bets if the last ball is
                  hit for a boundary
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Container>
        <Container component="main" maxWidth="xs">
          {' '}
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction="column"
            spacing={2}
          >
            <Button
              onClick={() => {
                connect()
                setTimeout(() => login(), 5000)
              }}
              startIcon={<Image src={wallet} alt="key" />}
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                mb: 1,
                height: '50px',

                fontWeight: 700,
                borderRadius: '5px',
                lineHeight: '21px',
                fontSize: '16px',
              }}
            >
              Connect Your Wallet
            </Button>
            <Button
              startIcon={<Image src={key} alt="key" />}
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                ...secondaryButton,
                mt: 1,
                mb: 1,
                height: '50px',
                borderRadius: '5px',
              }}
            >
              Import Private Key
            </Button>
          </Stack>
        </Container>
      </Grid>
    </>
  )
}

export default ConnectWallet
