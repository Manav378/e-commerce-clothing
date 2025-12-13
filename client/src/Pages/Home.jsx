import React from 'react'
import Hero from '../Components/Hero.jsx'
import LatestCollection from '../Components/LatestCollection.jsx'
import Bestseller from '../Components/Bestseller.jsx'
import OurPlolicy from '../Components/ourPlolicy.jsx'
import Newsletterbox from '../Components/Newsletterbox.jsx'

const Home = () => {
  return (
    <div>
        <Hero />
        <LatestCollection />
        <Bestseller />
        <OurPlolicy />
        <Newsletterbox />
      
    </div>
  )
}

export default Home
