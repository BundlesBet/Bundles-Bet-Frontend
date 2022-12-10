import { Box, Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import {
  currentBalancePaperStyle,
  currentBalancePaperStyle2,
} from 'styles/commonStyles'
import styles from './currentBalance.module.scss'
import { useCopyToClipboard } from 'usehooks-ts'
import { useMetamask } from 'contexts/Metamask'
import Image from 'next/image'
import { Link } from 'assets/index'

type Props = {}

const CurrentBalance = (props: Props) => {
  const { account } = useMetamask()
  const [value, copy] = useCopyToClipboard()
  console.log('🚀 ~ file: index.tsx:16 ~ CurrentBalance ~ value', value)

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          ...currentBalancePaperStyle,
        }}
      >
        {!account ? (
          <Typography className={styles.heading} textAlign="center">
            Connect Your Wallet
          </Typography>
        ) : (
          <>
            <Typography className={styles.heading}>Current Balance</Typography>
            <Typography className={styles.balance}>2,356,123.45</Typography>
          </>
        )}
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          ...currentBalancePaperStyle2,
        }}
      >
        {!account ? (
          <Typography className={styles.stack}></Typography>
        ) : (
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography className={styles.stack}>56,123.45 $BUND</Typography>
            <Stack direction="row">
              <Typography className={styles.stack} mr={1}>
                {account
                  ? account.slice(0, 6) + '...' + account.slice(-4)
                  : 'Account'}
              </Typography>
              <Box sx={{ cursor: 'pointer' }}>
                <Image
                  src={Link}
                  alt="linkIcon"
                  onClick={() => {
                    copy(account)
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </Paper>
    </>
  )
}

export default CurrentBalance
