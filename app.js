require("dotenv").config();
const express = require("express");
const cors = require("cors");

const menuRoutes = require("./routes/menu-routes");
const pesananRoutes = require("./routes/pesanan-routes");
const adminRoutes = require("./routes/admin-routes");

const errorHandlerMiddleware = require("./middlewares/errorHandling");

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT;
const app = express();

app.use(cors({}));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/menu", menuRoutes);
app.use("/pesanan", pesananRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
