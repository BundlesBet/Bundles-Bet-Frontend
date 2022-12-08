import React from 'react'
import { Box } from '@mui/material'

// Components
import Header from './Header'
import Footer from './Footer'

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
