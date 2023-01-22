import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { ConnectButton } from '@rainbow-me/rainbowkit'
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
import useWagmiLogin from 'hooks/useMetamaskLogin'
import { userData } from 'utils/interfaces'

// components
import BalanceView from 'components/BalanceView'

// assets
import { Logo, ProfilePic, wallet } from 'assets'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SignUpModal from 'components/SignUpModal'
import { useAccount } from 'wagmi'

const Header = (props: {}) => {
  const { login } = useWagmiLogin()
  const { isConnected, address }: any = useAccount()

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

  const trimmedAccount = isConnected
    ? address.slice(0, 5) + '...' + address.slice(-5)
    : 'Account'

  const signUpChecker = async () => {
    const signUpCheck = await login()

    if (!signUpCheck) {
      setOpenSignUp(true)
    } else {
      setOpenSignUp(false)
    }
  }

  useEffect(() => {
    if (!isConnected && address) {
      signUpChecker()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

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
              {isConnected ? (
                <Stack
                  gap={2}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <ConnectButton />
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
                    </Box>
                    <IconButton size="large">
                      <Image
                        width={'30px'}
                        height={'30px'}
                        alt="ProfilePic"
                        src={ProfilePic}
                      />
                    </IconButton>
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
                <ConnectButton showBalance={false} chainStatus="none" />
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
