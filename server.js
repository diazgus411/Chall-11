const express = require('express');
const app = express();

const index = require('./routes/indexRoutes.js');
const api = require('./routes/notesRoutes.js');

const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', index);
app.use('/api/notes', api);

app.use(express.static('public'));

app.listen(PORT ,() => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
});