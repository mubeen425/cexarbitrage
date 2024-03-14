const express = require("express");
const router = express.Router();

const {
  getCoin,
  getCoinById,
  updateCoin,
  addNewCoin,
} = require("../controllers/coinController");
const {
  verifyAccessToken,
  isAuthenticatedUser,
} = require("../middlewares/auth");

router.get("/get-coins", getCoin);
router.get(
  "/get-coin-by-id",
  verifyAccessToken,
  isAuthenticatedUser,
  getCoinById,
);
router.post(
  "/add-new-coin",
  verifyAccessToken,
  isAuthenticatedUser,
  addNewCoin,
);
router.put("/update-coin", verifyAccessToken, isAuthenticatedUser, updateCoin);

module.exports = router;
