export const serverConfig = {
  port: process.env.PORT || process.env.API_PORT || 8080,
  origin:
    process.env.ORIGIN || process.env.API_ORIGIN || 'http://localhost:3000',
}
