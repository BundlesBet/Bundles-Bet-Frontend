import React from 'react'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
  Link,
  Stack,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  accordionStyles,
  accordionSummaryStyles,
  accordionTextStyles,
} from 'styles/commonStyles'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

/**
 * @param <Pass Props as any>
 * @returns <returns the Select pool Accordion>
 */

type Props = {}

const SelectPoolAccordion = (props: Props) => {
  const router = useRouter()
  return (
    <>
      <Accordion sx={accordionStyles} defaultExpanded={true}>
        <AccordionSummary
          sx={{
            ...accordionSummaryStyles,
          }}
          expandIcon={<KeyboardArrowDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
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
              Start: {format(new Date(), ' HH:mm:ss aaa, MMM do yyyy')}
            </Typography>
            Standard Pool
          </Typography>

          <Typography
            variant="h4"
            color="secondary"
            fontWeight={400}
            ml={'auto'}
            sx={{
              fontSize: { xs: '12px', md: '22px', lg: '22px' },
            }}
          >
            5 Matches /<span style={{ color: '#fff' }}>{''}0.1 $BUND </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: '#1C1C26' }}>
          <Typography
            textAlign={'center'}
            sx={{
              mb: 2,
              mt: 2,
              ...accordionTextStyles,
            }}
          >
            Canada Vs Greece
          </Typography>
          <Typography
            mt={1}
            color={'#7D7D8D'}
            textAlign={'center'}
            fontSize={'14px'}
          >
            {' '}
            12,345 Active Bets
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography
            textAlign={'center'}
            sx={{
              mb: 2,
              ...accordionTextStyles,
            }}
          >
            US vs Germany
          </Typography>
          <Typography
            mt={1}
            color={'#7D7D8D'}
            textAlign={'center'}
            fontSize={'14px'}
          >
            {' '}
            12,345 Active Bets
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Stack>
            <Link
              component="button"
              sx={{ cursor: 'pointer', alignItems: 'center' }}
              onClick={() => {
                router.push('/select-pool')
              }}
            >
              See More
            </Link>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default SelectPoolAccordion
