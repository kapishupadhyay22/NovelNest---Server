const express = require('express');
const User = require('./models/datamodels');
const notFound = require('./middleware/notfound');
const errorHandlerMiddleware = require('./middleware/errorhandler');
const { sequelize } = require('./connectdb');
const router = require('./routes/routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ "msg": "hello world" });
})
app.use('/api/v1/', router);
app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
        //await sequelize;
        app.listen(3000, () => {
            console.log('Server listening to port 3000 . . .');
        })
    } catch (err) {
        console.log(err);
    }
}

start();