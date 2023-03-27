import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from './middle-ware/logger.js'

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(logger())

app.use((ctx) => {
    ctx.body = 'is koa'
    console.log('ctx.body', ctx.body)
    console.log('ctx.request', ctx.request)
})

app.listen(5764, () => {
    console.log('5764监听中')
})