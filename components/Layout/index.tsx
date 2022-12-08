import React from 'react'

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
      {props.children}
      <Footer />
    </>
  )
}

export default Layout
