import { defineConfig } from 'vite'

export default defineConfig({
  build: { outDir: 'dist-production' },
  plugins: [{
    name: 'production-document-routes',
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        const routedRequest = request as { url?: string }
        const url = new URL(routedRequest.url || '/', 'http://localhost')
        if (/^\/work\/?$/.test(url.pathname)) {
          response.writeHead(308, { Location: '/#featured' })
          response.end()
          return
        }
        if (/^\/projects\/landing-app\/?$/.test(url.pathname)) {
          response.writeHead(308, { Location: '/projects/unilink' + url.search })
          response.end()
          return
        }
        if (/^\/projects\/unilink\/?$/.test(url.pathname)) routedRequest.url = '/projects/unilink/index.html' + url.search
        next()
      })
    },
  }],
})
