import { readFile, writeFile, mkdir } from 'node:fs/promises'
const directory = new URL('../dist/projects/unilink/', import.meta.url)
let html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const title = 'UniLink — Peer Support for International Students | Jiaming Zhang'
const description = 'A UX case study exploring how peer groups and verified mentors can help first-year international students find relevant, trusted support.'
html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
  .replace('</head>', `<link rel="canonical" href="https://jiamingzhang-portfolio.vercel.app/projects/unilink" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="https://jiamingzhang-portfolio.vercel.app/projects/unilink" />
    <meta property="og:image" content="https://jiamingzhang-portfolio.vercel.app/images/unilink/cover.png" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>`)
await mkdir(directory, { recursive: true })
await writeFile(new URL('index.html', directory), html)
console.log('UniLink route metadata and social preview written.')
