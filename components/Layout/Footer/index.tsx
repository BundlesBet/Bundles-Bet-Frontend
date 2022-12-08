import Image from 'next/image'
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'

// contexts and hooks

// components

// assets
import { Discord, Logo } from 'assets'

const Footer = (props: {}) => {
  return (
    <Box mt={4} sx={{ px: { xs: '5px', sm: '30px', md: '155px' }, py: '13px' }}>
      <Stack
        rowGap={2}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Image src={Logo} alt="logo" width={'26px'} height={'26px'} />
          </IconButton>
          <Typography variant="h6" color={'#0EB634'} mr={2}>
            Bundles
          </Typography>
          <Typography variant="h6" color={'#fff'}>
            Bets
          </Typography>
        </Stack>

        <Stack>
          <Typography fontSize={'20px'} fontWeight={'400'}>
            ©2021 Bundles Finance
          </Typography>
        </Stack>

        <Stack
          gap={2}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Twitter
              fontSize="medium"
              sx={{ ':hover': { cursor: 'pointer', color: '#0EB634' } }}
            />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://linkedin.com"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <LinkedIn
              fontSize="medium"
              sx={{ ':hover': { cursor: 'pointer', color: '#0EB634' } }}
            />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.com"
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            <IconButton
              sx={{
                color: '#fff',
                ':hover': { cursor: 'pointer', color: '#0EB634' },
              }}
              size="small"
              edge="start"
              aria-label="menu"
            >
              <Image alt="logo" src={Discord} width={'24px'} height={'24px'} />
            </IconButton>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebook.com"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Facebook
              fontSize="medium"
              sx={{ ':hover': { cursor: 'pointer', color: '#0EB634' } }}
            />
          </a>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
