import Router from '@koa/router'
import SystemController from '../controllers/system'

const router = new Router()

// 系统设置
router.post('/login', SystemController.login)
router.get('/system/userList', SystemController.userList)


export default router