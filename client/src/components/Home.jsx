import React from 'react'
import Banner from './Banner'
import Carousel from './Carousel'
import BannerSlider from './BannerSlider'
import Navbar from './Navbar'


const Home = () => {
    
    return (
        <div>
            {/* <Banner /> */}
            {/* <Navbar className='fixed' /> */}
            <BannerSlider />
            <Carousel />
        </div>
    )
}

export default Home