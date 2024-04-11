const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const db = require('../db')

const router = express.Router();


router.post('/', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    console.log(title);
    
    const userId = req.user.id; 
    
    console.log(userId);
  
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
  
    try {
      const [results] = await db.promise().query('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, userId]);
      res.json({ id: results.insertId });
  
    } catch (error) {
      console.error("Error creating posts post:", error);
      res.status(500).json({ error: "Error creating posts post" });
    }
});


router.get('/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;

  try {
    const [results] = await db.promise().query('SELECT * FROM tasks WHERE id = ?', [postId]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(results[0]);

  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Error fetching post" });
  }
});



router.put('/:id', verifyToken, async (req, res) => {
    const postId = req.params.id;
    const { title, description } = req.body;
    const userId = req.user.userId; 
  
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
  
    try {
      const [results] = await db.promise().query('UPDATE tasks SET title = ?, description = ? WHERE post_id = ? AND user_id = ?', [title, description, postId, userId]);
  
      if (results.affectedRows === 0) {
        return res.status(403).json({ error: "You are not authorized to update this task " });
      }
  
      res.send("task updated successfully");
  
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    }
  });

  router.delete('/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
  
    const [results] = await db.promise().query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [postId, userId]);

    if (results.affectedRows === 0) {
      return res.status(403).json({ error: "You are not authorized to delete this task or the task does not exist" });
    }

    res.json({ message: "task deleted successfully" });

  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
});


  module.exports = router;
