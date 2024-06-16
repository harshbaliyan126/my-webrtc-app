const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const http = require('http').Server(app);


app.use(express.static('public'));

http.listen(port, ()=> {
	console.log("Server is running on port: " + port);
});


