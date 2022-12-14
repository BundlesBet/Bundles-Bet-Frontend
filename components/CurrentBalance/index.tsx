import React from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'usehooks-ts'
import { Box, Paper, Stack, Typography } from '@mui/material'

import { useMetamask } from 'contexts/Metamask'

import {
  currentBalancePaperStyle,
  currentBalancePaperStyle2,
} from 'styles/commonStyles'
import styles from './currentBalance.module.scss'

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

      {account && (
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
