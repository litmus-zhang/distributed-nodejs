#!/usr/bin/env node

const server = require("fastify")();
const fetch = require("node-fetch");
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || "localhost:4000";

server.get("/", async () => {
    const req = await fetch(`http://${TARGET}/recipes/42`);
    const data = await req.json();
    return {
        consumer_pid: process.pid,
        data
    }
})

server.listen(PORT, HOST, () => {
    console.log(`Consumer listening at http://${HOST}:${PORT}`);
});