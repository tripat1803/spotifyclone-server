require('dotenv').config();

const app = require(`./app.js`);

require('./config/mongodb.js')();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port `+PORT));