const express = require('express');
const router = express.Router();

const { getAllBooks, sendBook, addUser, showAllUser, loginUser, getBookById, otpverify } = require('../controller/controllers')


router.route('/signup').post(addUser);
router.route('/signupverify').post(otpverify);
router.route('/login').post(loginUser);
router.route('/').get(getAllBooks).post(sendBook);
router.route('/:id').get(getBookById)
router.route('/user').get(showAllUser);
//router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router 