import { query } from '../mysql/db'
import { successData, errorData } from '../utils/responseData'

export default class TestController {
    static async userList(ctx) {
        const SQL = 'SELECT * FROM user u, roles r where u.role_id = r.role_id'
        const res = await query(SQL)
        ctx.body = res
    }

    static async login(ctx) {
        const req = ctx.request.body
        const SQL = 'SELECT * FROM user u, roles r where u.role_id = r.role_id and u.phone = ?'
        const res = await query(SQL, [req.phone])
        if (res.length > 0) {
            const userInfo = res[0]
            if (userInfo.password === req.password) {
                const { permission } = userInfo
                const permissions = permission.split(',')
                const SQL = 'SELECT * FROM permissions where id in(?)'
                const perList = await query(SQL, [permissions])
                userInfo.menu = perList
                delete userInfo.permission
                delete userInfo.password
                ctx.body = successData(userInfo)
            } else {
                ctx.body = errorData('密码错误！')
            }
        } else {
            ctx.body = errorData('未查到该用户！')
        }
    }
}