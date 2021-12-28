const express = require("express");
const app = express(); 
const path = require("path");
const { upload } = require('./uploadFile');

const port = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, "views")));
app.set('views', './views');

app.post('/image', upload.single("image"), function (req, res){
    console.log(req.file.path);
    console.log(req.file.filename);
    res.status(200).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});