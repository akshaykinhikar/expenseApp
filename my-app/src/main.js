#!/usr/bin/env node
import 'dotenv/config';
import { createServer } from 'http';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { Config } from './config.js';
const nodePath = resolve(process.argv[1]);
const modulePath = resolve(fileURLToPath(import.meta.url));
const isCLI = nodePath === modulePath;
export default function main(port = Config.port) {
    const requestListener = (request, response) => {
        response.setHeader('content-type', 'text/plain;charset=utf8');
        response.writeHead(200, 'OK');
        response.end('Olá, Hola, Hello!');
    };
    const server = createServer(requestListener);
    if (isCLI) {
        server.listen(port);
        console.log(`Listening on port: ${port}`);
    }
    return server;
}
if (isCLI) {
    main();
}
//# sourceMappingURL=main.js.map