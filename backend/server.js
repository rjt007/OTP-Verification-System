require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const otpRoute = require('./routes/otp');

//CORS Setting
const CorsOptions = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH'
    ],
  
    allowedHeaders: [
      'Content-Type', 'Authorization'
    ],
};
  
app.use(cors(CorsOptions));
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({request: 'success'});
});

app.use('/api',otpRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}..`));