import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper/index';
import Base from '../core/Base'
import { getaProduct, getAllCategories, updateProduct } from './helper/adminapicall';


const UpdateProduct = ({match}) => {

    const {user, token} = isAutheticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const { 
        name, 
        description, 
        price, 
        photo,
        stock,
        categories, 
        category, 
        loading, 
        error, 
        createdProduct, 
        getaRedirect, 
        formData
    } = values;

    const preload = (productId) => {
        getaProduct(productId).then(data => {
            // console.log(data)
            preloadCategories();
            if(data.error) {
                setValues({ ...values, error: data.error});
            }
            else {
                setValues({ 
                    ...values,
                    name: data.name,
                    description: data.description,
                    photo: data.photo,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData(),
                });
            }
        })
    }

    const preloadCategories = () => {
        getAllCategories()
        .then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error});
            }
            else {
                setValues({ 
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }

    useEffect(() => {
          preload(match.params.productId);
    }, []);

    // TODO: need to work on it
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            }
            else {
                setValues({
                    ...values, 
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
        .catch(err => console.log("ERR: ", err))
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    }

    const successMessage = () => (
        <div className="alert alert-success mt-3"
        style={{display : createdProduct ? "" : "none" }}>
            <h4>{createdProduct} Updates successfully</h4>
        </div>
    )

    const warningMessage = () => (
        <div className="alert alert-danger mt-3"
        style={{display : error ? "" : "none" }}>
            <h4>{error}</h4>
        </div>
    )

    const createProductForm = () => (
        <form >
          <div className="form-group mt-2 mb-2">
            <label className="btn btn-block form-control btn-success">
                <span >Post photo: </span>
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mt-2 mb-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mt-2 mb-2">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mt-2 mb-2">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mt-2 mb-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && 
              categories.map((category, index) => (
                  <option className="bg-dark text-white" key={index} value={category._id}>{category.name}</option>
              ))
              }
            </select>
          </div>
          <div className="form-group mt-2 mb-2">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          <button type="submit" onClick={onSubmit} className="btn form-control btn-block btn-outline-success mb-2 mt-2">
            Update Product
          </button>
        </form>
      );



    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    return (
        <div>
            <Base
            title="Add a product here!"
            description="Add new Tshirt"
            className="container bg-info p-4"
            >
                {goBack()}
                <div className="row bg-dark text-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {warningMessage()}
                        {createProductForm()}
                    </div>
                </div>
            </Base>
        </div>
    )
}
export default UpdateProduct; 
