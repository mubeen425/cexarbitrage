const express = require("express");
const router = express.Router();

// ** Controllers
const {
  getExchange,
  getExchangeById,
  updateExchange,
  addNewExchange,
  deleteExchange,
} = require("../controllers/exchangeController");

// ** Middlewares
const {
  verifyAccessToken,
  isAuthenticatedUser,
} = require("../middlewares/auth");

// ** Routes Start
router.get("/get-exchange", 
  verifyAccessToken,
  isAuthenticatedUser,
  getExchange
);

router.get(
  "/get-exchange-by-id",
  verifyAccessToken,
  isAuthenticatedUser,
  getExchangeById,
);

router.post(
  "/add-new-Exchange",
  verifyAccessToken,
  isAuthenticatedUser,
  addNewExchange,
);

router.put(
  "/update-exchange",
  verifyAccessToken,
  isAuthenticatedUser,
  updateExchange,
);

router.delete(
  "/delete-exchange",
  verifyAccessToken,
  isAuthenticatedUser,
  deleteExchange,
);

module.exports = router;
