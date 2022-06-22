const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config/keys");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

app.use(express.json());
const cookieParser = require("cookie-parser");
const { collection } = require("./models/User");
app.use(cookieParser());

require("./models/User");
require("./models/Demand");

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

require("./routes/dialogFlowRoutes")(app);
require("./routes/fulfillmentRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("conectado");
});
