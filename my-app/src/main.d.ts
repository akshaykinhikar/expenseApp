#!/usr/bin/env node
import 'dotenv/config';
import { IncomingMessage, ServerResponse } from 'http';
export default function main(port?: number): import("http").Server<typeof IncomingMessage, typeof ServerResponse>;
