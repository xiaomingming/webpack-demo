const express = require('express');
const app = express();
const port = '9000';
const path = require('path');
const staticPath = path.join(__dirname, './dist');
app.use(express.static(staticPath));
app.get('/', function(req, res) {
  res.send('Hello world!');
});
app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})