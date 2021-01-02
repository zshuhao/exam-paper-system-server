import Router from '@koa/router'
import SystemController from '../controllers/system'
import DepartmentController from '../controllers/department'

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

// 院系管理
router.post('/department/departmentList', DepartmentController.departmentList)
router.post('/department/addDepartment', DepartmentController.addDepartment)
router.post('/department/editDepartment', DepartmentController.editDepartment)
router.post('/department/deleteDepartment', DepartmentController.deleteDepartment)

router.post('/department/professionList', DepartmentController.professionList)
router.post('/department/addProfession', DepartmentController.addProfession)
router.post('/department/editProfession', DepartmentController.editProfession)
router.post('/department/deleteProfession', DepartmentController.deleteProfession)

router.post('/department/courseList', DepartmentController.courseList)
router.post('/department/addCourse', DepartmentController.addCourse)
router.post('/department/editCourse', DepartmentController.editCourse)
router.post('/department/deleteCourse', DepartmentController.deleteCourse)


export default router