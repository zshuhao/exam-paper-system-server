import { query } from '../mysql/db'
import { successData, errorData } from '../utils/responseData'

export default class DepartmentController {
    // 院校
    static async departmentList(ctx) {
        const SQL = 'SELECT * FROM departments'
        try {
            const res = await query(SQL)
            ctx.body = successData(res)
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async addDepartment(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into departments (d_name) value (?)'
        try {
            const res = await query(SQL, [req.name])
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async editDepartment(ctx) {
        const req = ctx.request.body
        const SQL = 'update user departments d_name=? where d_id=?'
        try {
            const res = await query(SQL, [req.name, req.id])
            ctx.body = successData('修改成功！')
        } catch (error) {
            ctx.body = errorData('修改失败！')
        }
    }

    static async deleteDepartment(ctx) {
        const req = ctx.request.body
        const SQL = 'delete from departments where d_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData('删除成功！')
        } catch (error) {
            ctx.body = errorData('删除失败！')
        }
    }

    // 专业
    static async professionList(ctx) {
        const SQL = 'SELECT * FROM professions'
        try {
            const res = await query(SQL)
            ctx.body = successData(res)
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async addProfession(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into professions (p_name, d_id) value (?, ?)'
        try {
            const res = await query(SQL, [req.name, req.departmentId])
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async editProfession(ctx) {
        const req = ctx.request.body
        const SQL = 'update professions set p_name=?, d_id=? where p_id=?'
        try {
            const res = await query(SQL, [req.name, req.departmentId, req.id])
            ctx.body = successData('修改成功！')
        } catch (error) {
            ctx.body = errorData('修改失败！')
        }
    }

    static async deleteProfession(ctx) {
        const req = ctx.request.body
        const SQL = 'delete from professions where p_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData('删除成功！')
        } catch (error) {
            ctx.body = errorData('删除失败！')
        }
    }

    // 科目
    static async courseList(ctx) {
        const SQL = 'SELECT * FROM courses'
        try {
            const res = await query(SQL)
            ctx.body = successData(res)
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async addCourse(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into courses (c_name, p_id, d_id) value (?, ?, ?)'
        try {
            const res = await query(SQL, [req.name, req.professionId, req.departmentId])
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async editCourse(ctx) {
        const req = ctx.request.body
        const SQL = 'update courses set c_name=?, p_id=?, d_id=? where c_id=?'
        try {
            const res = await query(SQL, [req.name, req.professionId, req.departmentId, req.id])
            ctx.body = successData('修改成功！')
        } catch (error) {
            ctx.body = errorData('修改失败！')
        }
    }

    static async deleteCourse(ctx) {
        const req = ctx.request.body
        const SQL = 'delete from courses where c_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData('删除成功！')
        } catch (error) {
            ctx.body = errorData('删除失败！')
        }
    }
}