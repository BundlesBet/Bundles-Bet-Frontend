import React from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'usehooks-ts'
import { Box, Paper, Stack, Typography } from '@mui/material'

import {
  currentBalancePaperStyle,
  currentBalancePaperStyle2,
} from 'styles/commonStyles'
import styles from './currentBalance.module.scss'

import { Link } from 'assets/index'
import { useAccount } from 'wagmi'

type Props = {}

const CurrentBalance = (props: Props) => {
  const { isConnected, address }: any = useAccount()
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
        {!isConnected ? (
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

      {isConnected && (
        <Paper
          variant="outlined"
          sx={{
            ...currentBalancePaperStyle2,
          }}
        >
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography className={styles.stack}>56,123.45 $BUND</Typography>
            <Stack direction="row">
              <Typography className={styles.stack} mr={1}>
                {isConnected
                  ? address.slice(0, 6) + '...' + address.slice(-4)
                  : 'Account'}
              </Typography>
              <Box sx={{ cursor: 'pointer' }}>
                <Image
                  src={Link}
                  alt="linkIcon"
                  onClick={() => {
                    copy(address)
                    toast.success('Account address copied successfully')
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Paper>
      )}
    </>
  )
}

export default CurrentBalance
