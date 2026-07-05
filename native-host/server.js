import net from "node:net";

const server = net.createServer((socket) => {
    console.log("Electron Connected");

    socket.write("Hello Electron!\n");

    socket.on("end", () => {
        console.log("Electron Disconnected");
    });
});

server.listen(5000, () => {
    console.log("");
    console.log("==============================");
    console.log("Native Host Server Started");
    console.log("==============================");
    console.log("");
    console.log("Listening on port 5000");
});