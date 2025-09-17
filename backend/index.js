const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./models');
const cors = require('cors')

app.use(cors())
app.use(express.json());


const productRouter = require('./routes/Products');
app.use("/", productRouter);


db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT,(err)=>{
        if(err) console.log(err.message);
        console.log(`Server running in port ${process.env.PORT}`);
    });
});
