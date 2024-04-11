const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const db = require('../db')

const router = express.Router();

router.put('/', verifyToken, async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        await db.promise().query('UPDATE users SET email = ?, password = ? WHERE id = ?', [email, password, userId]);

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
    }
});
router.delete('/', verifyToken,async (req, res) => {
    const userId = req.user.id;
    console.log(userId)

    try {
        await db.promise().beginTransaction();

        await db.promise().query('DELETE FROM blogs WHERE user_id = ?', [userId]);

        await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);

        await db.promise().commit();

        res.json({ message: "User and associated tasks posts deleted successfully" });
    } catch (error) {
        await db.promise().rollback();

        console.error("Error deleting user and associated tasks:", error);
        res.status(500).json({ error: "Error deleting user and associated tasks " });
    }
});

module.exports = router;
