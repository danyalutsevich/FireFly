import React, { useState, useEffect, useCallback } from "react";
import { json } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";
import ImageViewer from 'react-simple-image-viewer';
import { Loading } from "../Loading";

import ImagesCSS from "./Images.module.scss";

export function Images(props) {

    const { media_type, movie_id } = props
    const [images, setImages] = useState(undefined)
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {
        fetch(MovieDBLinks.images(movie_id, media_type))
            .then(data => data.json())
            .then(data => setImages([...(data?.backdrops||[]), ...(data?.posters||[]), ...(data?.profiles||[])].map((image) => MovieDBLinks.image_original + image.file_path)))
    }, [movie_id, media_type])


    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    if (images === undefined) {
        return <Loading />
    }


    return (
        <>
            <div className={ImagesCSS.Images}>
                {images?.map((image, index) =>
                    <img src={image} onClick={() => openImageViewer(index)} />
                )}
                {/* {JSON.stringify(images)} */}
            </div>
            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />)}
        </>
    )


}