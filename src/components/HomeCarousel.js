import {Carousel} from "antd";
import React from 'react';
import '../styles/HomeCarousel.css';

const HomeCarousel = ({ slides }) => {
    return (
        <Carousel className="home-custom-carousel" effect="fade" dotPosition="bottom" autoplay autoplaySpeed={10000}>
            {slides.map((slide, index) => (
                <div key={index} className="home-custom-carousel-div">
                    <p className="home-custom-carousel-header">{slide.header}</p>
                    <p className="home-custom-carousel-text">{slide.text}</p>
                </div>
            ))}
        </Carousel>
    );
};

export default HomeCarousel;