const { User, Book } = require('../models/datamodels');
const asyncWrapper = require('../middleware/async');
const jwt = require('jsonwebtoken');
//const { all } = require('../routes/routes');
//const { get } = require('../routes/routes');


const secretKey = 'kapishupadhyay';


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
    const payload = {
        uname: username,
        role: isAdmin
    }
    const token = jwt.sign(payload, secretKey);
    await User.create({ username, email, password, age, genere, isAdmin });
    res.status(200).json(token);
})

const loginUser = asyncWrapper(async (req, res) => {
    const { username, email, password, age, genere, isAdmin } = req.body;
    const currentUser = User.findOne({
        where: {
            username: username,
            password: password
        }
    })
    if (!currentUser) {
        res.status(404).json({ "msg": "invalid username or password" });
    }
    const payload = {
        uname: username,
        role: isAdmin
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
module.exports = { getAllBooks, sendBook, addUser, showAllUser, loginUser };