const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {
    getProductById, 
    createProduct, 
    getProduct, 
    photo, 
    removeProduct, 
    updateProduct,
    getAllProduct,
    getAllUniqueCategories
} = require("../controllers/product");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// actual routers
// create
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

// read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct);

// update
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

// listing route
router.get("/products", getAllProduct);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;