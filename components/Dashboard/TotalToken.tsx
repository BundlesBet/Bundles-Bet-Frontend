import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

import Image from 'next/image'

import { dashBoardCardStyle } from 'styles/commonStyles'
import { Coins } from 'assets'

type Props = {}

const TotalToken = (props: Props) => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          ...dashBoardCardStyle,
        }}
      >
        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box p={1}>
            <Image src={Coins} alt="trophy"></Image>
          </Box>

          <Stack
            direction="column"
            alignItems={'flex-end'}
            justifyContent={'space-between'}
          >
            <Typography
              fontSize={{ lg: '16px', sm: '12px' }}
              color="primary.light"
            >
              Tokens Transferred
            </Typography>
            <Typography variant={'h4'}>4522</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

export default TotalToken
