const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

//Połącz z bazą danych
connectDB();

//Inicjalizacja Middleware
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(cors());

//Stworzenie routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/offers", require("./routes/api/offers"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/api/categories", require("./routes/api/categories"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Nasłuchiwanie na porcie 5000 lub porcie po deployu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
