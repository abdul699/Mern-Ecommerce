import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteCategory, getAllCategories, updateCategory } from './helper/adminapicall'

 const ManageCategories = () => {

    const [categories, setCategories] = useState([])

    const {user, token} = isAutheticated();

    const preload = () => {
        getAllCategories()
        .then(data => {
            if(data.error) {
                console.log(data.error)
            }
            else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);


    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            }
            else {
                preload();
            }
        });
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
            <Link className="btn btn-info mb-2" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <h2 className="mb-4">All Categories:</h2>
            <div className="row">
                <div className="col-12">
                <h2 className="text-center text-white my-3">Total {categories.length} Categories</h2>
                {categories.map((category, index) => {
                    return(
                        <div key={index} className="row text-center mb-2 ">
                            <div className="col-6">
                                <h3 className="text-white text-left">{category.name}</h3>
                            </div>
                            <div className="col-6">
                                <button onClick={() => {
                                    deleteThisCategory(category._id)
                                }} className="btn btn-lg btn-outline-danger">
                                Delete
                                </button>
                            </div>
                        </div>);
                })}
                </div>
            </div>
        </Base>

    )
}
export default ManageCategories
