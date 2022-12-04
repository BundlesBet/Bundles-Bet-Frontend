import { Paper, Stack, Typography } from '@mui/material'
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
    <Container component="main" maxWidth="xs">
      <Paper
        variant="outlined"
        sx={{
          ...currentBalancePaperStyle,
        }}
      >
        <Typography className={styles.heading}>Current Balance</Typography>
        <Typography className={styles.balance}>2,356,123.45</Typography>
      </Paper>
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
            <Image
              src={Link}
              alt="linkIcon"
              onClick={() => {
                copy(account)
              }}
            />
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}

export default CurrentBalance
