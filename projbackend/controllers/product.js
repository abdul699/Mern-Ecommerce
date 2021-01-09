const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
}

// create
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "problem loading image"
            });
        }

        // de-structure te fields
        const {name, description, price, category, stock} = fields;

        if(!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all necessary fields"
            })
        }
        let product = new Product(fields)

        // handle the file here
        if(file.photo) {
            if(file.photo.size > 3000006) {
                return res.status(400).json({
                    error: "File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // save to DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: "Not Able to save in DB"
                });
            }
            res.json(product);
        });
    });
}

// get
exports.getProduct = (req, res) => {
    res.product.photo = undefined;
    return res.json(req.product)
}

// middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

// delete 
exports.removeProduct = (req, res) => {
    const product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            res.status(400).json({
                error: `Fialed to delete ${product.name}`
            });
        }
        res.json({
            message: `Successfully deleted ${product.name}`
        });
    });
}

// update
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            res.status(400).json({
                error: "problem loading image"
            });
        }

        // updation
        let product = req.product;
        product = _.extend(product, fields)

        // handle the file here
        if(file.photo) {
            if(file.photo.size > 3000006) {
                return res.status(400).json({
                    error: "File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // save to DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: "Not Able to update product in DB"
                });
            }
            res.json(product);
        });
    });   
}

// Product listing
exports.getAllProduct = (req, res) => {
    // if from frontend we get the limit use that otherwise use 8 as default
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "No product found"
            });
        }
        res.json(products);
    });
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err) {
            res.status(400).json({
                error: "No category found"
            });
        }
        res.json(category)
    });
}

exports.updateStock = (req, res, next) => {
    let opretaions = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    });

    Product.bulkWrite(opretaions, {}, (err, products) => {
        if(err) {
            res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
}