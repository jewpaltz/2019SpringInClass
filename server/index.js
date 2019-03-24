const express   = require('express');
const path      = require('path');
const users     = require('./controllers/users');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../NoFramework")));
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', users);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({msg: err.message });
  })

app.listen(port, () => console.log(`Example app http://localhost:${port}`));