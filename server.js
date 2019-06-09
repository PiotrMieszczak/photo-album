const express = require("express");

var app = express();
var distDir = __dirname + "/dist/";

app.use(express.static(distDir));
app.listen(process.env.PORT || 8080);
