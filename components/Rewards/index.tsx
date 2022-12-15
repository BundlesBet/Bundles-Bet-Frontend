import { formatInTimeZone } from 'date-fns-tz'
import { Paper, Stack, Typography } from '@mui/material'

import styles from './rewards.module.scss'

type Props = {}

const Rewards = (props: Props) => {
  return (
    <>
      <Typography className={styles.heading}>Rewards</Typography>
      {[...new Array(3)].map((item, key) => {
        return (
          <Paper
            key={key}
            variant="outlined"
            className={styles.paperStyle}
            sx={{
              p: { xs: 1, md: 2 },
              mt: 2,
            }}
          >
            <Typography className={styles.dateTime}>
              {formatInTimeZone(
                new Date(),
                Intl.DateTimeFormat().resolvedOptions().timeZone,
                'HH:mm aa, do MMM yyyy'
              )}
            </Typography>

            <Stack
              mt={2}
              direction="row"
              alignItems={'flex-start'}
              justifyContent={'space-between'}
            >
              <Typography className={styles.bets}>
                USA <br /> <span style={{ marginTop: '4px' }}> FRN </span>
              </Typography>

              <Typography className={styles.bets}>
                6735 <br />
                <span className={styles.span}> $BUND </span>
              </Typography>

              {/* if Won Use this */}
              <Paper
                variant="outlined"
                className={styles.paperWon}
                sx={{
                  p: { xs: 0.5, md: 1 },
                  fontFamily: 'DM Sans',
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
    </>
  )
}

export default Rewards
