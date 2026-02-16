const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const dotenv = require("dotenv");
const { db } = require("./db");
const User = require("./model/user");

dotenv.config();

app.use(cors());
app.use(express.json());

db();

app.get("/user", (req, res) => {
    res.send("Hello User!");
});

app.post("/user", async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).send("User created!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put("/user/:id", async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).send("User not found");
        }
        res.send("User updated!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/user/:id", async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).send("User not found");
        }
        res.send("User deleted!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});