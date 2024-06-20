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

    const clickHandler = async () => {
        console.log("Checking");
        const frame = captureVideoFrame("my-video-id", "png");
        console.log(frame);
        const formData = new FormData();
        formData.append('file', frame.dataUri);


        const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/ddlly0w8c/image/upload';
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;  


        try {
            const response = await axios.post(cloudinaryUploadUrl, formData, {
                params: {
                    upload_preset: uploadPreset,
                    // tags: 'myvideo'
                }
            });
            // console.log(response.data);
            const imageUrl = response.data.url
            console.log(imageUrl)
            setImageSrc(imageUrl)

        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
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
