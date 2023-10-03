const router = require("express").Router();
const User = require("../models/user.js");
const List = require("../models/list.js");

//create
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, status, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, status, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, status } = req.body;
   
    const list = await List.findByIdAndUpdate(req.params.id, { title, body , status});

    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await List.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//get all tasks
router.get("/getTasks/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ _id: -1 });
  if (list.length !== 0) {
    res.status(200).json({ list: list });
  } else {
    res.status(200).json({ message: "No task Added" });
  }
});

module.exports = router;
