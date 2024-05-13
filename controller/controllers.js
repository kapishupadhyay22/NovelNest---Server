const { User, Book } = require('../models/datamodels');
const asyncWrapper = require('../middleware/async');
const jwt = require('jsonwebtoken');


const secretKey = 'kapishupadhyay';


const getAllBooks = asyncWrapper(async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ "msg": "login/signup is required" });
    }
    let currentUser;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        currentUser = decoded;
    });

    if (!currentUser) {
        res.status(400).json({ "msg": "Invalid Auth Token" });
    }
    //console.log(idf);
    const book = await Book.findAll();

    if (!book) {
        res.status(404).json({ "msg": "Error, book with this ID does not exists" })
    }
    // console.log(book);
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
    const payload = {
        uname: username,
        role: isAdmin
    }
    // Code for OTP verification of email
    // Code for checking if the username or email exists
    const token = jwt.sign(payload, secretKey);
    await User.create({ username, email, password, age, genere, isAdmin });
    res.status(200).json(token);
})

const loginUser = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({
        where: {
            username: username,
            password: password,
        }
    })
    if (!currentUser) {
        res.status(404).json({ "msg": "invalid username or password" });
    }
    const payload = {
        uname: username,
        role: currentUser.isAdmin
    }
    const token = jwt.sign(payload, secretKey);
    res.status(200).json({
        "tok": token,
        "msg": "User login successfull"
    }
    );
})


const showAllUser = asyncWrapper(async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    let currentUser;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        currentUser = decoded;
    });

    if (!currentUser.role) {
        res.status(400).json({ "msg": "sorry you dont have the required permission for such operation" });
    }

    const allUser = await User.findAll();
    res.status(200).json({ allUser });

})


const getBookById = asyncWrapper(async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const i = parseInt(req.params.id);
    const idf = i.toString();
    if (!token) {
        return res.status(401).json({ "msg": "login/signup is required" });
    }
    let currentUser;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        currentUser = decoded;
    });

    if (!currentUser) {
        res.status(400).json({ "msg": "Invalid Auth Token" });
    }
    //console.log(idf);
    const book = await Book.findOne({
        where: {
            bookid: idf
        }
    })

    if (!book) {
        res.status(404).json({ "msg": "Error, book with this ID does not exists" })
    }
    // console.log(book);
    res.status(200).json({ book });
})



module.exports = { getAllBooks, sendBook, addUser, showAllUser, loginUser, getBookById };