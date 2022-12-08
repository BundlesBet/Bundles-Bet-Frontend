import React from 'react'

// Components
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'

interface IProps {
  children: React.ReactNode
}

const Layout = (props: IProps) => {
  return (
    <>
      <Header />
      <Box minHeight={'100vh'}>{props.children}</Box>
      <Footer />
    </>
  )
}

export default Layout
