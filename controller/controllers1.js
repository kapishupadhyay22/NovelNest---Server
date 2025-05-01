const { User, Book } = require('../models/datamodels');
const asyncWrapper = require('../middleware/async');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient(6379);
const { sendOTPEmail, generateOTP } = require('./otpfile');

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
        return res.status(400).json({ "msg": "Invalid Auth Token" });
    }
    const book = await Book.findAll();

    if (!book) {
        return res.status(404).json({ "msg": "Error, book with this ID does not exist" });
    }
    res.status(200).json({ book });
});

const sendBook = asyncWrapper(async (req, res) => {
    const { bookid, author, views, content } = req.body;
    try {
        await Book.create({ bookid, author, views, content });
        res.status(200).json({ "msg": "task created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "msg": "Error creating book" });
    }
});

const addUser = asyncWrapper(async (req, res) => {
    const { username, email, password, age, genere, isAdmin } = req.body;
    const otp = generateOTP();
    try {
        await sendOTPEmail(email, otp);
        redisClient.setex(email, 300, otp);
        res.status(200).send('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send('Error sending OTP');
    }
});

const otpverify = asyncWrapper(async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;
    const genere = req.body.genere;
    const isAdmin = req.body.isAdmin;

    redisClient.get(email, async (err, storedOtp) => {
        if (err) {
            console.error('Error retrieving OTP:', err);
            return res.status(500).send('Internal server error');
        }

        if (storedOtp === otp) {
            const payload = {
                uname: username,
                role: isAdmin
            };

            const token = jwt.sign(payload, secretKey);
            await User.create({ username, email, password, age, genere, isAdmin });
            res.status(200).json(token);
        } else {
            res.status(400).send('Invalid OTP');
        }
    });
});

const loginUser = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({
        where: {
            username: username,
            password: password,
        }
    });
    if (!currentUser) {
        return res.status(404).json({ "msg": "invalid username or password" });
    }
    const payload = {
        uname: username,
        role: currentUser.isAdmin
    };
    const token = jwt.sign(payload, secretKey);
    res.status(200).json({
        "tok": token,
        "msg": "User login successful"
    });
});
// push for ssh
// hi
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
        return res.status(400).json({ "msg": "sorry you dont have the required permission for such operation" });
    }

    const allUser = await User.findAll();
    res.status(200).json({ allUser });
});

const getBookById = asyncWrapper(async (req, res) => {
    await redisClient.connect();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let i = req.params.id;
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
        return res.status(400).json({ "msg": "Invalid Auth Token" });
    }
    i = JSON.stringify(i);
    const cachedData = await redisClient.get(i);

    if (!cachedData) {
        const book = await Book.findOne({
            where: {
                bookid: idf
            }
        });

        if (!book) {
            return res.status(404).json({ "msg": "Error, book with this ID does not exist" });
        }
        const jsonstringbook = JSON.stringify(book);
        redisClient.set(i, jsonstringbook);
        res.status(200).json({ book });
    } else {
        const Books = JSON.parse(cachedData);
        res.status(200).json({ Books });
    }
});

module.exports = { getAllBooks, sendBook, addUser, showAllUser, loginUser, getBookById, otpverify };
