const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(cors())
 

const PORT = process.env.PORT || 5000;

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const user = require('./app/routes/user.routes')
const auth = require('./app/routes/authenticated.routes')
const product = require('./app/routes/products.routes')
const bill = require('./app/routes/bills.routes')
const rate = require('./app/routes/rate.routes')

app.use('/api', rate);
app.use('/api', auth);
app.use('/api', user);
app.use('/api', product)
app.use('/api', bill)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));