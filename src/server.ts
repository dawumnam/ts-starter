import fastify from "fastify";
import { randomBytes } from "node:crypto";

const server = fastify({
  genReqId: () => {
    return `req-${String(Date.now())}-${randomBytes(8).toString("hex")}`;
  },
});

// server.addHook('onRequest', (request, _reply, done) => {
//   request.log.info({
//     headers: request.headers,
//     method: request.method,
//     query: request.query,
//     requestId: request.id,
//     url: request.url,
//   }, 'Incoming request');
//   done();
// });

// server.addHook('onResponse', (request, reply, done) => {
//   request.log.info({
//     method: request.method,
//     requestId: request.id,
//     responseTime: reply.elapsedTime,
//     statusCode: reply.statusCode,
//     url: request.url,
//   }, 'Request completed');
//   done();
// });

server.get("/", (request) => {
  return {
    message: "Hello World!",
    requestId: request.id,
    timestamp: new Date().toISOString(),
  };
});

const start = async () => {
  try {
    const port = process.env["PORT"]
      ? Number.parseInt(process.env["PORT"], 10)
      : 3000;
    const host = process.env["HOST"] ?? "0.0.0.0";

    await server.listen({ host, port });
    console.log(`Server listening on http://${host}:${String(port)}`);
  } catch (error) {
    server.log.error(error);
    throw error;
  }
};

void start();
