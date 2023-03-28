import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from './middle-ware/logger.js'
import router from './routers.js'

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(logger())

app.use(router.routes()).use(router.allowedMethods())

app.listen(5555, () => {
    console.log('5555监听中')
})