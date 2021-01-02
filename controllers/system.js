import { query } from '../mysql/db'
import { successData, errorData } from '../utils/responseData'

export default class TestController {
    static async userList(ctx) {
        const req = ctx.request.body
        const SQL = 'select * from user u, roles r where u.role_id = r.role_id limit ?, ?;'
        const CountSQL = 'SELECT COUNT(*) FROM user'
        try {
            const start = (req.pageNo - 1)*req.pageSize
            const res = await query(SQL, [start, req.pageSize])
            const count = await query(CountSQL)
            ctx.body = successData({
                pageNo: req.pageNo,
                pageSize: req.pageSize,
                count: count[0]['COUNT(*)'],
                data: res
            })
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async addUser(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into user (user_name, role_id, phone, password) value (?, ?, ?, ?)'
        try {
            const res = await query(SQL, [req.name, req.role, req.phone, req.password])
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async editUser(ctx) {
        const req = ctx.request.body
        const SQL = 'update user set user_name=?, role_id=?, phone=?, password=? where user_id=?'
        try {
            const res = await query(SQL, [req.name, req.role, req.phone, req.password, req.id])
            ctx.body = successData('修改成功！')
        } catch (error) {
            ctx.body = errorData('修改失败！')
        }
    }

    static async deleteUser(ctx) {
        const req = ctx.request.body
        const SQL = 'delete from user where user_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData('删除成功！')
        } catch (error) {
            ctx.body = errorData('删除失败！')
        }
    }

    static async roleList(ctx) {
        const SQL = 'SELECT * FROM roles'
        try {
            const res = await query(SQL)
            ctx.body = successData(res)
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async addRole(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into roles (role_name, permission) value (?, ?)'
        try {
            const permission = req.permission.join(',')
            const res = await query(SQL, [req.name, permission])
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async editRole(ctx) {
        const req = ctx.request.body
        const SQL = 'update roles set role_name=?, permission=? where role_id=?'
        try {
            const permission = req.permission.join(',')
            const res = await query(SQL, [req.name, permission, req.id])
            ctx.body = successData('修改成功！')
        } catch (error) {
            console.log(error)
            ctx.body = errorData('添加失败！')
        }
    }

    static async deleteRole(ctx) {
        const req = ctx.request.body
        const SQL = 'delete from roles where role_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData('删除成功！')
        } catch (error) {
            ctx.body = errorData('删除失败！')
        }
    }

    static async queryPermissions(ctx) {
        const SQL = 'SELECT * FROM permissions'
        try {
            const res = await query(SQL)
            ctx.body = successData(res)
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
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