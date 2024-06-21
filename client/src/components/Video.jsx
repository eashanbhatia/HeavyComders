import React, { useEffect, useRef, useState } from 'react';
import { useMovies } from '../MoviesContext';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../../node_modules/video-react/dist/video-react.css';
import captureVideoFrame from "capture-video-frame";
import axios from 'axios';

import videos from '../assets/airTrailer.mp4';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Card from './Card';
import Mysheet from './Mysheet';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "src/components/ui/sheet"

import Mycard from './Mycard';
import { Button } from './ui/button';


const Video = () => {
    const { id } = useParams();
    const moviesList = useMovies();
    const [imageSrc, setImageSrc] = useState('');
    const [products, setProducts] = useState([]);

    const [isPaused, setIsPaused] = useState(true); // Assume video is paused initially
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handlePause = () => setIsPaused(true);
        const handlePlay = () => setIsPaused(false);

        if (videoElement) {
            videoElement.addEventListener('pause', handlePause);
            videoElement.addEventListener('play', handlePlay);

            // Cleanup event listeners on component unmount
            return () => {
                videoElement.removeEventListener('pause', handlePause);
                videoElement.removeEventListener('play', handlePlay);
            };
        }
    }, []);
    // const clickHandler = async () => {
    //     console.log("Checking");
    //     const frame = captureVideoFrame("my-video-id", "png");
    //     console.log(frame);
    //     const formData = new FormData();
    //     formData.append('file', frame.dataUri);


    //     const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/ddlly0w8c/image/upload';
    //     const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;  


    //     try {
    //         const response = await axios.post(cloudinaryUploadUrl, formData, {
    //             params: {
    //                 upload_preset: uploadPreset,
    //                 // tags: 'myvideo'
    //             }
    //         });
    //         // console.log(response.data);
    //         const imageUrl = response.data.url
    //         console.log(imageUrl)
    //         setImageSrc(imageUrl)

    //     } catch (error) {
    //         console.error('Error uploading to Cloudinary:', error);
    //     }
    // };

    //---------FINAL---------
    // const clickHandler = async () => {
    //     console.log("Checking");


    //     const frame = captureVideoFrame("my-video-id", "png");
    //     // console.log(frame);


    //     const formData = new FormData();
    //     formData.append('file', frame.dataUri);

    //     const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dldlqv8js/image/upload';
    //     const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;

    //     try {
    //         // Uploading the image to Cloudinary
    //         const cloudinaryResponse = await axios.post(cloudinaryUploadUrl, formData, {
    //             params: {
    //                 upload_preset: uploadPreset,
    //                 // tags: 'myvideo'
    //             },
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });


    //         const imageUrl = cloudinaryResponse.data.url;
    //         console.log('Uploaded Image URL:', imageUrl);

    //         // Flask backend API to process the image
    //         const backendUrl = 'http://127.0.0.1:5000/api/detectImage';
    //         const backendResponse = await axios.post(backendUrl, {
    //             imageUrl: imageUrl
    //         });


    //         console.log('Backend Response:', backendResponse.data);
    //         console.log(backendResponse.data.result)

    //         // Update state or perform further actions based on backend response
    //         setImageSrc(imageUrl);

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const clickHandler = async () => {
        console.log("Checking");
        setProducts([]);
        const frame = captureVideoFrame("my-video-id", "png");
        console.log(frame.dataUri);

        const formData = new FormData();
        formData.append('file', frame.dataUri);

        const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dldlqv8js/image/upload';
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;

        try {
            // Uploading the image to Cloudinary
            const cloudinaryResponse = await axios.post(cloudinaryUploadUrl, formData, {
                params: {
                    upload_preset: uploadPreset,
                    // tags: 'myvideo'
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const imageUrl = cloudinaryResponse.data.url;
            console.log('Uploaded Image URL:', imageUrl);

            // Flask backend API to process the image
            const backendUrl = 'http://127.0.0.1:5000/api/detectImage';
            const backendResponse = await axios.post(backendUrl, {
                imageUrl: imageUrl
            });

            console.log('Backend Response:', backendResponse.data);
            const imageNames = backendResponse.data.result;

            // MongoDB API to fetch products based on imageNames
            const mongoApiUrl = 'http://localhost:5000/find-products'; // Change this to your actual MongoDB API URL
            const mongoResponse = await axios.post(mongoApiUrl, {
                imageNames: imageNames
            });

            console.log('MongoDB API Response:', mongoResponse.data);
            // const productdiv = document.getElementById('productdiv');
            // productdiv.innerHTML=''
            // setProducts([]);
            setProducts(mongoResponse.data);
            // Update state or perform further actions based on MongoDB API response
            setImageSrc(imageUrl);
            // Perform further actions with mongoResponse.data if needed

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // State setup in your component
    // const [imageSrc, setImageSrc] = useState(null);

    return (
        <div className=''>
            {/* <h1>Video {id}</h1> */}
            <div className='py-1 w-full bg-black flex flex-row pb-[200px]'>
                <video id="my-video-id" controls className='w-10/12 mx-auto rounded-lg border-grey border-2 mt-[60px]' ref={videoRef}>
                    <source src={videos} type="video/mp4" />
                </video>

            </div>
            <div className='bg-black'>

                <div className='text-white'>
                    <Sheet className='text-white'>
                        <SheetTrigger className='top-3 absolute right-[220px]  z-20'>
                            <Button onClick={clickHandler} className='outline'>
                                View Products 
                                <MdOutlineProductionQuantityLimits className='my-auto ml-2' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='bg-transparent overflow-y-auto'>
                            <SheetHeader>
                                <SheetTitle className='text-white '>Products on the current screen:</SheetTitle>
                                <SheetDescription className=''>
                                    {/* <Card /> */}
                                    {/* <div style={cardStyle}>
                                    <img src={product.image_url} alt={product.title} style={imageStyle} />
                                    <h3><a href={product.product_url} target="_blank" rel="noopener noreferrer">{product.title}</a></h3>
                                    <p>Price: {product.price}</p>
                                </div> */}

                                    <div className='text-white ml-2 text-2xl text-bold mx-auto flex top-32 relative align-middle justify-center'>
                                        <FontAwesomeIcon icon={faSpinner} spinPulse className='mx-auto' />
                                    </div>

                                    {products.map((product) => (
                                        // <Card key={product._id} product={product} />
                                        <Mycard key={product._id} product={product} />
                                    ))}
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </div>
            </div>
            {/* <button onClick={clickHandler} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row my-auto'>XRAY <MdOutlineProductionQuantityLimits className='my-auto ml-2' /> </button> */}
            {/* <Button variant='outline' size='34' onClick={clickHandler} className='p-1 relative bottom-[105px] left-60'>XRAY <MdOutlineProductionQuantityLimits className='my-auto ml-2' /> </Button> */}
            {/* {imageSrc && <img src={imageSrc} alt="Captured frame" />} */}
            {/* {isPaused && ( */}
                {/* <Button
                    variant='secondary'
                    size='34'

                    className='p-2 relative bottom-[610px] left-[120px]'>
                    XRAY
                    <MdOutlineProductionQuantityLimits className='my-auto ml-2' />
                </Button> */}
            {/* )} */}
        </div>
    );
};

export default Video;
