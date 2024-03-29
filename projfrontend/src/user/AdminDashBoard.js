import React from 'react'
import Base from '../core/Base'
import {isAutheticated} from  "../auth/helper/index"
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

    const {
    user: {name, email, role}
    } = isAutheticated();

    const adminLeftSide = () => {
        return (
            <div className="card border-primary">
                <h4 className="card-header bg-dark text-white">Navigations</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">
                        <Link to="/admin/create/category" className="nav-link text-success font-weight-bold">Create Catergory</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/admin/categories" className="nav-link text-success">Manage Categories</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/admin/create/product" className="nav-link text-success">Create Product</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/admin/orders" className="nav-link text-success">Manage Order</Link>
                    </li> 
                    

                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4 border-primary">
                <h4 className="card-header bg-dark text-white">My Information</h4>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <p className="text-success"><span className="badge bg-warning text-dark">Name: </span> {name}</p>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <p className="text-success"><span className="badge bg-warning text-dark">Email:</span> {email}</p>
                    </li>
                </ul>
            </div>
        )}
    
    return (
        <Base 
            title="Welcome"
            description="You can manage all products, categories and orders here"
            className="container p-4"
        >
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
            
        </Base>
    )}

export default AdminDashBoard