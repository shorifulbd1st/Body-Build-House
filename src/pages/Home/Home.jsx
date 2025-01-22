import React from 'react'
import { Helmet } from 'react-helmet-async'
import FeaturedSection from '../../components/Home/FeaturedSection'
import AboutUs from '../../components/Home/AboutUs'
import Slider from '../../components/Slider/Slider'
import FeaturedClass from '../../components/Home/FeaturedClass'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Body Build House | Home Page</title>
            </Helmet>
            <Slider></Slider>
            <FeaturedSection></FeaturedSection>
            <AboutUs></AboutUs>
            <FeaturedClass></FeaturedClass>
        </div>
    )
}

export default Home
