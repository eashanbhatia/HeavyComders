import React, { useRef, useState } from 'react';
import { useMovies } from '../MoviesContext';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../../node_modules/video-react/dist/video-react.css';
import captureVideoFrame from "capture-video-frame";
import axios from 'axios';
import videos from '../assets/airTrailer.mp4';
const Video = () => {
    const { id } = useParams();
    const moviesList = useMovies();
    const [imageSrc, setImageSrc] = useState('');

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

    const clickHandler = async () => {
        console.log("Checking");
    
        
        const frame = captureVideoFrame("my-video-id", "png");
        // console.log(frame);
    
    
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
    
            // Update state or perform further actions based on backend response
            setImageSrc(imageUrl);
    
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Video {id}</h1>

            <video id="my-video-id" autoPlay controls>
                <source src={videos} type="video/mp4" />
            </video>
            <button onClick={clickHandler}>XRAY</button>
            {/* {imageSrc && <img src={imageSrc} alt="Captured frame" />} */}
        </div>
    );
};

export default Video;
