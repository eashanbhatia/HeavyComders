import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { useMovies } from '../MoviesContext';

const Carousel = () => {
    const moviesList = useMovies();
    // console.log("incarousel:",moviesList)
    const navigate = useNavigate(); 

    function clickHandler(movieData) {
        console.log("Carousel:",movieData)
        navigate(`/video/${movieData.id}`)
    }
    
    

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true

    };

    return (
        <div className='bg-black pt-5'>
            <div className='slider-contiiii w-11/12 mx-auto'>
                <Slider {...settings}>
                    {moviesList.map(eachMovie => (
                        <div key={eachMovie.id} className='px-5'>
                            <button onClick={() => clickHandler(eachMovie)}>
                                <div className='box-border'>
                                    <img
                                        src={eachMovie.imageUrl}
                                        alt=""
                                        className='rounded-lg object-cover'
                                    />
                                </div>
                            </button>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>

    )
}

export default Carousel