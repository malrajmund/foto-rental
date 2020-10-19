const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Połącz z bazą danych
connectDB();

//Inicjalizacja Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Stworzenie routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/offers', require('./routes/api/offers'));


//Nasłuchiwanie na porcie 5000 lub porcie po deployu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));