import React from 'react'
import Image from 'next/image'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import { Person } from '@mui/icons-material'
import { useCopyToClipboard } from 'usehooks-ts'
import { Box, Menu, MenuItem, Typography } from '@mui/material'

// contexts and hooks
import { useMetamask } from 'contexts/Metamask'

// assets
import { Link } from 'assets/index'

type Props = {
  anchorEl: HTMLElement | null
  open: boolean
  handleClose: (state: boolean) => void
}

const BalanceView = (props: Props) => {
  const { anchorEl, handleClose, open } = props

  const router = useRouter()
  const { account } = useMetamask()
  const [value, copy] = useCopyToClipboard()
  console.log('🚀 ~ file: index.tsx:16 ~ CurrentBalance ~ value', value)

  return (
    <Menu
      open={open}
      variant="menu"
      id="basic-menu"
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      sx={{
        '& .MuiPaper-root': {
          m: 0,
          p: 0,
          backgroundColor: '#1C1C26',
        },
      }}
    >
      <MenuItem sx={{ p: 0, m: 0 }}>
        <Box width={'100%'}>
          <Stack p={'10px'} alignItems={'flex-end'}>
            <Typography
              fontSize={'12px'}
              fontWeight={700}
              lineHeight={'16px'}
              color={'#7D7D8D'}
            >
              Current Balance
            </Typography>
            <Typography
              fontSize={'24px'}
              fontWeight={700}
              lineHeight={'30px'}
              color={'#fff'}
            >
              2,356,123.45
            </Typography>
            <Typography
              fontSize={'14px'}
              fontWeight={700}
              lineHeight={'18px'}
              color={'#00FFC2'}
            >
              $1520.321
            </Typography>
          </Stack>

          <Stack
            gap={10}
            p={'10px'}
            direction={'row'}
            bgcolor={'#282835'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              onClick={() => router.push('/dashboard')}
            >
              <Person sx={{ color: '#fff' }} />
              <Typography ml={1} color={'#fff'} mr={1}>
                Profile
              </Typography>
            </Stack>

            <Stack direction={'row'} alignItems={'center'}>
              <Typography color={'#7D7D8D'} mr={1}>
                {account
                  ? account.slice(0, 6) + '...' + account.slice(-4)
                  : 'Account'}
              </Typography>
              <Image
                color="#7D7D8D"
                src={Link}
                alt="linkIcon"
                onClick={() => {
                  copy(account)
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </MenuItem>
    </Menu>
  )
}

export default BalanceView
