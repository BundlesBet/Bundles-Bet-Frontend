import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { formatInTimeZone } from 'date-fns-tz'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material'

import { matches } from 'utils'

import { accordionStyles, accordionTextStyles } from 'styles/commonStyles'

type Props = {}

const SelectPoolAccordion = (props: Props) => {
  const router = useRouter()

  return (
    <>
      <Accordion sx={accordionStyles} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack
            width={'100%'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Stack
              sx={{
                ...accordionTextStyles,
                fontSize: { xs: '14px', md: '24px', lg: '24px' },
              }}
            >
              <Typography
                fontSize={'16px'}
                color={'#7D7D8D'}
                mb={1}
                fontWeight={600}
              >
                Start:{' '}
                {formatInTimeZone(
                  new Date(),
                  Intl.DateTimeFormat().resolvedOptions().timeZone,
                  'HH:mm aa, do MMM yyyy'
                )}
              </Typography>
              Standard Pool
            </Stack>

            <Typography
              color="secondary"
              fontWeight={400}
              sx={{
                fontSize: { xs: '12px', md: '20px' },
              }}
            >
              5 Matches / <span style={{ color: '#fff' }}>{''}0.1 $BUND </span>
            </Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails sx={{ bgcolor: '#1C1C26' }}>
          {matches.map((match, index) => (
            <Fragment key={index}>
              <Stack my={1}>
                <Typography
                  textAlign={'center'}
                  sx={{
                    ...accordionTextStyles,
                  }}
                >
                  {match.teamA} Vs {match.teamB}
                </Typography>
                <Typography
                  mt={1}
                  fontSize={'14px'}
                  color={'#7D7D8D'}
                  textAlign={'center'}
                >
                  {' '}
                  {match.bets} Active Bets
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
            </Fragment>
          ))}

          <Stack>
            <Link
              component="button"
              sx={{ cursor: 'pointer', alignItems: 'center' }}
              onClick={() => {
                router.push('/select-pool')
              }}
            >
              View Pool details
            </Link>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default SelectPoolAccordion
