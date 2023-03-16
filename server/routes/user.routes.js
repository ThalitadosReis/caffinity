const User = require("../models/User.model");
const {
  isAuthenticated,
  isAuthenticatedAndAdmin,
  isAuthenticatedOrAdmin,
} = require("../middleware/jwt.middleware");

const router = require("express").Router();
const bcrypt = require("bcrypt");

// PUT: Update a user
router.put("/:id", isAuthenticatedOrAdmin, (req, res) => {
  if (req.body.password) {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(req.body.password, salt))
      .then((hashedPassword) => {
        req.body.password = hashedPassword;

        User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
          .then((updatedUser) => {
            console.log("User updated:", updatedUser.title);
            res.status(200).json(updatedUser);
          })
          .catch((error) => {
            console.log("Error updating user information", error);
            res.status(500).json(error);
          });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
});

// DELETE: Delete a user
router.delete("/:id", isAuthenticatedOrAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json("User deleted");
    })
    .catch((error) => {
      console.log("Error deleting user", error);
      res.status(500).json(error);
    });
});

// GET: Get a user
router.get("/find/:id", isAuthenticatedAndAdmin, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    })
    .catch((error) => {
      console.log("Error getting the user", error);
      res.status(500).json(error);
    });
});

// GET: Get all users
router.get("/", isAuthenticatedAndAdmin, (req, res) => {
  const query = req.query.new;
  User.find()
    .sort({ _id: -1 })
    .limit(query ? 5 : 0)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log("Error getting all users", error);
      res.status(500).json(error);
    });
});

// GET: Get user's stats
router.get("/stats", isAuthenticatedAndAdmin, (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log("Error getting user's stats", error);
      res.status(500).json(error);
    });
});

module.exports = router;
