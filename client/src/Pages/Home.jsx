import React from 'react'
import Hero from '../Components/Hero.jsx'
import LatestCollection from '../Components/LatestCollection.jsx'

const Home = ({open,setopen}) => {
  return (
    <div>
        <Hero open={open} setopen = {setopen}/>
        <LatestCollection/>
    </div>
  )
}

export default Home
