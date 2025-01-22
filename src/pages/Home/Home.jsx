import React from 'react'
import { Helmet } from 'react-helmet-async'
import FeaturedSection from '../../components/Home/FeaturedSection'
import AboutUs from '../../components/Home/AboutUs'
import Slider from '../../components/Slider/Slider'
import FeaturedClass from '../../components/Home/FeaturedClass'
import FSingleClass from '../../components/Home/FSingleClass'
import TopForum from '../Community/TopForum'

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
            <TopForum></TopForum>
        </div>
    )
}

export default Home
