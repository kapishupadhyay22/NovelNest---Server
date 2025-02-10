const express = require('express');

module.exports = (controllers) => {
  const router = express.Router();

  const {
    getAllBooks,
    sendBook,
    addUser,
    showAllUser,
    loginUser,
    getBookById,
    otpverify,
  } = controllers;

  router.route('/signup').post(addUser);
  router.route('/signupverify').post(otpverify);
  router.route('/login').post(loginUser);
  router.route('/').get(getAllBooks).post(sendBook);
  router.route('/:id').get(getBookById);
  router.route('/user').get(showAllUser);

  return router;
};
