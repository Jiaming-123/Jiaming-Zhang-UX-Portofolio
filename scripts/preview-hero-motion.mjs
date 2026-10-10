// Local-only preview: inject the proposed motion into the latest assembled site.
// Does not modify production output or invoke any deployment.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.join(repo, 'dist-production');
const previewFiles = new Set(['/hero-orb-motion.css', '/hero-orb-motion.mjs']);
const types = { '.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.mp4':'video/mp4', '.woff2':'font/woff2', '.json':'application/json' };
const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { response.writeHead(400).end(); return; }
  if (/^\/work\/?$/.test(pathname)) { response.writeHead(302, { Location:'/#featured' }).end(); return; }
  const directory = previewFiles.has(pathname) ? path.join(repo, 'public') : root;
  let file = path.resolve(directory, '.' + pathname);
  if (file !== directory && !file.startsWith(directory + path.sep)) { response.writeHead(403).end(); return; }
  if (/^\/projects\/(unilink|landing-app)\/?$/.test(pathname)) file = path.join(root, 'projects/unilink/index.html');
  else if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(root, 'index.html');
  response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  response.setHeader('Cache-Control', 'no-store');
  if (request.method === 'HEAD') { response.end(); return; }
  if (file === path.join(root, 'index.html')) {
    const source = fs.readFileSync(file, 'utf8');
    const html = source.includes('hero-orb-motion') ? source : source.replace('</head>', '<link rel="stylesheet" href="/hero-orb-motion.css"><script type="module" src="/hero-orb-motion.mjs"></script></head>');
    response.end(html);
  } else fs.createReadStream(file).pipe(response);
});
server.listen(4190, '127.0.0.1', () => console.log('Local hero motion preview: http://127.0.0.1:4190/ (not published)'));
