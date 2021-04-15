import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import ImageHelper from './helper/ImageHelper'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    reload = undefined
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cartTitle = product ? product.name : "Coding Tshirt";
    const cartDescription = product ? product.description : "Default Tshirt Description";
    const cartPrice = product ? product.price : "10";

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true));
    }

    const getARedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }
    
    const showAddToCart = () => {
        return (
            addtoCart && (
                <div className="col-12">
                    <button
                        onClick = {addToCart}
                        className="rounded btn form-control btn-block btn-outline-success mt-2 mb-2">
                        Add to Cart
                    </button>
                </div>
            )
        )
    }

    const showRemoveFromCart = () => {
        return (removeFromCart && (
            <div className="col-12">
                <button
                    onClick = { () => {
                        removeItemFromCart(product._id);
                        setReload(!reload)
                    }}
                    className="btn rounded form-control btn-block btn-outline-danger mt-2 mb-2">
                    Remove from Cart
                </button>
            </div>
        ))
    }

    return (
        <div className="card text-white bg-dark border border-info" >
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {getARedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-info font-weight-normal text-wrap mt-2 rounded">{cartDescription}</p>
                <p className="btn btn-success rounded px-4">Price: {cartPrice}</p>
                <div className="row">
                    {showAddToCart(addtoCart)}
                    {showRemoveFromCart(removeFromCart)}
                </div>
            </div>
        </div>
    )
}
export default Card
