const express = require("express"); 
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes");

const PORT = process.env.port || 3001;

mongoose.connect("mongodb://localhost:27017/workout-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("Connected to db successfully"))
  .catch(err => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});