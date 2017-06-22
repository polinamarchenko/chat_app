const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname, '../public')

var app = express();
const port = process.env.PORT || 3000
//configure express static middleware to serve the public folder
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Application started. Listening on port: ${port}`);
})


module.exports = {app};
