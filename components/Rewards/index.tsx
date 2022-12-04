import { Button, Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import styles from './rewards.module.scss'
import { useMetamask } from 'contexts/Metamask'

type Props = {}

const Rewards = (props: Props) => {
  return (
    <Container component="main" maxWidth="md">
      <Typography className={styles.heading}>Rewards</Typography>
      {[...new Array(3)].map((item, key) => {
        return (
          <Paper
            variant="outlined"
            className={styles.paperStyle}
            sx={{
              p: { xs: 1, md: 2 },
              mt: 2,
            }}
            key={key}
          >
            <Typography className={styles.dateTime}>
              28 Aug 2022, 09:09:00
            </Typography>
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
              mt={2}
            >
              <Typography className={styles.bets}>
                USA <br /> <span style={{ marginTop: '4px' }}> FRN </span>
              </Typography>
              <Typography className={styles.bets}>
                6735 <br />
                <span className={styles.span}> $BOUND </span>
              </Typography>

              {/* if Won Use this */}
              <Paper
                variant="outlined"
                className={styles.paperWon}
                sx={{
                  p: { xs: 0.5, md: 1 },
                }}
              >
                Bet Won
              </Paper>

              {/* if Lost Use this */}
              {/* <Paper
                    variant="outlined"
                    className={styles.paperLost}
                    sx={{
                      p: { xs: 0.5, md: 1 },
                    }}
                  >
                    Bet Lost
                  </Paper> */}
            </Stack>
          </Paper>
        )
      })}
    </Container>
  )
}

export default Rewards
