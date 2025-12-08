import React from 'react'
import Hero from '../Components/Hero.jsx'
import LatestCollection from '../Components/LatestCollection.jsx'
import Bestseller from '../Components/Bestseller.jsx'

const Home = ({open,setopen}) => {
  return (
    <div>
        <Hero open={open} setopen = {setopen}/>
        <LatestCollection open={open} setopen = {setopen}/>
        <Bestseller open={open} setopen = {setopen}/>
    </div>
  )
}

export default Home
