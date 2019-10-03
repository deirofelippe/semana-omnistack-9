const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-ayr1y.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/*permite q qualquer applicacao acesse a api. '{origin:"http://localhost:3333"}' permite somente esse endereço*/
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);