require('./config/connection');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require("bcryptjs");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));


const routes = require('./routers/routes');

app.use(express.json(), routes, cors());
app.listen(port, () => { console.log(`Run server...${port}`) });

app.post("/cripto", async function cripto(req, res){
    const { password } = req.body;
    const newpassword = await bcrypt.hash(password, 10);
    return res.send(newpassword);
});

app.post("/descrypt", async function descrypt(req, res) {
    const { password, passwordCripto } = req.body;
    const response = await bcrypt.compare(password, passwordCripto);
    return res.send(response)
}); 

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);
});