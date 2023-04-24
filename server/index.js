const express = require("express");
const http = require("http").Server(express);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let totalSales = 0;
const salesBySeller = new Map();

socketIO.on("connection", (socket) => {
  socket.emit("totalSales", totalSales);
  let leaderboard = Array.from(salesBySeller).sort((a, b) => a[1] - b[1]);
  socket.emit("leaderboard", leaderboard);

  socket.on("newSale", (seller) => {
    totalSales += 1;
    if (salesBySeller.has(seller)) {
      salesBySeller.set(seller, salesBySeller.get(seller) + 1);
    } else {
      salesBySeller.set(seller, 1);
    }
    leaderboard = Array.from(salesBySeller).sort((a, b) => b[1] - a[1]);
    socketIO.emit("totalSales", totalSales);
    socketIO.emit("leaderboard", leaderboard);
  });
});

http.listen(3000, () => {
  console.log("Server is running on port 3000");
});
