import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({product}) => {
    const imageUrl = product 
    ? `${API}product/photo/${product._id}`
    : `https://media.gettyimages.com/photos/indian-bollywood-actors-kriti-sanon-and-varun-dhawan-make-an-during-picture-id497794866?s=2048x2048`;
    return (
        <div className="rounded border border-success p-2">
            <img
                src = {imageUrl}
                alt="Photo"
                style={{ maxHeight: "100%", maxWidth: "100% "}}
                className="mb-3 rounded" 
            />
        </div>
    )
}

export default ImageHelper;