import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material'

import Won from 'components/Table/Dashboard/Won'
import Lost from 'components/Table/Dashboard/Lost'
import ShowAllDashboardTable from 'components/Table/Dashboard/ShowAll'

import styles from './bets.module.scss'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function MyBetsTabs() {
  const theme = useTheme()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <>
      <Typography className={styles.heading} textAlign={'start'} mb={1}>
        {' '}
        My Bets
      </Typography>
      <Box sx={{ bgcolor: '#1C1C26', borderRadius: '4px' }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            sx={{
              bgcolor: '#1C1C26',
            }}
          >
            <Tab label="Show All" {...a11yProps(0)} />
            <Tab label="Lost" {...a11yProps(1)} />
            <Tab label="Won" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ShowAllDashboardTable />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Lost />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Won />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  )
}
