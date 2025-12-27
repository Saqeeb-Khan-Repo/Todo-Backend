const express = require("express");
const cors = require("cors");
require("dotenv").config;
const PORT = process.env.PORT || 3000;
const userModel = require("./models/User");

const app = express();

app.use(cors()); //middlewear
app.use(express.json()); //middlewear

app.get("/", (req, res) => {
  res.json({
    message: "Backend is live on railway",
  });
});

app.post("/create", (req, res) => {
  //CREATE
  const userData = req.body;
  userModel
    .create(userData)
    .then((user) => {
      res.json(user);
      console.log("Todo Task:", user);
    })
    .catch((err) => res.json(err));
});

app.get("/todo", async (req, res) => {
  //READ

  try {
    const todos = await userModel.find({}).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.json({ err: err.message });
  }
});

//upadate todo
app.get("/getTodo/:id", async (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((edit) => res.json(edit))
    .catch((err) => res.json(err));
});
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { task, date } = req.body; // Expect updated task and date from request body

  try {
    const updatedTodo = await userModel.findByIdAndUpdate(
      id,
      { task, date },
      { new: true } // return updated document
    );
    res.json({
      data: updatedTodo,
      message: "Update successful",
    });
  } catch (err) {
    res.json({
      data: err,
      message: "Failed to update",
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
  //delete

  const id = req.params.id;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({
        message: "Book is deleted",
        data: data,
      });
      console.log("deleted todo:", data);
    })
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Your App is Live At ${PORT}`);
});
