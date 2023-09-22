require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({request: 'success'});
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}..`));