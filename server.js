import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { render } from './dist/entry-server.js';
import { renderToPipeableStream } from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.VITE_PORT_PRODUCTION | 3000;
const app = express();

const template = fs.readFileSync('./dist/index.html', 'utf-8');
const [head, tail] = template.split('<!--ssr-outlet-->');

app.use('/assets', express.static(path.resolve(__dirname, './dist/assets')));

app.get('*', (req, res) => {
  const reactTree = render(req.url);

  const { pipe } = renderToPipeableStream(reactTree, {
    onShellReady() {
      res.status(200);
      res.setHeader('content-type', 'text/html');
      res.write(head);
      pipe(res);
    },
    onAllReady() {
      res.write(tail);
      res.end();
    },
    onShellError(err) {
      console.error('Something went wrong with pipeable stream');
      console.error(err.message);
    },
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Listening To Zustand SSR Server on ${PORT}....`),
);
