var express = require("express");
var router = express.Router();

const asyncHandler = require("express-async-handler");

// Display list of all books.
exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: test");
  console.log("test");
});
