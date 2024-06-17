import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = () => {

    const moviesList = [
        {
            id: '1',
            imageUrl:
                'https://m.media-amazon.com/images/S/pv-target-images/a11e1b2ce890227c2e167b8c6263833890f48c5319d6e4f1c161d7525c7103fc.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
        },
        {
            id: '2',
            imageUrl:
                'https://www.adgully.com/img/800/202302/khatija-lokhandwala-2023-02-13t132749-383.png.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
        },
        {
            id: '3',
            imageUrl:
                'https://m.media-amazon.com/images/S/pv-target-images/a11e1b2ce890227c2e167b8c6263833890f48c5319d6e4f1c161d7525c7103fc.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
        },
        {
            id: '4',
            imageUrl:
                'https://m.media-amazon.com/images/S/pv-target-images/a11e1b2ce890227c2e167b8c6263833890f48c5319d6e4f1c161d7525c7103fc.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
        }

    ]

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay:true

    };

    return (
        <div className='bg-slate-900 pt-5'>
            {/* <div>Carousel</div> */}
            <div className='slider-contiiii w-11/12 mx-auto'>
                <Slider {...settings}>
                    {moviesList.map(eachMovie => (
                        <div key={eachMovie.id} className='px-5 '>
                            <button>
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