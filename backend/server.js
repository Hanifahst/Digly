require("dotenv").config();
// require("./config/mongodb");

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes"); 
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require("./routes/memberRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes); 

app.use('/api/books', bookRoutes);
app.use("/api/member", memberRoutes); 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server backend berjalan lancar di port ${PORT}`);
});