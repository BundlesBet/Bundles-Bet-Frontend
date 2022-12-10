import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material'

import ActiveTable from 'components/Table/Activetable'
import UnActiveTable from 'components/Table/UnActiveTable'
import ShowAllTable from 'components/Table/ShowAllTable'

import styles from './tabs.module.scss'

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

export default function SelectPoolTabs() {
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
      <Typography className={styles.heading} textAlign={'start'} mb={2}>
        {' '}
        Select Pool
      </Typography>
      <Box sx={{ bgcolor: '#1C1C26' }}>
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
            <Tab label="Active" {...a11yProps(0)} />
            <Tab label="Inactive" {...a11yProps(1)} />
            <Tab label="Show All (80)" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ActiveTable />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <UnActiveTable />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ShowAllTable />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  )
}
