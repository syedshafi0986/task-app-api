import Task from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const task = new Task({ title, description, completed: completed || false });
    await task.save();
    
    return res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    return res.status(400).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    if (!title && !description && completed === undefined) {
      return res.status(400).json({ message: "At least one field is required for update" });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    return res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully", task });
  } catch (err) {
    console.error("Error deleting task:", err);
    return res.status(400).json({ message: err.message });
  }
};
