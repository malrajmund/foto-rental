const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected...');
    }   catch(err){
        console.log(err.message);
        // Koniec processu - nie udało się połączyć z bazą danych
        process.exit(1);
    }
}

module.exports = connectDB;