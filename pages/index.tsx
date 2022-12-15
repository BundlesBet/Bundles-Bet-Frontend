// libraries
import Head from 'next/head'
import Image from 'next/image'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Typography,
  Stack,
  IconButton,
  Grid,
  Container,
  CssBaseline,
  Box,
  Button,
  Link,
} from '@mui/material'

// contexts and hooks
import { useMetamask } from 'contexts/Metamask'
import useMetamaskLogin from 'hooks/useMetamaskLogin'

// components
import SignUpModal from 'components/SignUpModal'

// styles
import { secondaryButton } from 'styles/commonStyles'

// assets
import { Logo, key, wallet } from 'assets/index'

interface Props {}

/**
 * @param <Pass Props as any>
 * @returns <returns the Log In component/Page>
 */

interface Props {}

const ConnectWallet: NextPage<Props> = ({}) => {
  const router = useRouter()
  const { login } = useMetamaskLogin()
  const { account, connect, connected } = useMetamask()

  const [openSignUp, setOpenSignUp] = useState(false)

  const signUpChecker = async () => {
    const signUpCheck = await login()

    if (!signUpCheck) {
      setOpenSignUp(true)
    } else {
      setOpenSignUp(false)
      router.push('/explore')
    }
  }

  useEffect(() => {
    if (!connected && account) {
      signUpChecker()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <>
      <Head>
        <title>Connect Wallet</title>
      </Head>

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
          <Box mb={6}>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction="column"
              spacing={3}
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
                BUNDLES <span style={{ color: '#fff' }}> BETS</span>
              </Typography>
            </Stack>
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
                // signUpChecker()
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

            <Link
              component="button"
              onClick={() => {
                router.push('/explore')
                localStorage.setItem('skip', JSON.stringify(true))
              }}
            >
              Skip for now
            </Link>
          </Stack>
        </Container>
      </Grid>

      {openSignUp && (
        <SignUpModal
          open={openSignUp}
          handleClose={() => setOpenSignUp(!openSignUp)}
        />
      )}
    </>
  )
}

export default ConnectWallet
