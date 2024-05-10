const express = require('express');
const router = express.Router();

const { getAllBooks, sendBook, addUser, showAllUser, loginUser } = require('../controller/controllers')


router.route('/signup').post(addUser);
router.route('/login').post(loginUser);
router.route('/').get(getAllBooks)
router.route('/').post(sendBook);
router.route('/user').get(showAllUser);
//router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router 