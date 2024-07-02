const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentController = require('./controllers/studentController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/students', studentController.create);
app.get('/students', studentController.getAll);
app.get('/students/:id', studentController.getById);
app.put('/students/:id', studentController.update);
app.delete('/students/:id', studentController.delete);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
