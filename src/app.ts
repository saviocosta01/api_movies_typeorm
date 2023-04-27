import 'express-async-errors'
import express, {Application} from 'express'
import { moviesRoutes } from './routes/movies.routes'
import { errorHandler } from './errors'
import 'reflect-metadata'

const app: Application = express()
app.use(express.json())

app.use('/movies', moviesRoutes)

app.use(errorHandler)

export default app

