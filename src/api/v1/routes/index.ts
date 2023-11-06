import fs from 'node:fs';
import { Router } from 'express';
const router = Router();

const routeFiles = fs.readdirSync(`${__dirname}/`);

async function main() {
  for (const file of routeFiles) {
    if (file !== 'index.js') {
      const route = await import('./' + file);
      router.use(route.router);
    }
  }
}

main();

export { router };
