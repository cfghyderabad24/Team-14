const userRoutes = require('./routes/users');
const connectToMongo=require('./db');
const bodyParser = require('body-parser');
const scholarshipRequestRoutes = require('./routes/scholarshipRequests');
const express = require('express')
const dotenv = require('dotenv');
// const auth = require('./routes/auth')
// const notes = require('./routes/notes')
var cors = require('cors')
connectToMongo();
dotenv.config();


const app = express()
app.use(cors())
app.use(bodyParser.json());
const port = 8000

app.use(express.json())
app.use('/api/users', userRoutes);
app.use('/api/scholarshipRequests', scholarshipRequestRoutes);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})