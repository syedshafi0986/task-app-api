import Task from "../models/TaskModel.js";


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
    const {title, description, completed} = req.body;
    
  try {
    const task = new Task({ title, description, completed });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, description, completed} = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id,{title,description,completed}, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
    const {id} = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully", task });s
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
