import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

import { useCopyToClipboard } from 'usehooks-ts'
import { useMetamask } from 'contexts/Metamask'
import Image from 'next/image'

import { dashBoardCardStyle } from 'styles/commonStyles'
import { Trophy } from 'assets'

type Props = {}

const TotalBets = (props: Props) => {
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
            <Image src={Trophy} alt="trophy"></Image>
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
              Total Bets Participation
            </Typography>
            <Typography variant={'h4'}>12</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

export default TotalBets
