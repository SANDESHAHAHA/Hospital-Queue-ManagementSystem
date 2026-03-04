import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import User from "../database/models/User.js";
import app from "../app.js";
function startServer() {
    const server = app.listen(process.env.PORT, () => {
        console.log("Project has been started at port no ", process.env.PORT);
    });
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    // expose io through the express app so controllers can emit events
    app.set('io', io);
    let OnlineUsers = [];
    let addToOnlineUsers = (socketId, userId, role) => {
        OnlineUsers = OnlineUsers.filter((user) => user.userId !== userId);
        OnlineUsers.push({ socketId, userId, role });
    };
    io.on("connection", async (socket) => {
        console.log("Socket connected:", socket.id);
        // support multiple token locations (auth, headers, query)
        const token = socket.handshake?.auth?.token || socket.handshake?.headers?.token;
        if (token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET, async (err, result) => {
                    if (err) {
                        console.log("JWT verify error for socket", socket.id, err);
                        socket.emit("authError", err);
                    }
                    else {
                        console.log("JWT decoded for socket", socket.id, result);
                        const userData = await User.findByPk(result.userId);
                        if (!userData) {
                            socket.emit("authError", "No user found with that token");
                            return;
                        }
                        addToOnlineUsers(socket.id, result.userId, userData.role);
                        console.log("OnlineUsers updated:", OnlineUsers);
                    }
                });
            }
            catch (error) {
                console.log("Database error", error);
                socket.emit("authError", "datbase connection error");
            }
        }
        else {
            console.log("No token provided for socket", socket.id);
            socket.emit("authError", "Token is required !");
        }
        socket.on("create-question", async (data) => {
            try {
                io.emit("feed-post", data);
            }
            catch (error) {
                console.log("Couldnot broadcast the message !");
            }
        });
    });
}
startServer();
//# sourceMappingURL=server.js.map