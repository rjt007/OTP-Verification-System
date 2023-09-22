require('dotenv').config();
const express = require('express');
const app = express();
const otpRoute = require('./routes/otp');

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({request: 'success'});
});

app.use('/api',otpRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}..`));