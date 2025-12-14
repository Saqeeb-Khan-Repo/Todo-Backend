const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://localhost:27017/config`)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const UserScheme = new mongoose.Schema({
  task: { type: String, Required: true },
  date: { type: String, Required: true },
});

const userModel = mongoose.model("todo", UserScheme, "todo");

module.exports = userModel;
