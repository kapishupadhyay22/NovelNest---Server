const { User, Book } = require('../models/datamodels');
const asyncWrapper = require('../middleware/async');
//const { all } = require('../routes/routes');
//const { get } = require('../routes/routes');

const getAllBooks = asyncWrapper(async (req, res) => {
    const book = await Book.findAll();
    res.status(200).json({ book });
})

const sendBook = asyncWrapper(async (req, res) => {
    const { bookid, author, views, content } = req.body;
    try {
        await Book.create({ bookid, author, views, content });
        res.status(200).json({ "msg": "task created successfully" });
    } catch (err) {
        console.log(err);
    }
})


const addUser = asyncWrapper(async (req, res) => {
    const { username, email, password, age, genere, isAdmin } = req.body;
    try {
        await User.create({ username, email, password, age, genere, isAdmin });
        res.status(200).json({ "msg": "user created successfully" });
    } catch (err) {
        console.log(err);
    }
})
const showAllUser = asyncWrapper(async (req, res) => {
    const allUser = await User.findAll();
    res.status(200).json({ allUser });
})
module.exports = { getAllBooks, sendBook, addUser, showAllUser };