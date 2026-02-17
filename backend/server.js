const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 5000;
const cors = require("cors");
const { db } = require("./db");
const auth = require("./Middleware/auth");
const userController = require("./controller/usercontroller");

// Global error handlers
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception thrown:", err);
    process.exit(1);
});

app.use(cors());
app.use(express.json());

// Routes
app.get("/user", auth, userController.getUser);
app.post("/user", userController.createUser);
app.post("/login", userController.loginUser);
app.put("/user/:id", auth, userController.updateUser);
app.delete("/user/:id", auth, userController.deleteUser);

const startServer = async () => {
    try {
        await db();

        const server = app.listen(port, () => {
            console.log(`🚀 API is live at http://localhost:${port}`);
        });

        server.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                console.error(`❌ Port ${port} is already in use. Please kill the process manually.`);
                process.exit(1);
            } else {
                console.error("❌ Server error:", error);
            }
        });

        // Keep the process alive explicitly if needed (though app.listen should do it)
        setInterval(() => {
            if (server.listening) {
                // Just a heartbeat to ensure the event loop has work
            }
        }, 60000);

    } catch (error) {
        console.error("❌ Failed to initiate startup:", error);
        process.exit(1);
    }
};

startServer();