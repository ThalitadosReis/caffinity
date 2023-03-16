const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const { isAuthenticatedAndAdmin } = require("../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");

// POST: Creating a new product
router.post("/", isAuthenticatedAndAdmin, (req, res) => {
  const {
    title,
    description,
    image,
    price,
    category,
    origin,
    weight,
    inStock,
  } = req.body;

  Product.create({
    title,
    description,
    image,
    price,
    category,
    origin,
    weight,
    inStock,
  })
    .then((response) => {
      console.log("Product created:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error creating new product", error);
      res.status(500).json(error);
    });
});

// POST CLOUDINARY: route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  console.log("File is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

// PUT: Updating a specific product by it's id
router.put("/:id", isAuthenticatedAndAdmin, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findOneAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((response) => {
      console.log("Product updated:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error updating product information", error);
      res.status(500).json(error);
    });
});

// DELETE: Deleting a specific product by it's id
router.delete("/:id", isAuthenticatedAndAdmin, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findOneAndDelete(id)
    .then((response) => {
      console.log("Product deleted:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error deleting product", error);
      res.status(500).json(error);
    });
});

// GET: Displaying details of a specific product
router.get("/find/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(id)
    .then((product) => res.status(200).json(product))
    .catch((error) => res.json(error));
});

// GET: Display list of products
router.get("/", (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let products;

  if (qNew) {
    Product.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((result) => {
        products = result;
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else if (qCategory) {
    Product.find({ categories: { $in: [qCategory] } })
      .then((result) => {
        products = result;
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    Product.find()
      .then((result) => {
        products = result;
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
