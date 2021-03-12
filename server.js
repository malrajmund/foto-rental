const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

//Połącz z bazą danych
connectDB();

//Inicjalizacja Middleware
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(cors());

app.get("/", (req, res) => res.send("API Running"));

//Stworzenie routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/offers", require("./routes/api/offers"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/api/categories", require("./routes/api/categories"));


//Nasłuchiwanie na porcie 5000 lub porcie po deployu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
