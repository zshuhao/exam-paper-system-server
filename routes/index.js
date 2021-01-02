import Router from '@koa/router'
import SystemController from '../controllers/system'

const router = new Router()

// 系统设置
router.post('/login', SystemController.login)
router.post('/system/addUser', SystemController.addUser)
router.post('/system/editUser', SystemController.editUser)
router.post('/system/deleteUser', SystemController.deleteUser)
router.post('/system/userList', SystemController.userList)

router.post('/system/roleList', SystemController.roleList)
router.post('/system/addRole', SystemController.addRole)
router.post('/system/editRole', SystemController.editRole)
router.post('/system/deleteRole', SystemController.deleteRole)

router.post('/system/permissions', SystemController.queryPermissions)


export default router