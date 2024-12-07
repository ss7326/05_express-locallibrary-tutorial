const Book = require("../models/book");

var express = require("express");
var router = express.Router();

const asyncHandler = require("express-async-handler");

// Display list of all books.
exports.index = asyncHandler(async (req, res, next) => {
  try {
    const cnt = await Book.countDocuments({}).exec();
    res.send(`Book count: ${cnt}`);
  } catch (error) {
    console.error("Error counting documents:", error);
    next(error);
  }
});

exports.test = (req, res, next) => {
  res.render("test", {
    title: "Test",
    req: req,
    res: res,
    next: next,
  });
  // console.log(req);
  // console.log(res);
  // console.log(next);
};
