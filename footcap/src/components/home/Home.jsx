import React from 'react'
import Collections from '../collections/Collections'
import Footer from '../common/footer/Footer'
import FooterBlack from '../common/footer/FooterBlack'
import Header from '../common/header/Header'
import Cover from './cover/Cover'
import Hero from './hero/Hero'
import InstImg from './instImages/InstImg'
import Products from './products/Products'
import Services from './services/Services'

function Home() {
  return (
    <div>
        <Header/>
        <Hero/>
        <Collections/>
        <Products/>
        <Cover/>
        <Services/>
        <InstImg/>
        <Footer/>
        <FooterBlack/>
    </div>
  )
}

export default Home