import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import { app, server } from "./socket/socket.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const __dirname = path.resolve()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// To serves the static files we are using middleware
app.use(express.static(path.join(__dirname, "/frontend/dist")))


// To run frontend from server
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on PORT:${PORT}`)
});