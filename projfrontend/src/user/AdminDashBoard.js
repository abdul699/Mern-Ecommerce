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
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">Create catergory</Link>
                        <Link to="/admin/create/product" className="nav-link text-success">Create Product</Link>
                        <Link to="/admin/orders" className="nav-link text-success">Manage Order</Link>
                        <Link to="/admin/products" className="nav-link text-success">Manage Product</Link>
                    </li>

                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header bg-dark text-white">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <p className="text-success"><span className="badge">Name:</span> {name}</p>
                    </li>
                    <li className="list-group-item">
                        <p className="text-success"><span className="badge">Email:</span> {email}</p>
                    </li>
                </ul>
            </div>
        )}
    
    return (
        <Base 
            title="Welcome to admin area" 
            description="Manage all of your project here"
            className="container bg-success p-4"
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