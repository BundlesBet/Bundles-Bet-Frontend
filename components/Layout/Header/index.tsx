import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { MouseEvent, useEffect, useState } from 'react'
import { Notifications, TableRows } from '@mui/icons-material'
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

// contexts and hooks
import { RootState } from 'redux/store'
import { useMetamask } from 'contexts/Metamask'
import useMetamaskLogin from 'hooks/useMetamaskLogin'
import { userData } from 'utils/interfaces'

// components
import BalanceView from 'components/BalanceView'

// assets
import { Logo, ProfilePic, wallet } from 'assets'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SignUpModal from 'components/SignUpModal'

const Header = (props: {}) => {
  const { login } = useMetamaskLogin()
  const { account, connect, connected } = useMetamask()

  const [openSignUp, setOpenSignUp] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const userData: userData = useSelector(
    (state: RootState) => state.user
  ).userData

  const open = Boolean(anchorEl)

  const router = useRouter()

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const trimmedAccount = account.slice(0, 5) + '...' + account.slice(-5)

  const signUpChecker = async () => {
    const signUpCheck = await login()

    if (!signUpCheck) {
      setOpenSignUp(true)
    } else {
      setOpenSignUp(false)
    }
  }

  useEffect(() => {
    if (!connected && account) {
      signUpChecker()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          bgcolor: '#07070D',
          px: { xs: '5px', sm: '30px', md: '130px' },
          py: '13px',
        }}
        position="static"
      >
        <Toolbar>
          <Stack
            width={'100%'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              onClick={() => {
                router.push('/')
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <Image src={Logo} height="50%" width="50%" alt="logo" />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ cursor: 'pointer' }}
                color={'#00FFC2'}
                mr={2}
              >
                Bundles
                <span style={{ color: '#fff' }}> Bets </span>
              </Typography>
            </Stack>

            <Stack>
              {account ? (
                <Stack
                  gap={2}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    onClick={handleClick}
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{ gap: 2, ':hover': { cursor: 'pointer' } }}
                  >
                    <Box
                      alignItems={'flex-end'}
                      flexDirection={'column'}
                      display={{ xs: 'none', sm: 'flex' }}
                    >
                      <Typography
                        color={'#fff'}
                        fontWeight={700}
                        fontSize={'16px'}
                      >
                        {userData.name}
                      </Typography>
                      <Typography
                        color={'#7D7D8D'}
                        fontWeight={400}
                        fontSize={'14px'}
                      >
                        {trimmedAccount}
                      </Typography>
                    </Box>

                    <Image
                      width={'30px'}
                      height={'30px'}
                      alt="ProfilePic"
                      src={ProfilePic}
                    />
                  </Box>

                  <Badge sx={{ color: '#00FFC2' }} badgeContent={17}>
                    <Notifications
                      fontSize={'medium'}
                      sx={{
                        color: '#fff',
                        ':hover': { cursor: 'pointer' },
                      }}
                    />
                  </Badge>

                  <TableRows
                    fontSize={'medium'}
                    sx={{ color: '#fff', ':hover': { cursor: 'pointer' } }}
                  />
                </Stack>
              ) : (
                <Button
                  onClick={() => {
                    connect()
                    // signUpChecker()
                  }}
                  startIcon={
                    <AccountBalanceWalletIcon sx={{ color: '#111' }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={{
                    height: '50px',
                  }}
                >
                  Connect Wallet
                </Button>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      {open && (
        <BalanceView
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />
      )}

      {openSignUp && (
        <SignUpModal
          open={openSignUp}
          handleClose={() => setOpenSignUp(!openSignUp)}
        />
      )}
    </Box>
  )
}

export default Header
