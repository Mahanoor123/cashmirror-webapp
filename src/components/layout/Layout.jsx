import React from 'react'
import TopNavbar from '../TopNavbar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    {/* <TopNavbar />
    <Navbar /> */}
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout
