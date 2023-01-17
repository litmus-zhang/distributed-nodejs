#!/usr/bin/env node

const server = require("fastify")();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 4000;

console.log(`worker pid=${process.pid}`);

server.get("/recipes/:id", async (request, reply) => {
    console.log(`worker  request pid=${process.pid}`);
    const id = Number(request.params.id);
    if (id !== 42) {
        reply.statusCode = 404;
        return { error: "Not found" };
    }
    return {
        prducer_pid: process.pid,
        recipe: {
            id, name: "Chicken",
            steps: "Throw it in the oven",
            ingredients: [
                { id: 1, name: "Chicken", quantity: "1 lb" },
                { id: 2, name: "Oven", quantity: "2 pieces" }
            ]
        }
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Producer listening at http://${HOST}:${PORT}`);
});