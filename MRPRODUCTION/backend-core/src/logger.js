export function logger(req) {
  const ts = new Date().toISOString()
  console.log(`${ts} ${req.method} ${req.originalUrl} ${req.ip}`)
}
