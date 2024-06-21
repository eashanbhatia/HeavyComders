import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BannerSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <div className='bg-black'>
            <Slider {...settings}>
            <img src="https://static1.moviewebimages.com/wordpress/wp-content/uploads/2023/09/best-series-on-amazon-prime-to-watch-right-now.jpg" alt="" />
            <img src="https://m.media-amazon.com/images/G/01/primevideo/seo/primevideo-seo-logo.png" alt=""   />
            <img src="https://static1.moviewebimages.com/wordpress/wp-content/uploads/2023/10/25-best-original-movies-on-prime-video-to-watch-right-now.jpg" alt=""  />
            <img src="https://sm.ign.com/ign_in/screenshot/default/png-20230623-184107-0000_c1fk.jpg" alt="" />
            </Slider>
        </div>
    )
}

export default BannerSlider