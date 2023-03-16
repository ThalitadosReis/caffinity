const router = require("express").Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart.model");
const {
  isAuthenticated,
  isAuthenticatedAndAdmin,
  isAuthenticatedOrAdmin,
} = require("../middleware/jwt.middleware");

// POST: New Cart
router.post("/", isAuthenticated, (req, res) => {
  const { userId, products } = req.body;

  Cart.create({
    userId,
    products,
  })
    .then((response) => {
      console.log("Cart created:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error creating new cart", error);
      res.status(500).json(error);
    });
});

// PUT: Updating a specific cart by it's id
router.put("/:id", isAuthenticatedAndAdmin, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cart.findOneAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((response) => {
      console.log("Cart updated:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error updating cart information", error);
      res.status(500).json(error);
    });
});

// DELETE: Deleting a specific cart by it's id
router.delete("/:id", isAuthenticatedAndAdmin, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cart.findOneAndDelete(id)
    .then((response) => {
      console.log("Cart deleted:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error deleting cart", error);
      res.status(500).json(error);
    });
});

// GET: User's cart
router.get("/find/:userId", isAuthenticatedOrAdmin, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cart.findById(userId)
    .then((carts) => res.status(200).json(carts))
    .catch((error) => res.json(error));
});

// GET: All carts
router.get("/", isAuthenticatedAndAdmin, (req, res) => {
  Cart.find()
    .then((carts) => {
      res.status(200).json(carts);
      carts;
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
