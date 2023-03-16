const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/Order.model");
const {
  isAuthenticated,
  isAuthenticatedAndAdmin,
  isAuthenticatedOrAdmin,
} = require("../middleware/jwt.middleware");

// POST: Creating a new order
router.post("/", isAuthenticated, (req, res) => {
  const { userId, products, amount, address, status } = req.body;

  Order.create({
    userId,
    products,
    amount,
    address,
    status,
  })
    .then((response) => {
      console.log("Order created:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error creating new order", error);
      res.status(500).json(error);
    });
});

// PUT: Updating a specific order by it's id
router.put("/:id", isAuthenticatedAndAdmin, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findOneAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((response) => {
      console.log("Order updated:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error updating order information", error);
      res.status(500).json(error);
    });
});

// DELETE: Deleting a specific order by it's id
router.delete("/:id", isAuthenticatedAndAdmin, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findOneAndDelete(id)
    .then((response) => {
      console.log("Order deleted:", response.title);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log("Error deleting product", error);
      res.status(500).json(error);
    });
});

// GET: User's order
router.get("/find/:userId", isAuthenticatedOrAdmin, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(userId)
    .then((orders) => res.status(200).json(orders))
    .catch((error) => res.json(error));
});

// GET: All orders
router.get("/", isAuthenticatedAndAdmin, (req, res) => {
  Product.find()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET: Income Monthly
router.get("/income", isAuthenticatedAndAdmin, (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ])
    .then((income) => {
      res.status(200).json(income);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
