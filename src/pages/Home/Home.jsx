import React from 'react'
import { Helmet } from 'react-helmet-async'
import Slider from '../../components/Slider/Slider'
import FeaturedSection from '../../components/Home/FeaturedSection'
import AboutUs from '../../components/Home/AboutUs'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Body Build House | Home Page</title>
            </Helmet>
            <Slider></Slider>
            <FeaturedSection></FeaturedSection>
            <AboutUs></AboutUs>
        </div>
    )
}

export default Home
