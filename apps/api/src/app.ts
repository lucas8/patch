import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { connectDB } from '@patch/db'

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res })

export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

const appRouter = t.router({
  sayHello: t.procedure.query(async () => {
    return { message: 'test' }
  }),
})

export type AppRouter = typeof appRouter

const app = express()
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3000',
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

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)

  // CONNECT DB
  connectDB()
})
