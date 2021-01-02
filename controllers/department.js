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
        const CheckSQL = 'select * from professions where d_id=?'
        const SQL = 'delete from departments where d_id=?'
        try {
            const canDelete = await query(CheckSQL, [req.id])
            if (canDelete.length > 0) {
                ctx.body = errorData('该院校下已包含专业，请先将该院校下的专业清空！')
            } else {
                const res = await query(SQL, [req.id])
                ctx.body = successData('删除成功！')
            }
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
        const CheckSQL = 'select * from courses where p_id=?'
        const SQL = 'delete from professions where p_id=?'
        try {
            const canDelete = await query(CheckSQL, [req.id])
            if (canDelete.length > 0) {
                ctx.body = errorData('该专业下已包含课程，请先将该专业下的课程清空！')
            } else {
                const res = await query(SQL, [req.id])
                ctx.body = successData('删除成功！')
            }
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

    // 知识点
    static async ponitList(ctx) {
        const req = ctx.request.body
        const SQL = 'SELECT * FROM knowledge where c_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData(res)
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async addPoints(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into knowledge (k_name, k_pid, c_id) value (?, ?, ?)'
        try {
            const res = await query(SQL, [req.name, req.kPid, req.cId])
            ctx.body = successData()
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async deletePoints(ctx) {
        const req = ctx.request.body
        const search = 'SELECT * FROM knowledge where k_pid=?'
        const SQL = 'delete from knowledge where k_id=?'
        try {
            const res = await query(search, [req.id])
            if (res.length > 0) {
                const delChildSQL =  'delete from knowledge where k_pid=?'
                const delChild = await query(delChildSQL, [req.id])
            }
            const del = await query(SQL, [req.id])
            ctx.body = successData()
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }
}