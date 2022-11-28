import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { serverConfig } from '@patch/config'

dotenv.config({ path: path.join(__dirname, './.env') })

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res })

export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

const appRouter = t.router({
  sayHello: t.procedure.query(async () => {
    // const message = await redisClient.get('tRPC')
    return { message: 'test' }
  }),
})

export type AppRouter = typeof appRouter

const app = express()
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

app.use(
  cors({
    origin: [serverConfig.origin, 'http://localhost:3000'],
    credentials: true,
  }),
)
app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.listen(serverConfig.port, () => {
  console.log(`🚀 Server listening on port 8000`)

  // CONNECT DB
  // connectDB()
})
